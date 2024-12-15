import React from 'react';
import { useLanguage } from '../context/LanguageContext';

function WeatherForecast({ data }) {
  const { language } = useLanguage();

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString + 'T00:00:00');
      
      if (language === 'am') {
        const amharicDays = ['እሁድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'አርብ', 'ቅዳሜ'];
        const amharicMonths = ['ጃንዩ', 'ፌብሩ', 'ማርች', 'ኤፕሪ', 'ሜይ', 'ጁን', 'ጁላይ', 'ኦገስ', 'ሴፕቴ', 'ኦክቶ', 'ኖቬም', 'ዲሴም'];
        
        const dayName = amharicDays[date.getDay()];
        const monthName = amharicMonths[date.getMonth()];
        return `${dayName}፣ ${monthName} ${date.getDate()}`;
      }
      
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      console.error('Date parsing error:', error);
      return dateString;
    }
  };

  const translateWeatherTerm = (term, type) => {
    const translations = {
      temperature: {
        en: 'Temperature',
        am: 'ሙቀት'
      },
      humidity: {
        en: 'Humidity',
        am: 'እርጥበት'
      },
      rainfall: {
        en: 'Rainfall',
        am: 'ዝናብ'
      }
    };
    return translations[type][language] || term;
  };

  if (!data) return null;
  
  return (
    <div className="weather-forecast">
      <h3>
        {language === 'am' 
          ? `የ7 ቀናት የአየር ሁኔታ ትንበያ - ${data[0].location}`
          : `7-Day Weather Forecast for ${data[0].location}`
        }
      </h3>
      <div className="forecast-grid">
        {data.map((day, index) => (
          <div key={index} className="forecast-card">
            <div className="forecast-date">{formatDate(day.date)}</div>
            <div className="forecast-condition">
              {day.condition === (language === 'am' ? 'ፀሐያማ' : 'Sunny') && '☀️'}
              {day.condition === (language === 'am' ? 'በከፊል ደመናማ' : 'Partly Cloudy') && '⛅'}
              {day.condition === (language === 'am' ? 'ደመናማ' : 'Cloudy') && '☁️'}
              {day.condition === (language === 'am' ? 'ቀላል ዝናብ' : 'Light Rain') && '🌦️'}
              {day.condition === (language === 'am' ? 'ዝናብ' : 'Rain') && '🌧️'}
              <span>{day.condition}</span>
            </div>
            <div className="forecast-temp">{day.temp}°C</div>
            <div className="forecast-details">
              <div>{translateWeatherTerm('Humidity', 'humidity')}: {day.humidity}%</div>
              <div>{translateWeatherTerm('Rainfall', 'rainfall')}: {day.rainfall}mm</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherForecast; 