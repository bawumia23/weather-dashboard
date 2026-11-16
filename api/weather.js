const fetch = require("node-fetch");
module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      message: "Method not allowed."
    });
  }

  const city = String(req.query.city || "").trim();

  if (!city || city.length > 100) {
    return res.status(400).json({
      message: "Please enter a valid city name."
    });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      message: "Weather service configuration is incomplete."
    });
  }

  try {
    // Find the city's geographic coordinates.
    const geoParams = new URLSearchParams({
      q: city,
      limit: "1",
      appid: apiKey
    });

    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?${geoParams}`
    );

    if (!geoResponse.ok) {
      if (geoResponse.status === 429) {
        return res.status(429).json({
          message: "Weather request limit reached. Please try again later."
        });
      }

      return res.status(502).json({
        message: "Unable to locate the city. Please try again."
      });
    }

    const locations = await geoResponse.json();

    if (!locations.length) {
      return res.status(404).json({
        message: `We couldn't find "${city}". Check the spelling and try another city.`
      });
    }

    const { lat, lon } = locations[0];

    // Retrieve current weather and forecast simultaneously.
    const weatherParams = new URLSearchParams({
      lat: String(lat),
      lon: String(lon),
      appid: apiKey,
      units: "metric"
    });

    const currentUrl =
      `https://api.openweathermap.org/data/2.5/weather?${weatherParams}`;

    const forecastUrl =
      `https://api.openweathermap.org/data/2.5/forecast?${weatherParams}`;

    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      return res.status(502).json({
        message: "The weather service is temporarily unavailable."
      });
    }

    const [currentWeather, forecast] = await Promise.all([
      currentResponse.json(),
      forecastResponse.json()
    ]);

    res.setHeader(
      "Cache-Control",
      "s-maxage=300, stale-while-revalidate=600"
    );

    return res.status(200).json({
      currentWeather,
      forecast
    });
  } catch (error) {
    return res.status(502).json({
      message: "Unable to retrieve weather information. Please try again."
    });
  }
};
