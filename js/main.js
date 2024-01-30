const searchInput = document.querySelector(".search-input input");
const searchInputBtn = document.querySelector(".search-input img");
const mainWeather = document.querySelector(".main-weather");
const weatherTemps = document.querySelector(".weather-temps");

const baseURL = {
  key: "8b9fe96be4f62d3df24c564cf5b69013",
  url: "https://api.openweathermap.org/data/2.5/weather",
  units: "metric",
};

const showLoadingMessage = () => {
  mainWeather.querySelector(".degree span").textContent = "Loading";
  mainWeather.querySelector(".city-data span").textContent = "";
  mainWeather.querySelector(".city-data p").textContent = "";
  weatherTemps.querySelector(".temp-max .temp p").textContent = "";
  weatherTemps.querySelector(".temp-min .temp p").textContent = "";
  weatherTemps.querySelector(".humadity .temp p").textContent = "";
  weatherTemps.querySelector(".cloudy .temp p").textContent = "";
  weatherTemps.querySelector(".wind .temp p").textContent = "";
};

const handleSearch = (city) => {
  showLoadingMessage();

  fetch(`${baseURL.url}?q=${city}&units=${baseURL.units}&appid=${baseURL.key}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString();

      mainWeather.querySelector(".degree span").textContent = `${Math.ceil(
        data.main.temp
      )} °`;

      mainWeather.querySelector(".city-data span").textContent = data.name;
      mainWeather.querySelector(".city-data p").textContent = formattedTime;
      weatherTemps.querySelector(".temp-max .temp p").textContent = Math.ceil(
        data.main.temp_max
      );
      weatherTemps.querySelector(".temp-min .temp p").textContent = Math.ceil(
        data.main.temp_min
      );
      weatherTemps.querySelector(".humadity .temp p").textContent = Math.ceil(
        data.main.humidity
      );
      weatherTemps.querySelector(".cloudy .temp p").textContent =
        data.clouds.all;
      weatherTemps.querySelector(".wind .temp p").textContent = data.wind.deg;
    })
    .catch((error) => {
      // Handle city not found
      console.error(error);
      alert("This city is not found");
    });
};

// Initial fetch for Tashkent when the page loads
document.addEventListener("DOMContentLoaded", () => {
  showLoadingMessage();
  handleSearch("Tashkent");
});

searchInputBtn.addEventListener("click", () => {
  const inputVal = searchInput.value.trim();
  if (inputVal !== "") {
    handleSearch(inputVal);
  }
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const inputVal = searchInput.value.trim();
    if (inputVal !== "") {
      handleSearch(inputVal);
      e.preventDefault();
    }
  }
});
