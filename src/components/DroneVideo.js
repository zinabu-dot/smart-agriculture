import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { droneContent } from './DroneData';

function DroneVideo() {
  const { language } = useLanguage();

  return (
    <div className="drone-video">
      <h3>{language === 'am' ? 'የድሮን አገልግሎቶች በተግባር' : 'Drone Services in Action'}</h3>
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
    </div>
  );
}

export default DroneVideo; 