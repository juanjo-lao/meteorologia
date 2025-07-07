function HourlyForecast({ items }) {
  return (
    <div className="card-container">
      {items.map(item => (
        <div className="card" key={item.dt}>
          <p>{item.dt_txt.split(' ')[1].slice(0, 5)}</p>
          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt={item.weather[0].description}
          />
          <p>{Math.round(item.main.temp)}°C</p>
          <p>{item.weather[0].description}</p>
        </div>
      ))}
    </div>
  )
}

export default HourlyForecast
