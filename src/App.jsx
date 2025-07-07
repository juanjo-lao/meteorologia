import { useState } from 'react'
import WeatherForm from './components/WeatherForm'
import HourlyForecast from './components/HourlyForecast'
import DailyForecast from './components/DailyForecast'
import './index.css'

function App() {
  const [hourly, setHourly] = useState([])
  const [daily, setDaily] = useState([])
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
      if (!response.ok) throw new Error('Ciudad no encontrada')
      const data = await response.json()

      // Filtrar datos de hoy (UTC)
      const todayUTC = new Date().toISOString().slice(0, 10)
      const hourlyData = data.list.filter(item => item.dt_txt.startsWith(todayUTC))

      // Agrupar por día
      const dailyMap = {}
      data.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0]
        if (!dailyMap[date]) {
          dailyMap[date] = item
        }
      })
      const dailyData = Object.values(dailyMap).slice(1, 6) // saltamos hoy

      setHourly(hourlyData)
      setDaily(dailyData)
    } catch (err) {
      setHourly([])
      setDaily([])
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1>🌤️ Pronóstico del Tiempo</h1>
      <WeatherForm onSearch={fetchForecast} loading={loading} />
      {error && <p className="error">{error}</p>}

      {hourly.length > 0 && (
        <>
          <h2>Por horas de hoy</h2>
          <HourlyForecast items={hourly} />
        </>
      )}

      {daily.length > 0 && (
        <>
          <h2>Próximos días</h2>
          <DailyForecast items={daily} />
        </>
      )}
    </div>
  )
}

export default App
