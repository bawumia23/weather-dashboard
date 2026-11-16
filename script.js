const API_KEY =
  typeof OPENWEATHER_API_KEY !== "undefined"
    ? OPENWEATHER_API_KEY
    : "";

const API_BASE = "https://api.openweathermap.org";

const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");
const weatherContent = document.getElementById("weather-content");
const forecastGrid = document.getElementById("forecast-grid");

const searchButton = searchForm.querySelector("button");

// Fetch JSON data and handle API errors.
async function fetchWeatherData(url) {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Invalid API key. Check your OpenWeatherMap configuration.");
    }

    if (response.status === 429) {
      throw new Error("API request limit reached. Please try again later.");
    }

    if (response.status >= 500) {
      throw new Error("The weather service is temporarily unavailable.");
    }

    throw new Error(data.message || "Unable to retrieve weather information.");
  }

  return data;
}

// Convert a city name into geographic coordinates.
async function getCityCoordinates(city) {
  const params = new URLSearchParams({
    q: city,
    limit: 1,
    appid: API_KEY
  });

  const locations = await fetchWeatherData(
    `${API_BASE}/geo/1.0/direct?${params}`
  );

  if (!locations.length) {
    throw new Error(
      `We couldn't find "${city}". Check the spelling and try another city.`
    );
  }

  return locations[0];
}

// Retrieve current weather and five-day forecast.
async function getWeatherData(latitude, longitude) {
  const params = new URLSearchParams({
    lat: latitude,
    lon: longitude,
    appid: API_KEY,
    units: "metric"
  });

  const currentUrl =
    `${API_BASE}/data/2.5/weather?${params}`;

  const forecastUrl =
    `${API_BASE}/data/2.5/forecast?${params}`;

  const [currentWeather, forecast] = await Promise.all([
    fetchWeatherData(currentUrl),
    fetchWeatherData(forecastUrl)
  ]);

  return { currentWeather, forecast };
}

// Display the current date.
function displayCurrentDate() {
  const dateElement = document.getElementById("current-date");

  dateElement.textContent = new Intl.DateTimeFormat("en", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date());
}

// Display current weather information.
function displayCurrentWeather(weather) {
  const condition = weather.weather[0];
  const isNight = condition.icon.endsWith("n");
  const mainCondition = condition.main.toLowerCase();

  document.getElementById("location-name").textContent =
    `${weather.name}, ${weather.sys.country}`;

  document.getElementById("temperature").textContent =
    `${Math.round(weather.main.temp)}°C`;

  document.getElementById("weather-condition").textContent =
    condition.main;

  document.getElementById("weather-description").textContent =
    condition.description;

  document.getElementById("feels-like").textContent =
    `Feels like ${Math.round(weather.main.feels_like)}°C`;

  document.getElementById("humidity").textContent =
    `${weather.main.humidity}%`;

  document.getElementById("wind-speed").textContent =
    `${weather.wind.speed} m/s`;

  document.getElementById("pressure").textContent =
    `${weather.main.pressure} hPa`;

  const icon = document.getElementById("weather-icon");

  icon.src =
    `https://openweathermap.org/img/wn/${condition.icon}@2x.png`;

  icon.alt = condition.description;

  updateBackground(mainCondition, isNight);
  displayCurrentDate();
}

// Change the page background based on weather conditions.
function updateBackground(condition, isNight) {
  document.body.classList.remove(
    "sunny",
    "rainy",
    "night",
    "cloudy"
  );

  if (isNight) {
    document.body.classList.add("night");
  } else if (
    condition.includes("rain") ||
    condition.includes("drizzle") ||
    condition.includes("thunderstorm") ||
    condition.includes("snow")
  ) {
    document.body.classList.add("rainy");
  } else if (
    condition.includes("cloud") ||
    condition.includes("mist") ||
    condition.includes("fog") ||
    condition.includes("haze") ||
    condition.includes("smoke") ||
    condition.includes("dust")
  ) {
    document.body.classList.add("cloudy");
  } else {
    document.body.classList.add("sunny");
  }
}

// Convert forecast records into five daily summaries.
function groupForecastByDay(forecast) {
  const dailyGroups = {};

  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];

    if (!dailyGroups[date]) {
      dailyGroups[date] = [];
    }

    dailyGroups[date].push(item);
  });

  return Object.entries(dailyGroups)
    .slice(0, 5)
    .map(([date, records]) => {
      const middayRecord = records.reduce((closest, record) => {
        const recordHour = Number(record.dt_txt.slice(11, 13));
        const closestHour = Number(closest.dt_txt.slice(11, 13));

        return Math.abs(recordHour - 12) <
          Math.abs(closestHour - 12)
          ? record
          : closest;
      });

      const temperatures = records.map(
        (record) => record.main.temp
      );

      return {
        date,
        temperature: middayRecord.main.temp,
        minimum: Math.min(...temperatures),
        maximum: Math.max(...temperatures),
        weather: middayRecord.weather[0]
      };
    });
}

// Display forecast cards.
function displayForecast(forecast) {
  const dailyForecast = groupForecastByDay(forecast);

  forecastGrid.innerHTML = dailyForecast.map((day) => {
    const date = new Date(`${day.date}T12:00:00`);

    const dayName = new Intl.DateTimeFormat("en", {
      weekday: "short"
    }).format(date);

    const iconUrl =
      `https://openweathermap.org/img/wn/${day.weather.icon}.png`;

    return `
      <article class="forecast-card">
        <p class="forecast-day">${dayName}</p>
        <img
          class="forecast-icon"
          src="${iconUrl}"
          alt="${day.weather.description}"
        >
        <p class="forecast-temp">
          ${Math.round(day.maximum)}° / ${Math.round(day.minimum)}°
        </p>
        <p class="forecast-description">
          ${day.weather.description}
        </p>
      </article>
    `;
  }).join("");
}

// Manage loading visibility.
function showLoading(isLoading) {
  loading.classList.toggle("hidden", !isLoading);
  searchButton.disabled = isLoading;
  searchButton.textContent = isLoading ? "Searching..." : "Search";
}

// Display errors to the user.
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
  weatherContent.classList.add("hidden");
}

// Search for a city and update the dashboard.
async function searchWeather(city) {
  if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
    showError(
      "API key missing. Please configure your OpenWeatherMap API key in config.js."
    );
    return;
  }

  showLoading(true);

  errorMessage.classList.add("hidden");

  try {
    const location = await getCityCoordinates(city);

    const { currentWeather, forecast } =
      await getWeatherData(location.lat, location.lon);

    displayCurrentWeather(currentWeather);
    displayForecast(forecast);

    weatherContent.classList.remove("hidden");
  } catch (error) {
    showError(error.message || "Something went wrong. Please try again.");
  } finally {
    showLoading(false);
  }
}

// Listen for city searches.
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  searchWeather(city);
});
