import { useState, useEffect } from 'react';
import PromptManager from './components/PromptManager';
import ThinkingHUD from './components/ThinkingHUD';
import VideoPlayer from './components/VideoPlayer';
import SettingsModal from './components/SettingsModal';

const WORKFLOW_STEPS = [
  { id: 'analyze', title: 'İstek Analiz Ediliyor', description: 'Girdiğiniz prompt sinematik bir senaryoya dönüştürülüyor...' },
  { id: 'script', title: 'Ajanlara İş Dağılımı', description: 'Görsel, Ses ve Müzik yapay zekalarına özel görevler (promptlar) hazırlanıyor...' },
  { id: 'assets', title: 'Ağır Üretim Aşaması (Simülasyon)', description: 'Video kareleri ve ses dalgaları ekran kartında işleniyor...' },
  { id: 'finalize', title: 'Bütünleştirme (Render)', description: 'Tüm parçalar bir araya getirilip son video oluşturuluyor...' }
];

// Sample mock video from an open source test URL 
const MOCK_VIDEO_URL = "https://www.w3schools.com/html/mov_bbb.mp4";
const MOCK_POSTER_URL = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";

function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const [promptHistory, setPromptHistory] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [pexelsApiKey, setPexelsApiKey] = useState('');

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ai_video_history');
    if (saved) {
      setPromptHistory(JSON.parse(saved));
    }
    const savedKey = localStorage.getItem('pexels_api_key');
    if (savedKey) {
      setPexelsApiKey(savedKey);
    }
  }, []);

  const handleSaveApiKey = (key) => {
    setPexelsApiKey(key);
    localStorage.setItem('pexels_api_key', key);
  };

  const handleGenerate = async (userPrompt) => {
    if (!pexelsApiKey) {
      alert("Lütfen önce Sistem Bağlantı Ayarlarından Pexels API anahtarınızı giriniz.");
      setIsSettingsOpen(true);
      return;
    }

    // Save to history
    const newHistory = [userPrompt, ...promptHistory].slice(0, 5); // Keep last 5
    setPromptHistory(newHistory);
    localStorage.setItem('ai_video_history', JSON.stringify(newHistory));

    setIsGenerating(true);
    setCurrentStep(0);
    setGeneratedVideo(null);

    // Simulate Agentic Workflow Delays
    // Step 0: Analyzing (2s)
    await new Promise(r => setTimeout(r, 2000));
    
    // Step 1: Scripting (2.5s)
    setCurrentStep(1);
    await new Promise(r => setTimeout(r, 2500));
    
    // Step 2: Assets Creation (Pexels API Call)
    setCurrentStep(2);
    
    let finalVideoUrl = MOCK_VIDEO_URL;
    let finalPosterUrl = MOCK_POSTER_URL;

    try {
      // Dynamic fetch from Pexels API using user prompt
      const response = await fetch(`https://api.pexels.com/videos/search?query=${encodeURIComponent(userPrompt)}&per_page=1&locale=tr-TR`, {
        headers: {
          Authorization: pexelsApiKey
        }
      });
      const data = await response.json();
      
      if (data && data.videos && data.videos.length > 0) {
        // Get the best HD video file
        const videoFiles = data.videos[0].video_files;
        const hdVideo = videoFiles.find(v => v.quality === 'hd') || videoFiles[0];
        finalVideoUrl = hdVideo.link;
        finalPosterUrl = data.videos[0].image;
      } else {
        console.warn("Pexels'te bu aramaya uygun video bulunamadı, varsayılan video kullanılıyor.");
      }
    } catch (error) {
      console.error("API Hatası:", error);
    }
    
    // Simulate processing time
    await new Promise(r => setTimeout(r, 2000));
    
    // Step 3: Finalizing (1.5s)
    setCurrentStep(3);
    await new Promise(r => setTimeout(r, 1500));

    // Done
    setCurrentStep(4);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedVideo({
        url: finalVideoUrl,
        poster: finalPosterUrl,
        title: userPrompt
      });
    }, 500); // slight delay before showing the video
  };

  return (
    <div className="app-container">
      <header className="app-header glass-panel">
        <div className="header-top">
          <h1 className="glow-text">Agentic Video AI</h1>
          <button className="settings-btn action-btn" onClick={() => setIsSettingsOpen(true)}>⚙ Ayarlar</button>
        </div>
        <p>Arama motoru değil, <strong>Üretim Motoru</strong>.</p>
        <div className="memory-badge">
          🧠 Hafızadaki İstek Sayısı: {promptHistory.length}
        </div>
      </header>

      <main className="app-main">
        {!isGenerating && !generatedVideo && (
          <div className="welcome-message animate-slide-up">
            <h2>Hoş Geldiniz.</h2>
            <p>Ben sizin kişisel yapay zeka yönetmeninizim. Bana sadece ne istediğinizi söyleyin, gerisini (senaryo, müzik, video kurgusu) ben halledeceğim.</p>
          </div>
        )}

        <PromptManager onSubmit={handleGenerate} disabled={isGenerating} />

        {isGenerating && (
          <ThinkingHUD currentStep={currentStep} steps={WORKFLOW_STEPS} />
        )}

        {generatedVideo && !isGenerating && (
          <VideoPlayer 
            videoUrl={generatedVideo.url} 
            posterUrl={generatedVideo.poster}
            title={generatedVideo.title} 
          />
        )}
      </main>

      {isSettingsOpen && (
        <SettingsModal 
          onClose={() => setIsSettingsOpen(false)} 
          onSave={handleSaveApiKey} 
          currentKey={pexelsApiKey} 
        />
      )}

      <footer className="app-footer">
        <p>Sistem şu anda Pexels API entegrasyonu ile dinamik modda çalışmaktadır.</p>
      </footer>
    </div>
  );
}

export default App;
