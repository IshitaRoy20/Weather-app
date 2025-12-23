const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const currentWeatherDiv = document.getElementById("currentWeather");
const forecastDiv = document.getElementById("forecast");

async function getCoordinates(city) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.length === 0) throw new Error("City not found");
  return {
    lat: data[0].lat,
    lon: data[0].lon,
    name: data[0].display_name.split(',')[0]
  };
}

async function getWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
  const res = await fetch(url);
  return await res.json();
}

function getWeatherIcon(code) {
  const weatherMap = {
    0: ["☀️", "Clear"],
    1: ["🌤️", "Mainly Clear"],
    2: ["⛅", "Partly Cloudy"],
    3: ["☁️", "Overcast"],
    45: ["🌫️", "Foggy"],
    61: ["🌧️", "Light Rain"],
    63: ["🌧️", "Rain"],
    80: ["🌦️", "Showers"],
    95: ["⛈️", "Thunderstorm"]
  };
  return weatherMap[code] || ["☁️", "Cloudy"];
}

function displayWeather(cityName, data) {
  const current = data.current;
  const daily = data.daily;
  const [icon, desc] = getWeatherIcon(current.weather_code);
  const date = new Date().toLocaleDateString('en-GB', { weekday:'short', day:'numeric', month:'short'});


  currentWeatherDiv.innerHTML = `
    <div class="city-wrapper">
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7Z"/><circle cx="12" cy="9" r="2"/>
      </svg>
      <h2>${cityName}</h2>
    </div>
    <p class="date-text">${date}</p>
    <div style="font-size: 60px; text-align: center; margin: 10px 0;">${icon}</div>
    <p class="temp-main">${Math.round(current.temperature_2m)}°C</p>
    
    <div class="high-low-container">
      <span>H: ${Math.round(daily.temperature_2m_max[0])}°</span> 
      <span style="margin: 0 10px; opacity: 0.5;">|</span>
      <span>L: ${Math.round(daily.temperature_2m_min[0])}°</span>
    </div>

    <p class="weather-desc">${desc}</p>
    
    <div class="details-row">
      <div class="detail-item">
        <p><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
     xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2C12 2 5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z"
        stroke="white" stroke-width="2" fill="transparent"/>
</svg>
Humidity</p>
        <span>${current.relative_humidity_2m}%</span>
      </div>
      <div class="detail-item">
        <p><svg width="24" height="24" fill="none" stroke="white" stroke-width="2"
     viewBox="0 0 24 24">
  <path d="M3 8h13a3 3 0 1 0-3-3"/>
  <path d="M3 12h17a3 3 0 1 1-3 3"/>
</svg>
Wind</p>
        <span>${Math.round(current.wind_speed_10m)} <small>km/h</small></span>
      </div>
    </div>
  `;
  forecastDiv.innerHTML = "";
  for (let i = 1; i <= 3; i++) {
    const dayName = new Date(daily.time[i]).toLocaleDateString('en-GB', { weekday:'short'});
    const [fIcon] = getWeatherIcon(daily.weather_code[i]);
    const maxTemp = Math.round(daily.temperature_2m_max[i]);
    const minTemp = Math.round(daily.temperature_2m_min[i]);

    forecastDiv.innerHTML += `
      <div class="forecast-day">
        <p>${dayName}</p>
        <div style="font-size:1.5rem; margin: 5px 0;">${fIcon}</div>
        <div class="f-temps">
          <span class="f-high">${maxTemp}°</span>
          <span class="f-low">${minTemp}°</span>
        </div>
      </div>
    `;
  }
}

async function fetchWeather() {
  const city = cityInput.value.trim();
  if (!city) return;
  currentWeatherDiv.innerHTML = `<p style="text-align: center; padding: 20px;">Loading...</p>`;
  try {
    const {lat, lon, name} = await getCoordinates(city);
    const data = await getWeather(lat, lon);
    displayWeather(name, data);
  } catch (err) {
    currentWeatherDiv.innerHTML = `<p style="text-align: center; color:#ffcccb; padding: 20px;">City not found</p>`;
  }
}

searchBtn.addEventListener("click", fetchWeather);
cityInput.addEventListener("keypress", (e) => {
  if(e.key === "Enter") fetchWeather();
});