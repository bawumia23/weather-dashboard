# WeatherNow - Real-Time Weather Forecast & Climate Telemetry

WeatherNow is a responsive web application that allows users to search for cities around the world and view real-time weather conditions and a five-day forecast.

The application integrates with the OpenWeatherMap API to retrieve live weather data and dynamically updates the interface based on current weather conditions.

## Live Demo

Coming soon.

## Features

### Real-Time Weather Search

- Search for weather information in cities worldwide.
- Retrieve live weather data using the OpenWeatherMap API.
- Display the city and country name.

### Current Weather Telemetry

The dashboard displays:

- Current temperature
- Weather condition
- Dynamic weather icon
- Weather description
- Feels-like temperature
- Humidity
- Wind speed
- Atmospheric pressure

### Five-Day Forecast

- Displays a five-day weather outlook.
- Calculates daily minimum and maximum temperatures.
- Uses dynamic weather icons.
- Groups forecast data into daily summaries.

### Dynamic User Interface

The application changes its background based on weather conditions, including:

- Sunny weather
- Rainy weather
- Cloudy conditions
- Nighttime conditions

### Error Handling

WeatherNow handles common errors gracefully:

- Invalid or unknown city names
- Missing API keys
- Invalid API keys
- API rate limits
- Temporary weather service errors
- Network failures

### Responsive Design

The interface is designed to work across desktop, tablet, and mobile devices using CSS Flexbox, Grid, and responsive media queries.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive design |
| JavaScript ES6+ | Application logic |
| Fetch API | Retrieving weather data |
| Async/Await | Asynchronous API operations |
| OpenWeatherMap API | Live weather and forecast data |
| CSS Flexbox | Responsive component layouts |
| CSS Grid | Forecast and telemetry layouts |

## API Integration

WeatherNow uses the OpenWeatherMap API for:

1. Geocoding city names into geographic coordinates.
2. Retrieving current weather conditions.
3. Retrieving five-day weather forecasts.

The application uses JavaScript's Fetch API with `async/await` and `try/catch` blocks to handle asynchronous API requests and errors.

## Project Structure

```text
weather-dashboard/
├── index.html       # Application structure
├── style.css        # Responsive styling
├── script.js        # Weather API and application logic
├── config.js        # Local API configuration (not committed)
├── .gitignore       # Prevents API key exposure
└── README.md        # Project documentation

Getting Started
Prerequisites
- A modern web browser
- Python 3 or another local web server
- An OpenWeatherMap API key
1. Clone the Repository
git clone https://github.com/bawumia23/weather-dashboard.git

2. Navigate to the Project Directory
cd weather-dashboard

3. Create Your API Configuration
Create a file named config.js in the project root:
const OPENWEATHER_API_KEY = "YOUR_API_KEY_HERE";

The config.js file is excluded from Git using .gitignore.
4. Start a Local Server
python3 -m http.server 8000

5. Open the Application
Visit:

http://localhost:8000
Testing
The following functionality has been tested manually:
- [x] Valid city searches
- [x] Real-time weather data loading
- [x] Current weather telemetry
- [x] Dynamic weather icons
- [x] Five-day forecast display
- [x] Loading indicator
- [x] Invalid city error handling
- [x] Dynamic weather backgrounds
- [x] Mobile responsive layout
JavaScript syntax can also be verified with:
node --check script.js

API Key Security
This project uses a local config.js file for development. The file is excluded from version control to prevent accidental exposure of the API key.

For a production application, API requests containing secret credentials should be handled through a secure backend service or serverless function rather than exposing credentials in browser code.
Important Notice
WeatherNow is an educational and portfolio project. Weather data is provided by OpenWeatherMap and may be subject to API availability, rate limits, and service limitations.
Author
Tajudeen Bawumia

Aspiring Software Engineer | Backend Development Enthusiast
- GitHub: https://github.com/bawumia23
- Portfolio: https://bawumia23.github.io/developer-portfolio/
License
This project is developed for educational and portfolio purposes. You are welcome to explore the source code and learn from its implementation.
