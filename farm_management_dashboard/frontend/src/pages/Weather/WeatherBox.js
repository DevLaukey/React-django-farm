import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

const WeatherBoxes = ({ days }) => {
  return (
    <Grid container spacing={2}>
      {days?.slice(1).map((day, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Paper elevation={3} className="weather-box">
            <img
              src={require(`./images/${day.icon}.svg`).default}
              alt={day.weather_desc}
              style={{ width: "100px", height: "100px" }}
            />
            <Typography variant="h6">{day.date}</Typography>
            <Typography variant="body1" className="temp">
              {`${Math.round(day.temp - 273.15)}°C`}
            </Typography>
            <Typography variant="body2">
              {day.weather_desc.toLowerCase()}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default WeatherBoxes;
