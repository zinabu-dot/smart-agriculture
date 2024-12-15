import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../context/LanguageContext';
import './Home.css';

function Home() {
  const { language } = useLanguage();
  const text = languages[language];

  return (
    <div className="home">
      <div className="hero">
        <h1>{text.home.welcome}</h1>
        <p>{text.home.subtitle}</p>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <div className="icon">🌱</div>
          <h2>{text.home.features.smartFarming.title}</h2>
          <p>{text.home.features.smartFarming.desc}</p>
        </div>
        <div className="feature-card">
          <div className="icon">👨‍🌾</div>
          <h2>{text.home.features.expertAdvice.title}</h2>
          <p>{text.home.features.expertAdvice.desc}</p>
        </div>
        <div className="feature-card">
          <div className="icon">🏪</div>
          <h2>{text.home.features.market.title}</h2>
          <p>{text.home.features.market.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default Home; 