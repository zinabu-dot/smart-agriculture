export class WeatherPredictor {
  constructor() {
    // Ethiopian cities and their climate patterns
    this.cities = {
      'Addis Ababa': { lat: 9.0320, lon: 38.7423, elevation: 2355 },
      'Dire Dawa': { lat: 9.6000, lon: 41.8667, elevation: 1276 },
      'Bahir Dar': { lat: 11.5842, lon: 37.3908, elevation: 1800 },
      'Mekelle': { lat: 13.4967, lon: 39.4767, elevation: 2084 },
      'Hawassa': { lat: 7.0504, lon: 38.4955, elevation: 1708 },
      'Adama': { lat: 8.5400, lon: 39.2700, elevation: 1712 }
    };

    this.seasonalPatterns = {
      summer: {
        highland: { temp: [20, 25], humidity: [60, 80], rainfall: [5, 15] },
        lowland: { temp: [25, 35], humidity: [40, 60], rainfall: [0, 5] }
      },
      winter: {
        highland: { temp: [15, 20], humidity: [40, 60], rainfall: [0, 5] },
        lowland: { temp: [20, 30], humidity: [30, 50], rainfall: [0, 2] }
      },
      spring: {
        highland: { temp: [18, 23], humidity: [50, 70], rainfall: [2, 8] },
        lowland: { temp: [23, 33], humidity: [35, 55], rainfall: [1, 4] }
      },
      autumn: {
        highland: { temp: [17, 22], humidity: [55, 75], rainfall: [1, 6] },
        lowland: { temp: [22, 32], humidity: [45, 65], rainfall: [1, 3] }
      }
    };
  }

  getClimateZone(elevation) {
    return elevation > 1800 ? 'highland' : 'lowland';
  }

  getNearestCity(latitude, longitude) {
    let nearestCity = 'Addis Ababa';
    let minDistance = Infinity;

    for (const [city, coords] of Object.entries(this.cities)) {
      const distance = Math.sqrt(
        Math.pow(latitude - coords.lat, 2) + 
        Math.pow(longitude - coords.lon, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestCity = city;
      }
    }
    return this.cities[nearestCity];
  }

  async predict(latitude, longitude, date) {
    const cityData = this.getNearestCity(latitude, longitude);
    const climateZone = this.getClimateZone(cityData.elevation);
    const month = date.getMonth();
    const season = this.getSeason(latitude, month);
    const pattern = this.seasonalPatterns[season][climateZone];
    
    // Add daily and location-based variations
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const dailyVariation = Math.sin(dayOfYear * Math.PI / 182.5) * 3;
    const elevationEffect = (cityData.elevation - 1000) / 1000 * -2;
    
    const baseTemp = pattern.temp[0] + Math.random() * (pattern.temp[1] - pattern.temp[0]);
    const adjustedTemp = baseTemp + dailyVariation + elevationEffect;
    
    const humidity = Math.min(100, pattern.humidity[0] + Math.random() * (pattern.humidity[1] - pattern.humidity[0]));
    const rainfall = Math.max(0, pattern.rainfall[0] + Math.random() * (pattern.rainfall[1] - pattern.rainfall[0]));

    // Get weather condition
    const condition = this.getWeatherCondition(adjustedTemp, humidity, rainfall);

    return {
      temp: Math.round(adjustedTemp),
      humidity: Math.round(humidity),
      rainfall: Math.round(rainfall * 10) / 10,
      condition,
      location: Object.keys(this.cities).find(city => 
        this.cities[city].lat === cityData.lat && 
        this.cities[city].lon === cityData.lon
      )
    };
  }

  getSeason(latitude, month) {
    const isNorthernHemisphere = latitude > 0;
    
    if (month >= 3 && month <= 5) return isNorthernHemisphere ? 'spring' : 'autumn';
    if (month >= 6 && month <= 8) return isNorthernHemisphere ? 'summer' : 'winter';
    if (month >= 9 && month <= 11) return isNorthernHemisphere ? 'autumn' : 'spring';
    return isNorthernHemisphere ? 'winter' : 'summer';
  }

  getWeatherCondition(temp, humidity, rainfall) {
    if (rainfall > 5) return 'Rain';
    if (humidity > 70) return 'Cloudy';
    if (humidity > 50) return 'Partly Cloudy';
    return 'Sunny';
  }
} 