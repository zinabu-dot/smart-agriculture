import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../context/LanguageContext';
import './Navbar.css';

function Navbar() {
  const { language, setLanguage } = useLanguage();
  const text = languages[language];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleLanguage = () => setLanguage(language === 'am' ? 'en' : 'am');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Smart Agriculture</Link>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
      <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>{text.nav.home}</Link>
        <Link to="/services" onClick={() => setIsMenuOpen(false)}>{text.nav.services}</Link>
        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>{text.nav.contact}</Link>
        <button onClick={toggleLanguage} className="language-toggle">
          {language === 'am' ? 'English' : 'አማርኛ'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar; 