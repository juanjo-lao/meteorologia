function DailyForecast({ items }) {
  return (
    <div className="card-container">
      {items.map(item => {
        const date = new Date(item.dt_txt).toLocaleDateString('es-ES', {
          weekday: 'long', day: 'numeric', month: 'short'
        })
        return (
          <div className="card" key={item.dt}>
            <h3>{date}</h3>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
            />
            <p>{Math.round(item.main.temp)}°C</p>
            <p>{item.weather[0].description}</p>
          </div>
        )
      })}
    </div>
  )
}

export default DailyForecast
