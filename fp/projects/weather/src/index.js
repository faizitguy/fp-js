import { API_KEY } from "./key";
import { OpenWeather } from "./open_weather";
import "./styles.css";

// create a weather module with the private functions
// render results on the screen

const getWeatherItems = (cityName) =>
  OpenWeather.fetch({ cityName, API_KEY })
    .map((response) => JSON.stringify(response.main.temp))
    .map((x) => weatherCard(x));

const weatherCard = (temp) => `<div><h1> ${temp}</h1></div> `;

// ============================= Every above this line will be pure

const app = () => {
  const button = document.getElementById("go");
  const input = document.getElementById("city");
  const result = document.getElementById("results");

  button.addEventListener("click", () => {
    const cityName = input.value.trim();
    getWeatherItems(cityName).fork(
      console.error,
      (html) => (results.innerHTML = html)
    );
  });
};

app();
