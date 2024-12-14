import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { WeatherService } from '../services/WeatherService';
import './Services.css';
import { droneContent } from './DroneData';

// Initialize EmailJS with your public key
emailjs.init("k4CcsX0oDQ48plF7j");

function Services() {
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

  // Get user's location and weather data
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        
        setIsLoading(true);
        try {
          const forecast = await weatherService.getWeatherForecast(latitude, longitude);
          setWeatherData(forecast);
        } catch (error) {
          console.error('Error fetching weather data:', error);
          // Use mock data as fallback
          const mockWeatherData = Array.from({ length: 7 }, (_, index) => ({
            date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString(),
            temp: Math.round(20 + Math.random() * 10),
            humidity: Math.round(60 + Math.random() * 20),
            rainfall: Math.round(Math.random() * 100) / 10,
            condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Rain'][Math.floor(Math.random() * 5)]
          }));
          setWeatherData(mockWeatherData);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        // Use default location (Addis Ababa) if geolocation fails
        const defaultLatitude = 9.0320;
        const defaultLongitude = 38.7423;
        // Use the getWeatherForecast method instead
        weatherService.getWeatherForecast(defaultLatitude, defaultLongitude)
          .then(forecast => setWeatherData(forecast))
          .catch(err => {
            console.error('Error getting default weather:', err);
            // Use mock data as absolute fallback
            const mockWeatherData = Array.from({ length: 7 }, (_, index) => ({
              date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString(),
              temp: Math.round(20 + Math.random() * 10),
              humidity: Math.round(60 + Math.random() * 20),
              rainfall: Math.round(Math.random() * 100) / 10,
              condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Rain'][Math.floor(Math.random() * 5)],
              location: 'Addis Ababa',
              agriculturalData: {
                soilTemp: Math.round((20 + Math.random() * 10) * 0.8),
                gdd: Math.round(Math.random() * 20),
                crops: ['Teff', 'Wheat', 'Vegetables'],
                advisory: []
              }
            }));
            setWeatherData(mockWeatherData);
          });
      });
    }
  }, [weatherService]);

  // Contact form handling
  const handleContactFormChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const templateParams = {
      from_name: contactForm.name,
      from_email: contactForm.email,
      service_type: contactForm.service,
      message: contactForm.message,
      to_name: 'Smart Agriculture Team'
    };

    try {
      const result = await emailjs.send(
        'service_ri9x7nq',    // Your service ID
        'template_3v6wuhm',   // Your template ID
        templateParams,
        'k4CcsX0oDQ48plF7j'  // Your public key
      );
      
      if (result.status === 200) {
        console.log('SUCCESS!', result.text);
        alert('Thank you for your message! We will get back to you soon.');
        setContactForm({
          name: '',
          email: '',
          message: '',
          service: ''
        });
        setShowContactForm(false);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('FAILED...', error);
      alert('There was an error sending your message. Please try again.');
    }
  };

  // Contact Form Component
  const ContactForm = () => (
    <div className="contact-form-overlay">
      <div className="contact-form-container">
        <button className="close-button" onClick={() => setShowContactForm(false)}>✕</button>
        <h2>Contact Us</h2>
        <form onSubmit={handleContactSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={contactForm.name}
              onChange={handleContactFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={contactForm.email}
              onChange={handleContactFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="service">Service</label>
            <select
              id="service"
              name="service"
              value={contactForm.service}
              onChange={handleContactFormChange}
              required
            >
              <option value="">Select a service</option>
              <option value="soil">Soil Analysis</option>
              <option value="crop">Crop Management</option>
              <option value="weather">Weather Forecasting</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={contactForm.message}
              onChange={handleContactFormChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </div>
    </div>
  );

  // Update handleContact function
  const handleContact = () => {
    setShowContactForm(true);
  };

  const services = [
    {
      id: 1,
      icon: "🌍",
      title: "Soil Analysis",
      shortDesc: "Get detailed insights about your soil quality",
      longDesc: "Our advanced soil analysis service provides comprehensive reports on soil pH, nutrient levels, organic matter content, and recommendations for improvement. We use state-of-the-art technology to help you make informed decisions about fertilization and crop selection.",
      features: [
        "Detailed soil composition analysis",
        "Nutrient deficiency identification",
        "Customized fertilizer recommendations",
        "pH balance optimization"
      ]
    },
    {
      id: 2,
      icon: "🌾",
      title: "Crop Management",
      shortDesc: "Optimize your crop yields with smart solutions",
      longDesc: "Our crop management system uses AI and real-time monitoring to maximize your yield. We provide personalized recommendations for irrigation, pest control, and harvest timing based on your specific crop and local conditions.",
      features: [
        "Real-time crop monitoring",
        "Disease early warning system",
        "Irrigation scheduling",
        "Yield prediction"
      ]
    },
    {
      id: 3,
      icon: "🌤️",
      title: "Weather Forecasting",
      shortDesc: "Stay updated with accurate weather predictions",
      longDesc: "Get hyperlocal weather forecasts specifically designed for agricultural needs. Our system combines multiple weather data sources with machine learning to provide accurate predictions and agricultural advisories.",
      features: [
        "Temperature and Humidity Monitoring",
        "Precipitation Forecasting",
        "Frost and Heat Warnings",
        "Wind Speed and Direction",
        "Soil Temperature Predictions",
        "Growing Degree Days (GDD)",
        "Evapotranspiration Rates",
        "Agricultural Advisory Alerts"
      ],
      weatherData: weatherData
    },
    {
      id: 4,
      icon: "🚁",
      title: "Drone Services",
      shortDesc: "Advanced aerial monitoring and precision agriculture",
      longDesc: "Our drone services provide cutting-edge solutions for crop monitoring, pesticide spraying, and disease detection. Using high-resolution cameras and AI technology, we help farmers optimize their field operations and increase efficiency.",
      features: [
        "Precision pesticide spraying",
        "Real-time crop health monitoring",
        "Disease detection and mapping",
        "3D field mapping and analysis"
      ],
      videoUrl: "https://example.com/drone-footage.mp4" // Add actual video URL
    }
  ];

  const WeatherForecast = ({ data }) => {
    if (!data) return null;
    
    return (
      <div className="weather-forecast">
        <h3>7-Day Weather Forecast for {data[0].location}</h3>
        <div className="forecast-summary">
          <div className="summary-item">
            <h4>Growing Conditions</h4>
            <p>Optimal for: {data[0].temp > 25 ? 'Teff, Maize, Vegetables' : 'Wheat, Barley, Potatoes'}</p>
          </div>
          <div className="summary-item">
            <h4>Advisory</h4>
            <p>
              {data[0].temp > 30 ? 'Consider additional irrigation' : 
               data[0].temp < 15 ? 'Watch for frost damage' : 
               data[0].humidity > 80 ? 'Monitor for disease risk' : 
               'Normal farming conditions'}
            </p>
          </div>
        </div>
        <div className="forecast-grid">
          {data.map((day, index) => (
            <div key={index} className="forecast-card">
              <div className="forecast-date">{day.date}</div>
              <div className="forecast-condition">
                {day.condition === 'Sunny' && '☀️'}
                {day.condition === 'Partly Cloudy' && '⛅'}
                {day.condition === 'Cloudy' && '☁️'}
                {day.condition === 'Light Rain' && '🌦️'}
                {day.condition === 'Rain' && '🌧️'}
                <span>{day.condition}</span>
              </div>
              <div className="forecast-temp">{day.temp}°C</div>
              <div className="forecast-details">
                <div>Humidity: {day.humidity}%</div>
                <div>Rainfall: {day.rainfall}mm</div>
                <div>Soil Temp: {Math.round(day.temp * 0.8)}°C</div>
                <div>GDD: {Math.max(0, Math.round((day.temp - 10) * 1))}</div>
              </div>
              <div className="forecast-advisory">
                {day.temp > 30 && <p className="warning">Heat stress risk ⚠️</p>}
                {day.temp < 5 && <p className="warning">Frost risk ⚠️</p>}
                {day.humidity > 80 && <p className="warning">Disease risk ⚠️</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const DroneVideo = () => (
    <div className="drone-video">
      <h3>Drone Services in Action</h3>
      <div className="video-grid">
        {droneContent.videos.map(video => (
          <div key={video.id} className="video-container">
            <div className="video-wrapper">
              <iframe
                src={video.url}
                width="100%"
                height="300"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title}
              />
            </div>
            <div className="video-info">
              <h4>{video.title}</h4>
              <p>{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="gallery-title">Image Analysis Examples</h3>
      <div className="image-gallery">
        {droneContent.images.map(image => (
          <div key={image.id} className="gallery-item">
            <img
              src={image.url}
              alt={image.title}
              onClick={() => window.open(image.url, '_blank')}
            />
            <div className="gallery-info">
              <h4>{image.title}</h4>
              <p>{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="services">
      <h1>Our Services</h1>
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
                Learn More
              </button>
              {service.id === 3 && weatherData && (
                <div className="preview-forecast">
                  <p>Today: {weatherData[0].temp}°C, {weatherData[0].condition}</p>
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
            
            {selectedService.id === 3 && (
              <>
                {weatherData ? (
                  <WeatherForecast data={weatherData} />
                ) : (
                  <div className="loading-weather">
                    <p>Loading weather forecast...</p>
                  </div>
                )}
              </>
            )}
            
            <div className="features-list">
              <h3>Key Features:</h3>
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

      {/* Contact Us Button */}
      <div className="contact-section">
        <h2>Need More Information?</h2>
        <p>Our team is ready to help you with any questions you might have.</p>
        <button className="contact-button" onClick={handleContact}>
          Contact Us
        </button>
      </div>

      {showContactForm && <ContactForm />}
    </div>
  );
}

export default Services; 