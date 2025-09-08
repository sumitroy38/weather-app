import React, { useState, useEffect } from 'react';
import { Search, MapPin, Thermometer, Droplets, Wind, Eye, Sunrise, Sunset, Cloud } from 'lucide-react';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('');
  
  const API_KEY = '6f88dc6de6524090964184610250809';
  const API_BASE_URL = 'https://api.weatherapi.com/v1';

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `${API_BASE_URL}/current.json?key=${API_KEY}&q=${cityName}&aqi=yes`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (cityName) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${cityName}&days=3&aqi=yes&alerts=yes`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchForecast(city.trim());
    }
  };

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchForecast(`${latitude},${longitude}`);
        },
        (error) => {
          setError('Unable to get your location');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser');
    }
  };

  useEffect(() => {
    fetchForecast('Jaipur'); // Default city
  }, []);

  const formatTime = (timeStr) => {
    return new Date(`2000-01-01 ${timeStr}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Weather Dashboard</h1>
          <p className="text-blue-100">Get current weather and 3-day forecast</p>
        </div>

        {/* Search Section */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 mb-6 shadow-lg">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(e);
                  }
                }}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
            <button
              onClick={getCurrentLocationWeather}
              disabled={loading}
              className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              <MapPin className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Weather Display */}
        {weatherData && (
          <div className="space-y-6">
            {/* Current Weather */}
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {weatherData.location.name}, {weatherData.location.country}
                  </h2>
                  <p className="text-blue-100">
                    {new Date(weatherData.location.localtime).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-white">
                    {Math.round(weatherData.current.temp_c)}°C
                  </div>
                  <div className="text-blue-100">
                    Feels like {Math.round(weatherData.current.feelslike_c)}°C
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center mb-6">
                <img
                  src={`https:${weatherData.current.condition.icon}`}
                  alt={weatherData.current.condition.text}
                  className="w-20 h-20"
                />
                <span className="text-xl text-white ml-4">
                  {weatherData.current.condition.text}
                </span>
              </div>

              {/* Weather Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Droplets className="h-6 w-6 text-blue-200 mx-auto mb-2" />
                  <div className="text-white font-medium">Humidity</div>
                  <div className="text-blue-100">{weatherData.current.humidity}%</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Wind className="h-6 w-6 text-blue-200 mx-auto mb-2" />
                  <div className="text-white font-medium">Wind Speed</div>
                  <div className="text-blue-100">{weatherData.current.wind_kph} km/h</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Eye className="h-6 w-6 text-blue-200 mx-auto mb-2" />
                  <div className="text-white font-medium">Visibility</div>
                  <div className="text-blue-100">{weatherData.current.vis_km} km</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Thermometer className="h-6 w-6 text-blue-200 mx-auto mb-2" />
                  <div className="text-white font-medium">Pressure</div>
                  <div className="text-blue-100">{weatherData.current.pressure_mb} mb</div>
                </div>
              </div>
            </div>

            {/* 3-Day Forecast */}
            {weatherData.forecast && (
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4">3-Day Forecast</h3>
                <div className="grid gap-4">
                  {weatherData.forecast.forecastday.map((day, index) => (
                    <div key={day.date} className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-white font-medium min-w-20">
                            {index === 0 ? 'Today' : 
                             index === 1 ? 'Tomorrow' : 
                             new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                          <img
                            src={`https:${day.day.condition.icon}`}
                            alt={day.day.condition.text}
                            className="w-10 h-10"
                          />
                          <div className="text-blue-100">{day.day.condition.text}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold">
                            {Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°
                          </div>
                          <div className="text-blue-200 text-sm">
                            {Math.round(day.day.daily_chance_of_rain)}% rain
                          </div>
                        </div>
                      </div>
                      
                      {/* Additional day details */}
                      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div className="text-blue-100">
                          <Sunrise className="inline h-4 w-4 mr-1" />
                          {formatTime(day.astro.sunrise)}
                        </div>
                        <div className="text-blue-100">
                          <Sunset className="inline h-4 w-4 mr-1" />
                          {formatTime(day.astro.sunset)}
                        </div>
                        <div className="text-blue-100">
                          <Droplets className="inline h-4 w-4 mr-1" />
                          {day.day.avghumidity}%
                        </div>
                        <div className="text-blue-100">
                          <Wind className="inline h-4 w-4 mr-1" />
                          {Math.round(day.day.maxwind_kph)} km/h
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;