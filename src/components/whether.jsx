import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./weather.css";

function Weather() {
  const [inputloc, setInputLoc] = useState("");
  const [wData, setWData] = useState({});

  useEffect(() => {
    weatherData("lahore");
  }, []);

  const weatherData = async (cityname) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=6c1e8c26bd8293188c9d5f4cb3623395`
      );
      const data = await response.json();
      setWData(data);
      console.log(data);
      if (wData.cod === "404") {
        setWData(data.message);
        setWData(data);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleWeather = (e) => {
    e.preventDefault();
    weatherData(inputloc);
    setInputLoc("");
  };

  const myStyle = {
    height: "700px",
    width: "100%",
    backgroundRepeat: "no-repeat",
    textAlign: "center",
    position: "relative",
  };

  const videoContainerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    zIndex: -1,
  };

  const videoStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const formContainerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
  };

  const footer = {
    position: "fixed",
    bottom: 0,
    width: "100%",
    color: "black",
    textAlign: "center",
  };

  return (
    <div style={myStyle}>
      <div style={videoContainerStyle}>
        <video autoPlay loop muted style={videoStyle}>
          <source src="/bgvideo.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="detail" style={formContainerStyle}>
        <form onSubmit={handleWeather}>
          <TextField
            label="Enter Your City"
            color="secondary"
            fullWidth
            placeholder="City Name"
            sx={{ margin: "0 0 10px 0" }}
            onChange={(e) => setInputLoc(e.target.value)}
            value={inputloc}
          />

          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </form>

        <h3
          type="capitalize"
          style={{ color: "red", textTransform: "capitalize" }}
        >
          {wData.message}
        </h3>

        <div>
          <br />
          <h2>City: {wData?.name}</h2>
          <h2>Country: {wData?.sys?.country}</h2>
          {wData?.weather?.map((data, index) => {
            return (
              <div key={index}>
                <h2>Description: {data.description}</h2>{" "}
              </div>
            );
          })}
          <h2>Temperature: {(wData?.main?.temp - 273.15).toFixed(2)} °C</h2>
          <h2>Wind Speed: {wData?.wind?.speed} km/hr</h2>
        </div>
      </div>
      <div style={footer}>
        <p>
          ALL RIGHTS RESERVED 2023. <br />
          DESIGNED BY <strong>HUZAIFA QAISER.</strong>
        </p>
      </div>
    </div>
  );
}

export default Weather;
