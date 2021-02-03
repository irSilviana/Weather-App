// Displaying Search result
function showWeather(response) {
    let temp = Math.round(response.data.main.temp);
    let city = response.data.name;
    let country = response.data.sys.country;
    let description = response.data.weather[0].description;
    let cloud = Math.round(response.data.clouds.all);
    let wind = Math.round(response.data.wind.speed);
    let humidity = Math.round(response.data.main.humidity);

    let h1 = document.querySelector("h1");
    let tempElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let cloudElement = document.querySelector("#cloud");
    let windElement = document.querySelector("#wind");
    let humidityElement = document.querySelector("#humidity");

    h1.innerHTML = `${city}, ${country}`;
    tempElement.innerHTML = `${temp}`;
    descriptionElement.innerHTML = `${description}`;
    cloudElement.innerHTML = `${cloud}`;
    windElement.innerHTML = `${wind}`;
    humidityElement.innerHTML = `${humidity}`;
}
 
//temperature based on Geo Location
function getWeatherLocation(position) { 
  let unit = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "125089b53f00feddd6fbd602dc6cec7a";
  let targetUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${targetUrl}lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  
  axios.get(apiUrl).then(showWeather);
}

function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getWeatherLocation);
}

let myLocation = document.querySelector("#my-location");
myLocation.addEventListener("click", showCurrentLocation);

//temperature based on searched city
function getCityWeather(searchedCity) {
  let city = searchedCity;
  let unit = "metric";
  let apiKey = "125089b53f00feddd6fbd602dc6cec7a";
  let targetUrl = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${targetUrl}q=${city}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

function searchingCity(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#enter-city").value.trim();
  
  if (searchedCity.length > 0) {
      getCityWeather(searchedCity);     
  } else {
    showCurrentLocation();
  }
}

//Search based on city button/form
let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", searchingCity);

//default behavior on load
getCityWeather("Jakarta");

//Datetime
function currentTime() {
  let now = new Date();

  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let hour = now.getHours();
  let amPm = document.querySelector("#am-pm");
  if (hour < 12) {
    amPm.innerHTML = `AM`;
  } else {
    amPm.innerHTML = `PM`;
  }
  convertHour();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let date = now.getDate();
  if (date < 10) {
    date = `0${date}`;
  }

  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  let currentClock = document.querySelector("#clock");
  currentClock.innerHTML = `${hour}:${minute}`;

  let currentDay = document.querySelector("#day");
  currentDay.innerHTML = `${day}`;

  let currentDate = document.querySelector("#date");
  currentDate.innerHTML = `${date}/${month}/${year}`;

  function convertHour() {
    if (hour <= 9) {
      hour = `0${hour}`;
    } else if (hour > 9 && hour <= 12) {
      return hour;
    } else {
      hour = hour - 12;
      hour = `0${hour}`;
    }
  }
}
//automatically showing current local time
currentTime();