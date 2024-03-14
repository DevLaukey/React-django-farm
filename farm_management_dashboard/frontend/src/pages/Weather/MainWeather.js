import React from "react";
import "./MainWeatherWindow.css";
import WeatherBox from "./WeatherBox";

const MainWeatherWindow = (props) => {
  // Title component
  const Title = props.city ? null : <h1 className="title">Weather Forecast</h1>;

  console.log("MainWeatherWindow.jsx: props: ", props);
  return (
    <div className="main">
      <div className="inner-main">
        <div className="card">
          {Title}
          <img
            src={
              props.data
                ? require(`./images/${props.data.icon}.png`)
                : require("./images/01d.png")
            }
            alt="sun"
            style={{
              visibility: props.city ? "visible" : "hidden",
              opacity: props.city ? "1" : "0",
            }}
          />

          <div
            className="today"
            style={{
              visibility: props.city ? "visible" : "hidden",
              opacity: props.city ? "1" : "0",
            }}
          >
            <span>Today</span>
            <h1>{props.city}</h1>
            <p>
              Temperature:
              {props.data ? Math.round(props.data.temp - 273.15) : 0}
              °C
            </p>
            <p>{props.data ? props.data.weather_desc.toLowerCase() : ""}</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "20px",
          }}
        >
          <div>
            <h2
              style={{
                textAlign: "center",
              }}
            >
              Hourly
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                visibility: props.city ? "visible" : "hidden",
              }}
            >
              {props.hourlyDays &&
                props.hourlyDays?.map((days, index) => {
                  return (
                    <WeatherBox
                      key={index}
                      title="Hourly"
                      icon={days.icon}
                      date={days.date}
                      temp={days.temp}
                      weather_desc={days.weather_desc}
                    />
                  );
                })}
            </div>
          </div>

          <div>
            <h2
              style={{
                textAlign: "center",
              }}
            >
              Daily
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                visibility: props.city ? "visible" : "hidden",
              }}
            >
              {props.dailyDays &&
                props.dailyDays?.map((days, index) => {
                  return (
                    <WeatherBox
                      className="daily-box"
                      key={index}
                      icon={days.icon}
                      date={days.date}
                      temp={days.temp}
                      weather_desc={days.weather_desc}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainWeatherWindow;
