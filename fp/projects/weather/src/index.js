import { API_KEY } from "./key";
import { OpenWeather } from "./open_weather";

// create a weather module with the private functions
// render results on the screen

// ============================= Every above this line will be pure

const app = () => {
  const button = document.getElementById("go");
  const input = document.getElementById("city");
  const result = document.getElementById("results");

  button.addEventListener("click", () => {
    const cityName = input.value.trim();
    OpenWeather.fetch({ cityName, API_KEY }).fork(console.error, console.log);
  });
};

app();
