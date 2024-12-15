import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { WeatherService } from '../services/WeatherService';
import './Services.css';
import { droneContent } from './DroneData';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../context/LanguageContext';
import WeatherForecast from './WeatherForecast';
import DroneVideo from './DroneVideo';
import ContactForm from './ContactForm';

// Initialize EmailJS with your public key
emailjs.init("k4CcsX0oDQ48plF7j");

function Services() {
  const { language } = useLanguage();
  const text = languages[language];

  // Define initial services state
  const initialServices = [
    {
      id: 1,
      icon: "🌍",
      title: text.services.soil.title,
      shortDesc: text.services.soil.shortDesc,
      longDesc: text.services.soil.longDesc,
      features: text.services.soil.features
    },
    {
      id: 2,
      icon: "🌾",
      title: text.services.crop.title,
      shortDesc: text.services.crop.shortDesc,
      longDesc: text.services.crop.longDesc,
      features: text.services.crop.features
    },
    {
      id: 3,
      icon: "🌤️",
      title: text.services.weather.title,
      shortDesc: text.services.weather.shortDesc,
      longDesc: text.services.weather.longDesc,
      features: text.services.weather.features
    },
    {
      id: 4,
      icon: "🚁",
      title: text.services.drone.title,
      shortDesc: text.services.drone.shortDesc,
      longDesc: text.services.drone.longDesc,
      features: text.services.drone.features
    }
  ];

  // Use state with initial value
  const [services, setServices] = useState(initialServices);
  const [selectedService, setSelectedService] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
    service: ''
  });
  const [showContactForm, setShowContactForm] = useState(false);
  const [weatherService] = useState(new WeatherService());
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize services when component mounts or language changes
  useEffect(() => {
    setServices(initialServices);
  }, [language, text]);

  // Separate useEffect for weather data
  useEffect(() => {
    const generateWeatherData = () => {
      const baseTemp = 25; // Base temperature for Addis Ababa
      return Array.from({ length: 7 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);
        
        // Add variations
        const hourlyVariation = Math.sin(date.getHours() * Math.PI / 12) * 5;
        const dailyVariation = Math.sin(index * Math.PI / 7) * 3;
        const randomVariation = (Math.random() - 0.5) * 2;
        
        const temp = Math.round(baseTemp + hourlyVariation + dailyVariation + randomVariation);
        
        // Determine condition based on temperature
        let condition;
        if (temp > 28) condition = language === 'am' ? 'ፀሐያማ' : 'Sunny';
        else if (temp > 25) condition = language === 'am' ? 'በከፊል ደመናማ' : 'Partly Cloudy';
        else if (temp > 20) condition = language === 'am' ? 'ደመናማ' : 'Cloudy';
        else condition = language === 'am' ? 'ቀላል ዝናብ' : 'Light Rain';

        // Calculate other weather parameters
        const humidity = Math.round(60 + Math.random() * 20);
        const rainfall = condition.includes('Rain') ? Math.round((Math.random() * 10) * 10) / 10 : 0;

        return {
          date: date.toISOString().split('T')[0],
          temp,
          humidity,
          rainfall,
          condition,
          location: language === 'am' ? 'አዲስ አበባ' : 'Addis Ababa'
        };
      });
    };

    // Generate initial weather data
    setWeatherData(generateWeatherData());

    // Update weather data every minute (for demo purposes)
    const interval = setInterval(() => {
      setWeatherData(generateWeatherData());
    }, 60000);

    return () => clearInterval(interval);
  }, [language]);

  // Update translations for all services when language changes
  useEffect(() => {
    const updatedServices = services.map(service => ({
      ...service,
      title: text.services[service.id === 1 ? 'soil' : 
                         service.id === 2 ? 'crop' : 
                         service.id === 3 ? 'weather' : 'drone'].title,
      shortDesc: text.services[service.id === 1 ? 'soil' : 
                             service.id === 2 ? 'crop' : 
                             service.id === 3 ? 'weather' : 'drone'].shortDesc,
      longDesc: text.services[service.id === 1 ? 'soil' : 
                            service.id === 2 ? 'crop' : 
                            service.id === 3 ? 'weather' : 'drone'].longDesc,
      features: text.services[service.id === 1 ? 'soil' : 
                           service.id === 2 ? 'crop' : 
                           service.id === 3 ? 'weather' : 'drone'].features
    }));
    setServices(updatedServices);
  }, [language, text]);

  // Translation helper functions
  const translateCondition = (condition) => {
    const translations = {
      'Sunny': 'ፀሐያማ',
      'Partly Cloudy': 'በከፊል ደመናማ',
      'Cloudy': 'ደመናማ',
      'Light Rain': 'ቀላል ዝናብ',
      'Rain': 'ዝናብ'
    };
    return translations[condition] || condition;
  };

  const translateLocation = (location) => {
    const translations = {
      'Addis Ababa': 'አዲስ አበባ',
      'Dire Dawa': 'ድሬዳዋ',
      'Bahir Dar': 'ባህር ዳር',
      'Mekelle': 'መቀሌ',
      'Hawassa': 'ሃዋሳ',
      'Adama': 'አዳማ'
    };
    return translations[location] || location;
  };

  return (
    <div className="services">
      <h1>{text.services.title}</h1>
      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.shortDesc}</p>
            <div>
              <button 
                className="learn-more"
                onClick={() => setSelectedService(service)}
              >
                {language === 'am' ? 'ተጨማሪ ይመልከቱ' : 'Learn More'}
              </button>
              {service.id === 3 && weatherData && weatherData.length > 0 && (
                <div className="preview-forecast">
                  <p>
                    {language === 'am' ? 'ዛሬ' : 'Today'}: {weatherData[0].temp}°C, {weatherData[0].condition}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedService(null)}>✕</button>
            <div className="modal-header">
              <div className="modal-icon">{selectedService.icon}</div>
              <h2>{selectedService.title}</h2>
            </div>
            <p className="modal-description">{selectedService.longDesc}</p>
            
            {selectedService.id === 3 && weatherData && weatherData.length > 0 && (
              <WeatherForecast data={weatherData} />
            )}
            
            <div className="features-list">
              <h3>{language === 'am' ? 'ዋና ባህሪያት:' : 'Key Features:'}</h3>
              <ul>
                {selectedService.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {selectedService.id === 4 && <DroneVideo />}
          </div>
        </div>
      )}

      {/* Contact Section */}
      <div className="contact-section">
        <h2>{language === 'am' ? 'ተጨማሪ መረጃ ይፈልጋሉ?' : 'Need More Information?'}</h2>
        <p>{language === 'am' ? 'ቡድናችን ማንኛውንም ጥያቄዎ ለመመለስ ዝግጁ ነው።' : 'Our team is ready to help you with any questions you might have.'}</p>
        <button className="contact-button" onClick={() => setShowContactForm(true)}>
          {language === 'am' ? 'አግኙን' : 'Contact Us'}
        </button>
      </div>

      {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
    </div>
  );
}

export default Services; 