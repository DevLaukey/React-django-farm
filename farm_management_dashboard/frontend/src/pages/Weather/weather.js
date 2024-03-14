import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  CircularProgress,
  TextField,
} from "@mui/material";
import MainWeatherWindow from "./MainWeather";

// Main component for the weather application
const App = () => {
  // State variables for weather data, input city, loading status, and error message
  const [weatherData, setWeatherData] = useState({
    city: undefined,
    dailyDays: [],
    hourlyDays: [],
  });
  const [inputCity, setInputCity] = useState("London");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to update the state with new weather data
  const updateState = (dailyData, hourlyData) => {
    // Extract city name and initialize arrays for daily and hourly data
    const city = dailyData.city.name;
    const dailyDays = [];
    const hourlyDays = [];

    // Helper function to convert timestamp to date string
    const timestampToDateTime = (timestamp) => {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString("en-US", {
        day: "numeric",
        month: "numeric",
      });
    };

    // Populate dailyDays array with data from dailyData.list
    if (dailyData.list) {
      for (let i = 0; i < dailyData.list.length; i++) {
        if (dailyData.list[i]?.weather) {
          dailyDays.push({
            date: timestampToDateTime(dailyData.list[i].dt),
            weather_desc: dailyData.list[i].weather[0].description || "",
            icon: dailyData.list[i].weather[0].icon || "",
            temp: dailyData.list[i].main.temp || 0,
          });
        }
      }
    }

    // Populate hourlyDays array with data from hourlyData.list
    if (hourlyData.list) {
      for (let i = 0; i < hourlyData.list.length; i++) {
        if (hourlyData.list[i].weather) {
          hourlyDays.push({
            date: timestampToDateTime(hourlyData.list[i].dt),
            weather_desc: hourlyData.list[i].weather[0].description || "",
            icon: hourlyData.list[i].weather[0].icon || "",
            temp: hourlyData.list[i].main.temp || 0,
          });
        }
      }
    }

    // Update weatherData state with new data
    setWeatherData({
      city: city,
      dailyDays: dailyDays,
      hourlyDays: hourlyDays,
    });
  };

  // Function to make API calls to fetch weather data
  const makeApiCall = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch daily weather data
      const dailyResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${inputCity}&cnt=16&appid=6557810176c36fac5f0db536711a6c52`
      );
      const dailyData = await dailyResponse.json();

      // Fetch hourly weather data
      const hourlyResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${inputCity}&cnt=8&appid=6557810176c36fac5f0db536711a6c52`
      );
      const hourlyData = await hourlyResponse.json();

      // If both API calls are successful, update state with new data
      if (dailyData.cod === "200" && hourlyData.cod === "200") {
        setLoading(false);
        updateState(dailyData, hourlyData);
      } else {
        console.error("API call unsuccessful:", dailyData, hourlyData);
        setError("City not found. Please try again.");
      }
    } catch (error) {
      console.error("Error making API call:", error);
      setError("Error making API call. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle key press events in the input field
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      makeApiCall();
    }
  };

  // Effect to make initial API call when component mounts
  useEffect(() => {
    if (inputCity.trim() !== "") {
      makeApiCall();
    }
  }, []);

  // Render the component
  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "40px" }}>
        {weatherData.city !== undefined &&
        weatherData.dailyDays[0] !== undefined ? (
          <>
            <TextField
              fullWidth
              variant="outlined"
              label="Enter a City..."
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              style={{ marginBottom: "20px" }}
            />
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
            <MainWeatherWindow
              data={weatherData.dailyDays[0]}
              city={weatherData.city}
              dailyDays={weatherData.dailyDays}
              hourlyDays={weatherData.hourlyDays}
            />
          </>
        ) : (
          <Typography variant="h5" align="center">
            {loading ? <CircularProgress /> : "Loading..."}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default App;