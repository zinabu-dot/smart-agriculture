import React, { useState } from 'react';
import './ChatBot.css';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "ሰላም! እንኳን ወደ Smart Agriculture መጡ። እንዴት ልረዳዎት እችላለሁ?",
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      // Add user message
      setMessages([...messages, { text: input, sender: 'user' }]);
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "እባክዎን ትንሽ ይጠብቁ። ስለ ጥያቄዎ እያጣራሁ ነው...",
          sender: 'bot'
        }]);
      }, 1000);
      
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
            <h3>Smart Agri Assistant</h3>
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
              placeholder="ጥያቄዎን ይጻፉ..."
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
