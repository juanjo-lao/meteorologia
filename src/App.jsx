import { useState } from 'react'
import WeatherForm from './components/WeatherForm'
import WeatherCard from './components/WeatherCard'

const API_KEY = import.meta.env.VITE_API_KEY

function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeather = async (city) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `/api/prediccion/especifica/municipio/diaria/{municipio}=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`
      )
      const data = await response.json()

      if (data.cod !== 200) {
        setError(data.message || 'No se pudo obtener el tiempo')
        setWeather(null)
      } else {
        setWeather({
          temperature: data.main.temp,
          windspeed: data.wind.speed,
          description: data.weather[0].description,
          icon: data.weather[0].icon
        })
      }
    } catch (err) {
      console.error('Error al obtener el tiempo:', err)
      setError('No se pudo obtener el tiempo')
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
      <WeatherForm onSearch={fetchWeather} loading={loading} />
      <WeatherCard weather={weather} error={error} />
    </div>
  )
}

export default App
