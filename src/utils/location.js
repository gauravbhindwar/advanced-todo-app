const findNearestCity = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to get location data');
    }
    
    const cities = await response.json();
    if (!cities.length) {
      throw new Error('No cities found near your location');
    }

    // Try each city until we find one with weather data
    for (const city of cities) {
      const weatherCheck = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
      );
      if (weatherCheck.ok) {
        const weatherData = await weatherCheck.json();
        return weatherData.name; // Use the exact city name from weather API
      }
    }
    
    throw new Error('No weather data available for nearby cities');
  } catch (error) {
    console.error('Error finding nearest city:', error);
    throw error;
  }
};

export const getCurrentCity = async () => {
  if (!navigator.geolocation) {
    throw new Error('Geolocation is not supported by your browser');
  }

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
    });
    
    return await findNearestCity(position.coords.latitude, position.coords.longitude);
  } catch (error) {
    const errorMessage = error.code === 1 ? 'Location access denied' :
                        error.code === 2 ? 'Location unavailable' :
                        error.code === 3 ? 'Location request timed out' :
                        'Could not detect your location';
    throw new Error(errorMessage);
  }
};

// New function to get precise location data
export const getPreciseLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
          timestamp: position.timestamp
        });
      },
      (error) => {
        const errorMessage = error.code === 1 ? 'Permission denied - please allow location access' :
                          error.code === 2 ? 'Location unavailable' :
                          error.code === 3 ? 'Location request timed out' :
                          'Could not detect your location';
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
};

// Function to format the location data for display
export const formatLocationData = (location) => {
  if (!location) return null;
  
  return {
    latitude: location.latitude.toFixed(6),
    longitude: location.longitude.toFixed(6),
    accuracy: location.accuracy ? `${location.accuracy.toFixed(2)} meters` : 'Unknown',
    altitude: location.altitude ? `${location.altitude.toFixed(2)} meters` : 'Not available',
    heading: location.heading ? `${location.heading.toFixed(2)}°` : 'Not available',
    speed: location.speed ? `${location.speed.toFixed(2)} m/s` : 'Not available',
    timestamp: new Date(location.timestamp).toLocaleString()
  };
};

export const validateCity = async (cityName) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName.trim())}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
  );
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Please enter a valid city name');
    }
    throw new Error('Failed to validate city');
  }
  
  const data = await response.json();
  return data.name; // Return the correct city name from API
};
