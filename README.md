# WeatherNow - Real-Time Weather Forecast & Climate Telemetry

WeatherNow is a responsive weather dashboard that allows users to search for cities worldwide and view current weather conditions and a five-day forecast.

The application integrates with the OpenWeatherMap API through a secure Vercel serverless backend. It provides real-time weather information, dynamic backgrounds, responsive layouts, and error handling.

## Live Demo

**Production:** https://weathernow-phi-five.vercel.app

**GitHub Repository:** https://github.com/bawumia23/weather-dashboard

## Features

### Real-Time Weather Search
- Search for cities worldwide.
- Retrieve live weather information.
- Display city and country information.

### Current Weather Telemetry
- Current temperature and weather conditions.
- Dynamic weather icons and descriptions.
- Feels-like temperature.
- Humidity.
- Wind speed.
- Atmospheric pressure.

### Five-Day Forecast
- Five-day weather outlook.
- Daily minimum and maximum temperatures.
- Dynamic weather icons.
- Daily forecast summaries.

### Dynamic User Interface
- Weather-responsive backgrounds.
- Sunny, rainy, cloudy, and nighttime themes.
- Loading indicators.
- User-friendly error messages.
- Responsive desktop, tablet, and mobile layouts.

### Error Handling
- Invalid city names.
- Missing or invalid API credentials.
- API rate limits.
- Weather service errors.
- Network failures.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive design |
| JavaScript ES6+ | Frontend application logic |
| Fetch API | HTTP requests |
| Async/Await | Asynchronous operations |
| Node.js | Backend runtime |
| Vercel Serverless Functions | Secure API backend |
| OpenWeatherMap API | Weather data |
| node-fetch | Backend HTTP requests |
| CSS Flexbox and Grid | Responsive layouts |

## Architecture

The application separates frontend presentation from API credentials and external weather requests.

1. The user searches for a city in the browser.
2. The frontend sends a request to `/api/weather?city=CityName`.
3. The serverless backend validates the request.
4. The backend uses OpenWeatherMap geocoding to resolve the city.
5. It retrieves current weather and forecast information.
6. The backend returns the data to the frontend.
7. The frontend dynamically updates the dashboard.

The OpenWeatherMap API key is stored as a server-side environment variable and is never exposed in frontend JavaScript.

## Project Structure

```text
weather-dashboard/
├── api/
│   └── weather.js       # Secure serverless weather endpoint
├── index.html           # Application structure
├── style.css            # Responsive styling
├── script.js            # Frontend application logic
├── package.json         # Project dependencies
├── package-lock.json    # Dependency lockfile
├── .env.local           # Local environment variables (not committed)
├── .gitignore           # Excludes secrets and generated files
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites

- Node.js 22 or later
- npm
- A Vercel account
- An OpenWeatherMap API key

### 1. Clone the Repository

```bash
git clone https://github.com/bawumia23/weather-dashboard.git
```

### 2. Navigate to the Project

```bash
cd weather-dashboard
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure the API Key

Create a local environment file:

```bash
nano .env.local
```

Add your API key:

```env
OPENWEATHER_API_KEY=YOUR_API_KEY_HERE
```

Replace `YOUR_API_KEY_HERE` with your actual key.

Save the file. Never commit `.env.local` or share your API key.

### 5. Install Vercel CLI

```bash
npm install -g vercel
```

### 6. Run Locally

Link the project to your Vercel project if it is not already linked:

```bash
vercel link
```

Start the local development server:

```bash
vercel dev
```

Open:

http://localhost:3000

## API Endpoint

The application exposes the following endpoint:

```text
GET /api/weather?city=Accra
```

A successful response contains:

- `currentWeather`: Current weather information.
- `forecast`: Forecast information, including forecast entries and city details.

The backend validates requests and handles upstream API errors.

## Testing

The following functionality has been manually tested:

- [x] Valid city searches.
- [x] Current weather information.
- [x] Humidity, wind speed, and pressure.
- [x] Five-day forecast.
- [x] Dynamic weather icons and backgrounds.
- [x] Loading indicator.
- [x] Invalid city handling.
- [x] Responsive mobile layout.
- [x] Production homepage HTTP 200.
- [x] Production weather API HTTP 200.
- [x] Production API response containing weather and forecast data.

Check JavaScript syntax:

```bash
node --check script.js
node --check api/weather.js
```

## Deployment

WeatherNow is deployed on Vercel.

Production URL:

https://weathernow-phi-five.vercel.app

Configure `OPENWEATHER_API_KEY` in the Vercel project environment variables for the Production environment before deployment.

Deploy using:

```bash
vercel --prod
```

## Security

- API credentials are stored in environment variables.
- `.env.local` is excluded from Git.
- The frontend does not contain the OpenWeatherMap API key.
- External weather requests are handled by the serverless backend.

## Author

**Tajudeen Bawumia**

Aspiring Software Engineer | Backend Development Enthusiast

- GitHub: https://github.com/bawumia23
- Portfolio: https://bawumia23.github.io/developer-portfolio/

## License

This project is developed for educational and portfolio purposes. You are welcome to explore the source code and learn from its implementation.

Weather data is provided by OpenWeatherMap and is subject to its service availability and usage limitations.
