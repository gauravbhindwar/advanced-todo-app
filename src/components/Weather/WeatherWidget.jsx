import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeather } from '../../store/todoSlice'
import { validateCity } from '../../utils/location'

const WeatherWidget = ({ location }) => {
  const dispatch = useDispatch()
  const { weatherData, loading, error } = useSelector(state => state.todos)
  const [validating, setValidating] = useState(false)

  useEffect(() => {
    if (!location || location.trim().length === 0) {
      dispatch({ type: 'todos/fetchWeather/fulfilled', payload: {} }); // Clear weather data
      return;
    }

    const timeoutId = setTimeout(async () => {
      setValidating(true);
      try {
        const validatedCity = await validateCity(location);
        dispatch(fetchWeather(validatedCity));
      } catch (err) {
        dispatch({ 
          type: 'todos/fetchWeather/rejected', 
          error: { message: err.message } 
        });
      } finally {
        setValidating(false);
      }
    }, 1000)
    
    return () => clearTimeout(timeoutId)
  }, [location, dispatch])

  if (validating || loading) 
    return <div className="bg-blue-900/30 text-blue-200 p-4 rounded-lg border border-blue-800">Checking weather data for {location}...</div>
  if (error) 
    return <div className="bg-red-900/30 text-red-200 p-4 rounded-lg border border-red-800">{error}</div>
  if (!weatherData.main) return null

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Weather for {location}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-gray-300"><span className="text-gray-400">Temperature:</span> {Math.round(weatherData.main.temp)}°C</p>
          <p className="text-gray-300"><span className="text-gray-400">Feels like:</span> {Math.round(weatherData.main.feels_like)}°C</p>
          <p className="text-gray-300"><span className="text-gray-400">Conditions:</span> {weatherData.weather[0].description}</p>
        </div>
        <div className="space-y-2">
          <p className="text-gray-300"><span className="text-gray-400">Humidity:</span> {weatherData.main.humidity}%</p>
          <p className="text-gray-300"><span className="text-gray-400">Wind:</span> {weatherData.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherWidget
