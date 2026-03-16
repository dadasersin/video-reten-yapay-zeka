import React, { useState } from 'react';
import './SettingsModal.css';

export default function SettingsModal({ onClose, onSave, currentKey }) {
  const [apiKey, setApiKey] = useState(currentKey || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(apiKey);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel animate-slide-up">
        <div className="modal-header">
          <h2 className="glow-text">Sistem Bağlantı Ayarları</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label>Pexels API Anahtarı (Gerçek Videolar İçin)</label>
            <input 
              type="password" 
              placeholder="API Anahtarınızı Buraya Yapıştırın..." 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="api-input"
            />
            <small className="help-text">
              Dinamik videolar üretebilmemiz için ücretsiz bir Pexels API anahtarına ihtiyacımız var.<br/>
              Nasıl alınır: <a href="https://www.pexels.com/api/" target="_blank" rel="noreferrer">Pexels API sayfasına</a> gidin, ücretsiz üye olun ve "New API Key" butonuna basın. Ardından kodu buraya yapıştırın.
            </small>
          </div>
          
          <div className="modal-actions">
            <button type="button" className="action-btn" onClick={onClose}>İptal</button>
            <button type="submit" className="action-btn save-btn">Kaydet</button>
          </div>
        </form>
      </div>
    </div>
  );
}
