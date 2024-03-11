import React from "react";
import { Paper, Typography } from "@mui/material";

const WeatherBox = ({ date, icon, temp, weather_desc }) => {
  return (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
        textAlign: "center",
        borderRadius: "20px",
        width: "150px",
      }}
    >
      <img
        src={require(`./images/${icon}.svg`)}
        alt={weather_desc}
        style={{ width: "100px", height: "100px" }}
      />
      <Typography variant="h6">Date: {date}</Typography>
      <Typography variant="body1" className="temp">
        {`Temp: ${Math.round(temp - 273.15)}°C`}
      </Typography>
      <Typography variant="body2">{weather_desc.toLowerCase()}</Typography>
    </Paper>
  );
};

export default WeatherBox;
