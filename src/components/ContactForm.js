import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../context/LanguageContext';

function ContactForm({ onClose }) {
  const { language } = useLanguage();
  const text = languages[language];
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form submitted:', formData);
      alert(text.contact.form.success);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      onClose(); // Close the form after submission
    } catch (error) {
      alert('Error sending message. Please try again.');
    }
  };

  return (
    <div className="contact-form-overlay">
      <div className="contact-form-container">
        <button className="close-button" onClick={onClose}>✕</button>
        <h2>{text.contact.form.title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{text.contact.form.name}</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required 
            />
          </div>
          <div className="form-group">
            <label>{text.contact.form.email}</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required 
            />
          </div>
          <div className="form-group">
            <label>{text.contact.form.message}</label>
            <textarea 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
            ></textarea>
          </div>
          <button type="submit">{text.contact.form.submit}</button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm; 