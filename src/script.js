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

function search(city) {
  let apiKey = "748ed80fdo221bt48fa84019ab0b737f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);

  console.log(response.data.condition.icon_url);
  document.querySelector;
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temp").innerHTML = `${Math.round(
    response.data.temperature.current
  )}°C`;

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
search("Cape Town");
