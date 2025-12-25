🌦️ Weather Web App

(website-https://sweet-cascaron-7d0c36.netlify.app/)

  A responsive Weather Web Application built using HTML, CSS, and JavaScript that fetches real-time weather data for any city. The app displays current conditions along with a short forecast using public weather and geocoding APIs.

🚀 Features

🔍 Search weather by city name

🌡️ Displays current temperature, humidity, and wind speed

📍 Uses geocoding to convert city names to coordinates

📅 Shows forecast data

⚡ Fast, lightweight, and responsive UI

🛠️ Tech Stack

Frontend: HTML, CSS, JavaScript

APIs Used:

OpenWeatherMap API – real-time weather & forecast data

Nominatim (OpenStreetMap) API – city name to latitude/longitude

Concepts Used:

Fetch API

Async / Await

DOM Manipulation

Responsive Design

📂 Project Structure

Weather-App/

│

├── index.html        # Main HTML structure

├── style.css         # Styling and responsiveness

├── script.js         # API calls and logic

└── README.md

▶️ How to Run

Clone the repository

git clone https://github.com/your-username/weather-app.git


Open index.html in your browser
(No backend or server required)

🧠 How It Works

User enters a city name

The app uses Nominatim API to fetch latitude and longitude

Coordinates are passed to OpenWeatherMap API

Weather data is fetched and dynamically displayed on the UI

📌 Sample Output
City: New Delhi
Temperature: 32°C
Humidity: 58%
Wind Speed: 12 km/h
Condition: Clear Sky

🔮 Future Improvements

📍 Auto-detect user location

🌙 Dark / Light mode

📊 Hourly weather forecast

❌ Error handling for invalid city names

🧪 Loading indicators and animations

🤝 Contributing

Contributions are welcome!
Feel free to fork the repository and submit a pull request.
