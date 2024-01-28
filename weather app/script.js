const apiKey = 'f8ccf3b04184d94908022f35d3d57acd';
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&q=';
const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDescription = document.querySelector(".weather-description");
const threeHourForecastContainer = document.querySelector(".three-hour-forecast");
const fourDayForecastContainer = document.querySelector(".four-day-forecast");

async function fetchWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        console.log(data);

        // Display main weather details
        displayMainWeatherDetails(data);

        // Display forecast details
        displayThreeHourForecast(data);
        displayFourDayForecast(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Handle the error, e.g., display a user-friendly message
    }
}

function displayMainWeatherDetails(data) {
    document.querySelector(".city").innerHTML = data.city.name;
    document.querySelector(".temp").innerHTML = Math.round(data.list[0].main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.list[0].main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.list[0].wind.speed + "km/h";
    weatherDescription.innerHTML = data.list[0].weather[0].description;

    setWeatherIcon(data.list[0].weather[0].main);
}

function displayThreeHourForecast(data) {
    threeHourForecastContainer.innerHTML = ""; // Clear previous forecast details

    for (let i = 1; i <= 3; i++) {
        const forecastDetails = data.list[i * 8];
        const forecastTime = new Date(forecastDetails.dt_txt);
        const forecastHour = forecastTime.getHours();

        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");

        forecastItem.innerHTML = `
            <p class="forecast-hour">${forecastHour}:00</p>
            <img src="${getForecastWeatherIcon(forecastDetails.weather[0].main)}" class="forecast-icon">
            <p class="forecast-temp">${Math.round(forecastDetails.main.temp)}°C</p>
        `;

        threeHourForecastContainer.appendChild(forecastItem);
    }
}

function displayFourDayForecast(data) {
    fourDayForecastContainer.innerHTML = ""; // Clear previous forecast details

    // Display forecast for the next four days
    const listLength = data.list.length;
    const intervals = 8 * 4; // Your desired interval
    for (let i = 1; i <= 4; i++) {
        const index = i * intervals - 1; // Adjust the index to stay within bounds
        const safeIndex = Math.min(index, listLength - 1); // Ensure the index is within bounds

        const forecastDetails = data.list[safeIndex];
        const forecastTime = new Date(forecastDetails.dt_txt);

        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");

        forecastItem.innerHTML = `
            <p class="forecast-date">${forecastTime.toDateString()}</p>
            <img src="${getForecastWeatherIcon(forecastDetails.weather[0].main)}" class="forecast-icon">
            <p class="forecast-temp">${Math.round(forecastDetails.main.temp)}°C</p>
        `;

        fourDayForecastContainer.appendChild(forecastItem);
    }
}

// Function to set weather icon based on weather conditions
function setWeatherIcon(mainWeather) {
    const iconPath = "./images/";
    switch (mainWeather) {
        case "Clouds":
            weatherIcon.src = iconPath + "clouds.png";
            break;
        case "Rain":
            weatherIcon.src = iconPath + "rain.png";
            break;
        case "Drizzle":
            weatherIcon.src = iconPath + "drizzle.png";
            break;
        case "Mist":
            weatherIcon.src = iconPath + "mist.png";
            break;
        case "Clear":
            weatherIcon.src = iconPath + "clear.png";
            break;
        case "Thunderstorm":
            weatherIcon.src = iconPath + "thunderstorm.png";
            break;
        default:
            weatherIcon.src = iconPath + "clouds.png";
            break;
    }
}

// Function to get forecast weather icon
function getForecastWeatherIcon(mainWeather) {
    const iconPath = "./images/";
    switch (mainWeather) {
        case "Clouds":
            return iconPath + "clouds.png";
        case "Rain":
            return iconPath + "rain.png";
        case "Drizzle":
            return iconPath + "drizzle.png";
        case "Mist":
            return iconPath + "mist.png";
        case "Clear":
            return iconPath + "clear.png";
        case "Thunderstorm":
            return iconPath + "thunderstorm.png";
        default:
            return iconPath + "clouds.png";
    }
}

// Event listener for search button click
searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location !== '') {
        fetchWeather(location);
    } else {
        // Display an error message or handle the case where the input is empty
        console.error('Please enter a valid location.');
    }
});
