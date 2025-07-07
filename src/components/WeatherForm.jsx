import { useState } from 'react'

function WeatherForm({ onSearch, loading }) {
  const [city, setCity] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim()) onSearch(city.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="weather-form">
      <input
        type="text"
        placeholder="Introduce una ciudad"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
    </form>
  )
}

export default WeatherForm
