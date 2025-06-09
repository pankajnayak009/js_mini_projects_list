// Get UI Components
const userTab = document.getElementById("yourWeatherBtn");
const searchTab = document.getElementById("searchWeatherBtn");
const userContainer = document.getElementById("yourWeatherSection");

//I am getting the UI cpmponents  for update yourweather UI
// const userInfoContainer = document.getElementById("yourWeatherInfo");
const userInfoContainer = document.getElementById("yourWeatherInfo");
const searchWeatherSection = document.getElementById("searchWeatherSection");

//grant acess container
const grantAcessContainer = document.querySelector(".grant_location_container");

// search-button-with_placeholder
const seachForm = document.querySelector(".search-button-with_placeholder");

// loader_container
const loadingScreen = document.querySelector(".loading_container");

const searchWeatherInfoSection = document.querySelector(".main_container_2");
// const searchBtn = document.getElementById("searchBtn");

const searchInput = document.getElementById("Search_weather");
const searchBtn = document.getElementById("searchBtn");

let currentTab = userTab;
const API_KEY = "57adacb464280a31d34dd8e1e3f9a6d4";

// currentTab.classList.add("current-tab");

//function for switching tabs

function switchTab(clickedTab) {
  if (clickedTab != currentTab) {
    // Switch tab style
    currentTab.classList.remove("current-tab");
    currentTab = clickedTab;
    currentTab.classList.add("current-tab");

    // Switch tab content
    if (currentTab === userTab) {
      userContainer.classList.add("active");
      searchWeatherSection.classList.remove("active");
      searchWeatherInfoSection.classList.remove("active");
    } else if (currentTab === searchTab) {
      userContainer.classList.remove("active");
      searchWeatherSection.classList.add("active");
      searchWeatherInfoSection.classList.remove("active");
      grantAcessContainer.classList.remove("active");
    }
  }
}

userTab.addEventListener("click", () => {
  switchTab(userTab);
  if (localStorage.getItem("locationAccess") === "true") {
    getlocation();
  } else {
    grantAcessContainer.classList.add("active");
  }
});
searchTab.addEventListener("click", () => {
  switchTab(searchTab);
});

const grantBtn = document.getElementById("grantAccessBtn");
// .addEventListener("click", getlocation);
grantBtn.addEventListener("click", () => {
  getlocation();
  grantAcessContainer.classList.remove("active");
});

// fetching dat with api for my current location data update with api

async function fetchWeatherByCoordinates(lat, lon) {
  try {
    // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    // console.log("weather data :-->", data);
    console.log("Weather data:", data);
    // Directly update UI → no console needed
    document.getElementById("cityName").innerText = data.name;
    document.getElementById(
      "yourWeather_icon"
    ).src = `https://flagcdn.com/48x36/${data.sys.country.toLowerCase()}.png`;

    document.getElementById("weatherDesc").innerText =
      data.weather[0].description;
    document.getElementById(
      "weatherIcon"
    ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("temperature").innerText = `${data.main.temp} °C`;
    document.getElementById("windSpeed").innerText = `${data.wind.speed} m/s`;
    document.getElementById("humidity").innerText = `${data.main.humidity} %`;
    document.getElementById("clouds").innerText = `${data.clouds.all} %`;
  } catch (error) {
    console.log("Error fetching weather data:", error);
  }
}

// fetching my current location data when i click on youweatherbutton an show with ui
function getlocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("No geoLocation Support");
  }
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log("Latitude:", lat);
  console.log("Longitude:", lon);
  // Save that user has granted location access
  localStorage.setItem("locationAccess", "true");

  fetchWeatherByCoordinates(lat, lon);
}

//Searching weather button for searching for data with help of city name

// when I click on the search button they show me
// they show me search button with placeholder
// when i enter city name in placeholder this city name passed into the api after thi clicking on search buton

// with the help of api we can update and show to weather search data on ui

searchBtn.addEventListener("click", () => {
  const cityname = searchInput.value.trim();

  if (cityname === "") {
    alert("please enter a city name");
    return;
  }

  // call api
  fetchWeatherByCity(cityname);
});

async function fetchWeatherByCity(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    if (data === "404") {
      alert("city not found");
    }

    //update ui
    document.getElementById("searchCityName").innerText = data.name;
    document.getElementById(
      "searchFlagIcon"
    ).src = `https://flagcdn.com/48x36/${data.sys.country.toLowerCase()}.png`;
    document.getElementById("searchWeatherDesc").innerText =
      data.weather[0].description;

    document.getElementById(
      "searchWeatherIcon"
    ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; 

    document.getElementById(
      "searchTemperature"
    ).innerText = `${data.main.temp} °C`;

    document.getElementById(
      "searchWindSpeed"
    ).innerText = `${data.wind.speed} m/s`;
    document.getElementById(
      "searchHumidity"
    ).innerText = `${data.main.humidity} %`;
    document.getElementById("searchClouds").innerText = `${data.clouds.all} %`;
    // Show result box
    searchWeatherInfoSection.classList.add("active");
  } catch (error) {
    console.log("Error fetching weather data:", error);
  }
}
