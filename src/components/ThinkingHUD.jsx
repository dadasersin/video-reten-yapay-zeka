import React from 'react';
import './ThinkingHUD.css';

export default function ThinkingHUD({ currentStep, steps }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="thinking-hud-container glass-panel animate-slide-up">
      <div className="hud-header">
        <div className="processing-indicator">
          <div className="spinner"></div>
          <span className="glow-text">Yapay Zeka Düşünüyor...</span>
        </div>
      </div>
      
      <div className="steps-container">
        {steps.map((step, index) => {
          let statusClass = 'pending';
          if (index < currentStep) statusClass = 'completed';
          if (index === currentStep) statusClass = 'active';

          return (
            <div key={step.id} className={`step-item ${statusClass}`}>
              <div className="step-icon">
                {statusClass === 'completed' && '✓'}
                {statusClass === 'active' && '⟳'}
                {statusClass === 'pending' && '○'}
              </div>
              <div className="step-details">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
