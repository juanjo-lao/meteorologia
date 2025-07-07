import { useState } from 'react'

function WeatherForm({ onSearch, loading }) {
  const [city, setCity] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim()) {
      onSearch(city.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        placeholder="Introduce una ciudad"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-r disabled:bg-gray-400"
      >
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
    </form>
  )
}

export default WeatherForm
