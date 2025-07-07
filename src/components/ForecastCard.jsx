function ForecastCard({ data }) {
  const date = new Date(data.dt_txt).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
      <h3 className="capitalize text-lg font-semibold mb-2">{date}</h3>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={data.weather[0].description}
        className="w-20 h-20"
      />
      <p className="capitalize">{data.weather[0].description}</p>
      <p className="mt-1 text-gray-700">Temp: {Math.round(data.main.temp)}°C</p>
      <p className="text-gray-600">Viento: {Math.round(data.wind.speed)} m/s</p>
    </div>
  )
}

export default ForecastCard
