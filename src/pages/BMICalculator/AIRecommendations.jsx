import React from 'react';
import './AIRecommendations.css';

const AIRecommendations = ({ aiRecommendations }) => {
  if (!aiRecommendations) return null;
  return (
    <div className="ai-recommendations">
      <div className="ai-header">
        <h3>🤖 AI Personal Recommendations</h3>
        <p>Rekomendasi personal berdasarkan profil Anda</p>
      </div>
      <div className="recommendations-grid">
        <div className="rec-section">
          <h4>🍽️ Diet Plan</h4>
          <ul>
            {aiRecommendations.diet.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rec-section">
          <h4>💪 Exercise Plan</h4>
          <ul>
            {aiRecommendations.exercise.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rec-section">
          <h4>🎯 Goals & Targets</h4>
          <ul>
            {aiRecommendations.goals.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rec-section">
          <h4>🌟 Lifestyle Tips</h4>
          <ul>
            {aiRecommendations.lifestyle.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;
