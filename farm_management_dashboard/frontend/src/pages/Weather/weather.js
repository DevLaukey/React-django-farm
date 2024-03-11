// App.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  CircularProgress,
  TextField,
} from "@mui/material";
import MainWeatherWindow from "./MainWeather";

const App = () => {
  const [weatherData, setWeatherData] = useState({
    city: undefined,
    dailyDays: [],
    hourlyDays: [],
  });

  const [inputCity, setInputCity] = useState("London");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateState = (dailyData, hourlyData) => {
    const city = dailyData.city.name;
    const dailyDays = [];
    const hourlyDays = [];

    const timestampToDateTime = (timestamp) => {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString("en-US", {
        day: "numeric",
        month: "numeric",
      });
    };

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

    setWeatherData({
      city: city,
      dailyDays: dailyDays,
      hourlyDays: hourlyDays,
    });
  };

  const makeApiCall = async () => {
    try {
      setLoading(true);
      setError(null);

      const dailyResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${inputCity}&cnt=16&appid=6557810176c36fac5f0db536711a6c52`
      );
      const dailyData = await dailyResponse.json();

      const hourlyResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${inputCity}&cnt=8&appid=6557810176c36fac5f0db536711a6c52`
      );
      const hourlyData = await hourlyResponse.json();

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      makeApiCall();
    }
  };

  useEffect(() => {
    if (inputCity.trim() !== "") {
      makeApiCall();
    }
  }, []);

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