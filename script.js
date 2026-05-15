const API_KEY = "34ea82bd4a701f5d2154233bebe798dc";

const cityInput = document.querySelector("#search-city");
const form = document.querySelector("form");
const weatherBox = document.querySelector("#fetched-data-box");
const searchedCityBox = document.querySelector("#searched-cities-box");

let searchHistory = JSON.parse(localStorage.getItem("cities")) || [];

function renderHistory() {
    searchedCityBox.innerHTML = "";
    searchHistory.forEach(city => {
        searchedCityBox.innerHTML += `<h4>${city}</h4>`;
    });
}

async function getWeatherInfo(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        weatherBox.innerHTML = `
            <div>City: ${data.name}, ${data.sys.country}</div>
            <div>Temperature: ${data.main.temp} °C</div>
            <div>Weather: ${data.weather[0].main}</div>
            <div>Humidity: ${data.main.humidity}%</div>
            <div>Wind Speed: ${data.wind.speed} m/s</div>
        `;
    } catch (error) {
        weatherBox.innerHTML = `<div>${error.message}</div>`;
    }
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = cityInput.value.trim();
    if (!city) return;

    getWeatherInfo(city);

    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        localStorage.setItem("cities", JSON.stringify(searchHistory));
        renderHistory();
    }

    cityInput.value = "";
});


renderHistory();