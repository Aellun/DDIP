const apiKey = '1c593361cc2a4489016019b5a99a25f5';
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&q=';
const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDescription = document.querySelector(".weather-description");
const mainDetails = document.querySelector(".main-details");
const forecastContainer = document.querySelector(".forecast-container");

async function fetchWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);

    // Display main weather details
    displayMainWeatherDetails(data);

    // Display forecast details
    displayForecastDetails(data);
}

function displayMainWeatherDetails(data) {
    document.querySelector(".city").innerHTML = data.city.name;
    document.querySelector(".temp").innerHTML = Math.round(data.list[0].main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.list[0].main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.list[0].wind.speed + "km/h";
    weatherDescription.innerHTML = data.list[0].weather[0].description;

    setWeatherIcon(data.list[0].weather[0].main);
}

function displayForecastDetails(data) {
    forecastContainer.innerHTML = ""; // Clear previous forecast details

    for (let i = 1; i <= 3; i++) {
        const forecastDetails = data.list[i];
        const forecastTime = new Date(forecastDetails.dt_txt);
        const forecastHour = forecastTime.getHours();

        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");

        forecastItem.innerHTML = `
            <p class="forecast-hour">${forecastHour}:00</p>
            <img src="${getForecastWeatherIcon(forecastDetails.weather[0].main)}" class="forecast-icon">
            <p class="forecast-temp">${Math.round(forecastDetails.main.temp)}°C</p>
        `;

        forecastContainer.appendChild(forecastItem);
    }
}

function setWeatherIcon(mainWeather) {
    if (mainWeather == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (mainWeather == "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (mainWeather == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (mainWeather == "Mist") {
        weatherIcon.src = "images/mist.png";
    } else if (mainWeather == "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (mainWeather == "Thunderstorm") {
        weatherIcon.src = "images/thunderstorm.png";
    }
}

function getForecastWeatherIcon(mainWeather) {
    switch (mainWeather) {
        case "Clouds":
            return "images/clouds.png";
        case "Rain":
            return "images/rain.png";
        case "Drizzle":
            return "images/drizzle.png";
        case "Mist":
            return "images/mist.png";
        case "Clear":
            return "images/clear.png";
        case "Thunderstorm":
            return "images/thunderstorm.png";
        default:
            return "images/clouds.png";
    }
}

searchButton.addEventListener('click', () => {
    fetchWeather(locationInput.value);
});
