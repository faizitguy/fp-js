import { Task } from "./types";
import { compose } from "ramda";

const getOpenWeatherUrl = ({ cityName, API_KEY }) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

const fetchIt = (url) =>
  Task((rej, res) =>
    fetch(url)
      .then((x) => x.json())
      .then(res)
      .catch(rej)
  );

const OpenWeather = {
  fetch: compose(fetchIt, getOpenWeatherUrl),
};

export { OpenWeather };
