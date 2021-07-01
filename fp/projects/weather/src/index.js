import { API_KEY } from "./key";
import { Task } from "./types";
import { compose } from "ramda";

// const mkUrl = (city) =>
//   `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

// /** functional fetch */
// const fpetch = (url) => Task((rej, res) => fetch(url).then(res).catch(rej));

// const getJson = (response) =>
//   Task((_rej, res) => response.json().then((data) => res(data)));

// const getData = (url) => fpetch(url).chain(getJson);

// // TODO render cloud coverage
// // TODO render wind speed and direction
// // TODO render sunrise/sunset
// // TODO render temp in K
// // TODO render temp in C

// const app = compose(getData, mkUrl);

// // ALL ABOVE THIS LINE SHALL REMAIN PURE ==================

// (function run() {
//   // TODO make city dynamic
//   app("London, uk").fork(console.error, console.log);
// })();

const getOpenWeatherUrl = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

const fetchIt = (url) => Task((rej, res) => fetch(url).then(res).catch(rej));

const OpenWeather = {
  fetch: compose(fetchIt, getOpenWeatherUrl),
};

// ============================= Every above this line will be pure

const app = () => {
  const button = document.getElementById("go");
  const input = document.getElementById("city");
  const result = document.getElementById("results");

  button.addEventListener("click", () => {
    const cityName = input.value.trim();
    OpenWeather.fetch(cityName).fork(console.error, console.log);
  });
};

app();
