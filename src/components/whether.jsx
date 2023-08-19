import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

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
          <source
            src="https://player.vimeo.com/external/368748183.sd.mp4?s=dfa0c269d289bc12aa9f7d978efe9e07c0f2431a&profile_id=164&oauth3_token_id=57447761"
            type="video/mp4"
          />
        </video>
      </div>

      <div style={formContainerStyle}>
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

        <div>
          <br />
          <h3>City: {wData?.name}</h3>
          <h3>Country: {wData?.sys?.country}</h3>
          {wData?.weather?.map((data, index) => {
            return (
              <div key={index}>
                <h3>Description: {data.description}</h3>{" "}
              </div>
            );
          })}
          <h3>Temperature: {(wData?.main?.temp - 273.15).toFixed(2)} °C</h3>
          <h3>Wind Speed: {wData?.wind?.speed} km/hr</h3>
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
