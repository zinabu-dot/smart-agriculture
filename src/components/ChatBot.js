import React, { useState } from 'react';
import './ChatBot.css';
import { useLanguage } from '../context/LanguageContext';

function ChatBot() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: language === 'am' 
        ? "ሰላም! እንኳን ወደ Smart Agriculture መጡ። እንዴት ልረዳዎት እችላለሁ?"
        : "Hello! Welcome to Smart Agriculture. How can I help you?",
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');

  // Predefined responses based on keywords
  const responses = {
    en: {
      weather: "I can help you check the weather forecast. Please go to our Services page and check the Weather Forecasting service.",
      soil: "We offer comprehensive soil analysis services. Would you like to know more about our soil testing?",
      drone: "Our drone services include crop monitoring and precision spraying. Would you like more details?",
      price: "Prices vary based on the service and area. Please contact us for a detailed quote.",
      default: "I'm here to help! You can ask me about our services, weather forecasting, soil analysis, or drone services."
    },
    am: {
      weather: "የአየር ሁኔታ ትንበያን ማየት እችላለሁ። እባክዎ ወደ አገልግሎቶች ገጽ ሂደው የአየር ሁኔታ ትንበያ አገልግሎትን ይመልከቱ።",
      soil: "ሙሉ የአፈር ምርመራ አገልግሎት እናቀርባለን። ስለ አፈር ምርመራ ተጨማሪ መረጃ ይፈልጋሉ?",
      drone: "የድሮን አገልግሎታችን የሰብል ክትትል እና ትክክለኛ መርጨት ያካትታል። ተጨማሪ መረጃ ይፈልጋሉ?",
      price: "ዋጋው በአገልግሎቱ እና በቦታው ይለያያል። እባክዎ ለዝርዝር ዋጋ ያግኙን።",
      default: "ልረዳዎት እችላለሁ! ስለ አገልግሎቶቻችን፣ የአየር ሁኔታ ትንበያ፣ የአፈር ምርመራ፣ ወይም የድሮን አገልግሎቶች መጠየቅ ይችላሉ።"
    }
  };

  const getResponse = (input) => {
    const lowercaseInput = input.toLowerCase();
    const currentResponses = responses[language];

    if (lowercaseInput.includes('weather') || lowercaseInput.includes('አየር')) {
      return currentResponses.weather;
    } else if (lowercaseInput.includes('soil') || lowercaseInput.includes('አፈር')) {
      return currentResponses.soil;
    } else if (lowercaseInput.includes('drone') || lowercaseInput.includes('ድሮን')) {
      return currentResponses.drone;
    } else if (lowercaseInput.includes('price') || lowercaseInput.includes('ዋጋ')) {
      return currentResponses.price;
    }
    return currentResponses.default;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      // Add user message
      setMessages(prev => [...prev, { text: input, sender: 'user' }]);
      
      // Get bot response
      setTimeout(() => {
        const response = getResponse(input);
        setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
      }, 500);
      
      setInput('');
    }
  };

  return (
    <div className={`chatbot ${isOpen ? 'open' : ''}`}>
      <button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '💬'}
      </button>
      
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h3>{language === 'am' ? 'የእርሻ አማካሪ' : 'Smart Agri Assistant'}</h3>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={language === 'am' ? "ጥያቄዎን ይጻፉ..." : "Type your message..."}
            />
            <button type="submit">
              <span>➤</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
