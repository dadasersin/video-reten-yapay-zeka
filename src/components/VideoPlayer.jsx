import React from 'react';
import './VideoPlayer.css';

export default function VideoPlayer({ videoUrl, posterUrl, title }) {
  if (!videoUrl) return null;

  return (
    <div className="video-player-container glass-panel animate-slide-up">
      <div className="video-header">
        <h3 className="glow-text">Üretilen Medya: {title || "İsimsiz Video"}</h3>
        <span className="badge">AI Generated</span>
      </div>
      
      <div className="video-wrapper">
        <video 
          controls 
          autoPlay 
          poster={posterUrl}
          className="styled-video"
          src={videoUrl}
        >
          Tarayıcınız video etiketini desteklemiyor.
        </video>
      </div>
      
      <div className="video-actions">
        <button className="action-btn download-btn">⬇ İndir</button>
        <button className="action-btn share-btn">➦ Paylaş</button>
      </div>
    </div>
  );
}
