let currentDate = new Date();

let h3 = document.querySelector("h3");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];

let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h3.innerHTML = `${day} ${hours}:${minutes}`;

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-3">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let apiKey = "748ed80fdo221bt48fa84019ab0b737f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  console.log(apiUrl);
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "748ed80fdo221bt48fa84019ab0b737f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.lat}&Lon=${coordinates.lon}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temp").innerHTML = `${Math.round(
    response.data.temperature.current
  )}°C`;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  getForecast(response.data.coordinates);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("Cape Town");
displayForecast();
