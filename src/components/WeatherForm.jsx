import Card from '@mui/joy/Card'
import Typography from '@mui/joy/Typography'

function WeatherCard({ weather, error }) {
  return (
    <Card variant="outlined" sx={{ width: 320, textAlign: 'center', p: 2 }}>
      <Typography level="h4" sx={{ mb: 1 }}>
        Consulta el tiempo
      </Typography>

      {error && (
        <Typography color="danger" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {weather && (
        <div style={{ marginTop: '1rem' }}>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
            alt={weather.description} 
            style={{ width: '80px', height: '80px' }}
          />
          <Typography textTransform="capitalize">{weather.description}</Typography>
          <Typography>🌡️ Temperatura: {weather.temperature}°C</Typography>
          <Typography>💨 Viento: {weather.windspeed} m/s</Typography>
        </div>
      )}
    </Card>
  )
}

export default WeatherCard
