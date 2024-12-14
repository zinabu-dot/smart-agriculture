export const ethiopianRegions = {
  // Major cities and regions in Ethiopia
  regions: [
    {
      name: "Addis Ababa",
      lat: 9.0320,
      lon: 38.7423,
      elevation: 2355,
      zone: "highland",
      crops: ["Vegetables", "Fruits", "Urban farming"]
    },
    {
      name: "Oromia",
      subRegions: [
        { name: "Adama", lat: 8.5400, lon: 39.2700, elevation: 1712, crops: ["Teff", "Wheat", "Maize"] },
        { name: "Jimma", lat: 7.6667, lon: 36.8333, elevation: 1780, crops: ["Coffee", "Maize", "Teff"] },
        { name: "Bale", lat: 7.0000, lon: 40.0000, elevation: 2300, crops: ["Wheat", "Barley", "Pulses"] }
      ]
    },
    {
      name: "Amhara",
      subRegions: [
        { name: "Bahir Dar", lat: 11.5842, lon: 37.3908, elevation: 1800, crops: ["Teff", "Millet", "Rice"] },
        { name: "Gondar", lat: 12.6000, lon: 37.4667, elevation: 2133, crops: ["Wheat", "Barley", "Oilseeds"] },
        { name: "Dessie", lat: 11.1333, lon: 39.6333, elevation: 2470, crops: ["Barley", "Wheat", "Pulses"] }
      ]
    },
    // Add more regions as needed
  ],

  // Get nearest agricultural zone based on coordinates
  getNearestZone(lat, lon) {
    let nearest = null;
    let minDistance = Infinity;

    this.regions.forEach(region => {
      if (region.subRegions) {
        region.subRegions.forEach(subRegion => {
          const distance = this.calculateDistance(lat, lon, subRegion.lat, subRegion.lon);
          if (distance < minDistance) {
            minDistance = distance;
            nearest = subRegion;
          }
        });
      } else {
        const distance = this.calculateDistance(lat, lon, region.lat, region.lon);
        if (distance < minDistance) {
          minDistance = distance;
          nearest = region;
        }
      }
    });

    return nearest;
  },

  // Calculate distance between two points
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c;
  },

  deg2rad(deg) {
    return deg * (Math.PI/180);
  }
}; 