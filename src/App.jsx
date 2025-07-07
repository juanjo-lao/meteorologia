import { useState } from 'react'
import WeatherForm from './components/WeatherForm'
import ForecastCard from './components/ForecastCard'

function App() {
  const [forecast, setForecast] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const API_KEY = import.meta.env.VITE_API_KEY

  const fetchForecast = async (city) => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`
      )
      if (!response.ok) {
        throw new Error('Ciudad no encontrada')
      }
      const data = await response.json()

      // Filtramos para coger solo una predicción por día
      const daily = data.list.filter(item => item.dt_txt.includes('12:00:00'))

      setForecast(daily)
    } catch (err) {
      setForecast([])
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-100 to-sky-300 p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">🌤️ Pronóstico del Tiempo</h1>
      <WeatherForm onSearch={fetchForecast} loading={loading} />
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {forecast.map(item => (
          <ForecastCard key={item.dt} data={item} />
        ))}
      </div>
    </div>
  )
}

export default App
