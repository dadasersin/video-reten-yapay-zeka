import React, { useState } from 'react';
import './PromptManager.css';

export default function PromptManager({ onSubmit }) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit(prompt);
    setPrompt('');
  };

  return (
    <div className="prompt-manager-container glass-panel">
      <form onSubmit={handleSubmit} className="prompt-form">
        <textarea
          className="prompt-input"
          placeholder="Oluşturmak istediğiniz videoyu hayal edin ve yazın (Örn: Mars yüzeyinde gezen bir kedi)..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
        />
        <button type="submit" className="generate-btn glow-text">
          <span className="btn-icon">✧</span>
          Oluştur
        </button>
      </form>
    </div>
  );
}
