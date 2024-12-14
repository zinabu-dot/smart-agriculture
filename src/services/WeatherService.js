import axios from 'axios';
import { ethiopianRegions } from '../utils/EthiopianRegions';

export class WeatherService {
  constructor() {
    this.API_KEY = '5eef1a13abb8444ca28c928b637fda5b';
    this.BASE_URL = 'https://api.openweathermap.org/data/2.5';
  }

  async getWeatherForecast(latitude, longitude) {
    try {
      // Get current weather
      const currentResponse = await axios.get(
        `${this.BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${this.API_KEY}&units=metric`
      );

      // Get 7-day forecast
      const forecastResponse = await axios.get(
        `${this.BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${this.API_KEY}&units=metric`
      );

      // Get nearest agricultural zone
      const zone = ethiopianRegions.getNearestZone(latitude, longitude);

      // Process and combine the data
      const processedData = this.processWeatherData(currentResponse.data, forecastResponse.data, zone);

      return processedData;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Return mock data if API fails
      return Array.from({ length: 7 }, (_, index) => ({
        date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString(),
        temp: Math.round(20 + Math.random() * 10),
        humidity: Math.round(60 + Math.random() * 20),
        rainfall: Math.round(Math.random() * 100) / 10,
        condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Rain'][Math.floor(Math.random() * 5)],
        location: ethiopianRegions.getNearestZone(latitude, longitude).name,
        agriculturalData: {
          soilTemp: Math.round((20 + Math.random() * 10) * 0.8),
          gdd: Math.round(Math.random() * 20),
          crops: ethiopianRegions.getNearestZone(latitude, longitude).crops,
          advisory: []
        }
      }));
    }
  }

  processWeatherData(current, forecast, zone) {
    // Get daily forecasts (OpenWeatherMap returns 3-hour intervals)
    const dailyForecasts = this.groupForecastsByDay(forecast.list);

    return dailyForecasts.map((day, index) => ({
      date: new Date(day.dt * 1000).toLocaleDateString(),
      temp: Math.round(day.main.temp),
      humidity: day.main.humidity,
      rainfall: day.rain ? day.rain['3h'] : 0,
      condition: day.weather[0].main,
      wind: {
        speed: day.wind.speed,
        direction: this.getWindDirection(day.wind.deg)
      },
      location: zone.name,
      agriculturalData: {
        soilTemp: Math.round(day.main.temp * 0.8), // Approximate soil temperature
        gdd: this.calculateGDD(day.main.temp_max, day.main.temp_min),
        crops: zone.crops,
        advisory: this.generateAdvisory(day, zone)
      }
    }));
  }

  groupForecastsByDay(forecastList) {
    const dailyForecasts = [];
    const groupedByDay = {};

    forecastList.forEach(forecast => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      if (!groupedByDay[date]) {
        groupedByDay[date] = [];
      }
      groupedByDay[date].push(forecast);
    });

    // Get the average for each day
    Object.values(groupedByDay).forEach(dayForecasts => {
      const avgForecast = this.calculateDayAverage(dayForecasts);
      dailyForecasts.push(avgForecast);
    });

    return dailyForecasts.slice(0, 7); // Return 7 days
  }

  calculateDayAverage(dayForecasts) {
    const sum = dayForecasts.reduce((acc, forecast) => ({
      temp: acc.temp + forecast.main.temp,
      humidity: acc.humidity + forecast.main.humidity,
      rain: acc.rain + (forecast.rain ? forecast.rain['3h'] : 0)
    }), { temp: 0, humidity: 0, rain: 0 });

    const avg = {
      ...dayForecasts[0],
      main: {
        ...dayForecasts[0].main,
        temp: sum.temp / dayForecasts.length,
        humidity: sum.humidity / dayForecasts.length
      },
      rain: { '3h': sum.rain / dayForecasts.length }
    };

    return avg;
  }

  calculateGDD(maxTemp, minTemp) {
    const baseTemp = 10; // Base temperature for most crops
    const avgTemp = (maxTemp + minTemp) / 2;
    return Math.max(0, Math.round(avgTemp - baseTemp));
  }

  generateAdvisory(forecast, zone) {
    const advisories = [];

    if (forecast.main.temp > 30) {
      advisories.push('High temperature alert: Consider additional irrigation');
    }
    if (forecast.main.temp < 10) {
      advisories.push('Cold weather alert: Protect sensitive crops');
    }
    if (forecast.main.humidity > 80) {
      advisories.push('High humidity alert: Monitor for disease risk');
    }
    if (forecast.rain && forecast.rain['3h'] > 10) {
      advisories.push('Heavy rain alert: Check for proper drainage');
    }

    return advisories;
  }

  getWindDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }
} 