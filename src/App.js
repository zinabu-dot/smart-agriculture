import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Services from './components/Services';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Router basename="/smart-agriculture">
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <ChatBot />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App; 