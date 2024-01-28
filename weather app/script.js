const apiKey = '1c593361cc2a4489016019b5a99a25f5';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDescription = document.querySelector(".weather-description");

async function fetchWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    weatherDescription.innerHTML = data.weather[0].description;

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Thunderstorm") {
        weatherIcon.src = "images/thunderstorm.png";
    }
}

searchButton.addEventListener('click', () => {
    fetchWeather(locationInput.value);
});
