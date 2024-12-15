import React, { useState } from 'react';
import './Contact.css';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../context/LanguageContext';

function Contact() {
  const { language } = useLanguage();
  const text = languages[language];

  const services = [
    { id: 'soil', title: text.services.soil.title },
    { id: 'crop', title: text.services.crop.title },
    { id: 'weather', title: text.services.weather.title },
    { id: 'drone', title: text.services.drone.title }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form submitted:', formData);
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        service: '',
        message: ''
      });
    } catch (error) {
      alert('Error sending message. Please try again.');
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-info">
          <h1>{text.contact.title}</h1>
          <p>Get in touch with our expert team for any questions about our smart agriculture services.</p>
          
          <div className="contact-details">
            <div className="contact-item">
              <span>📍</span>
              <p>123 Agri Street, Addis Ababa, Ethiopia</p>
            </div>
            <div className="contact-item">
              <span>📞</span>
              <p>+251 911 234 567</p>
            </div>
            <div className="contact-item">
              <span>✉️</span>
              <p>info@smartagri.com</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>{text.contact.form.title}</h2>
          <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
            <div className="form-group">
              <label htmlFor="name">{text.contact.form.name}</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">{text.contact.form.email}</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="service">{text.contact.form.service}</label>
              <select
                id="service"
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
                required
              >
                <option value="">{language === 'am' ? 'አገልግሎት ይምረጡ' : 'Select a service'}</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">{text.contact.form.message}</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              {text.contact.form.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact; 