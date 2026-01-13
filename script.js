document.addEventListener("DOMContentLoaded", () => {
    const dogBtn = document.getElementById("generate-dog-button");
    const dogContainer = document.getElementById("dog-output");
    const weatherBtn = document.getElementById("get-weather-button");

    async function getDogImage() {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        dogContainer.innerHTML = ""; // Clear previous content
        const img = document.createElement("img");
        img.src = data.message;
        img.alt = "Random Dog";
        dogContainer.appendChild(img);
    }

    dogBtn.addEventListener("click", getDogImage);

    async function getWeather() {
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=36.3126&longitude=-95.6161&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min&current=temperature_2m,relative_humidity_2m,precipitation,apparent_temperature,wind_speed_10m&timezone=America%2FChicago&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch");
        const data = await response.json();
        const weatherContainer = document.getElementById("weather-output");
        console.log(data);
        weatherContainer.innerHTML = `
            <div class="city-block">
                <h1>Claremore, OK:</h1>
                <div class="current-row">
                    <h2>Today's Weather:</h2>
                    <p>Current Temperature: ${data.current.temperature_2m} °F</p>
                    <p>Apparent Temperature: ${data.current.apparent_temperature} °F</p>
                    <p>Humidity: ${data.current.relative_humidity_2m} %</p>
                    <p>Precipitation: ${data.current.precipitation} inch</p>
                    <p>Wind Speed: ${data.current.wind_speed_10m} mph</p>
                </div>

                <table class="weather-table">
                    <thead>
                        <tr>
                            <th colspan="5" class="forecast-title">Daily Forecast</th>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <th>Max Temp (°F)</th>
                            <th>Min Temp (°F)</th>
                            <th>Sunrise</th>
                            <th>Sunset</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> ${data.daily.time[0]}</td>
                            <td>Max Temperature Today: ${data.daily.temperature_2m_max[0]} °F</td>
                            <td>Mqin Temperature Today: ${data.daily.temperature_2m_min[0]} °F</td>
                            <td>Sunrise: ${data.daily.sunrise[0]}</td>
                            <td>Sunset: ${data.daily.sunset[0]}</td>
                        </tr>
                        <tr>
                            <td> ${data.daily.time[1]}</td>
                            <td>Max Temperature Tomorrow: ${data.daily.temperature_2m_max[1]} °F</td>
                            <td>Min Temperature Tomorrow: ${data.daily.temperature_2m_min[1]} °F</td>
                            <td>Sunrise: ${data.daily.sunrise[1]}</td>
                            <td>Sunset: ${data.daily.sunset[1]}</td>
                        </tr>
                        <tr>
                            <td> ${data.daily.time[2]}</td>
                            <td>Max Temperature Day After Tomorrow: ${data.daily.temperature_2m_max[2]} °F</td>
                            <td>Min Temperature Day After Tomorrow: ${data.daily.temperature_2m_min[2]} °F</td>
                            <td>Sunrise: ${data.daily.sunrise[2]}</td>
                            <td>Sunset: ${data.daily.sunset[2]}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }

    weatherBtn.addEventListener("click", getWeather);

});
