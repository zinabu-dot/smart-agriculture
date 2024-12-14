import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Smart Agriculture</h1>
        <p>Revolutionizing farming with modern technology</p>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <div className="icon">🌱</div>
          <h2>Smart Farming</h2>
          <p>Use technology to improve your farming practices</p>
        </div>
        <div className="feature-card">
          <div className="icon">👨‍🌾</div>
          <h2>Expert Advice</h2>
          <p>Get guidance from agricultural experts</p>
        </div>
        <div className="feature-card">
          <div className="icon">🏪</div>
          <h2>Market Access</h2>
          <p>Connect with buyers and sellers</p>
        </div>
      </div>
    </div>
  );
}

export default Home; 