document.addEventListener("DOMContentLoaded", () => {
    const dogBtn = document.getElementById("generate-dog-button");
    const dogContainer = document.getElementById("dog-output");
    const weatherBtn = document.getElementById("get-weather-button");
    const weatherContainer = document.getElementById("weather-output");
    const catBtn = document.getElementById("generate-cat-button");
    const catContainer = document.getElementById("cat-output");
    const currencyBtn = document.getElementById('currency-exchange-button')
    const currencyContainer = document.getElementById("currency-output")
    const githubBtn = document.getElementById("github-user-button");
    const githubContainer = document.getElementById("github-user-output");
    const moviesBtn = document.getElementById("movies-button");
    const moviesContainer = document.getElementById("movies-output");
    const jokeBtn = document.getElementById("joke-button");
    const jokeContainer = document.getElementById("joke-output");

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

    async function getCatImage() {
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        const data = await response.json();
        catContainer.innerHTML = ""; //Clear previous content
        const img=document.createElement("img");
        img.src = data[0].url;
        img.alt = "Random Cat";
        catContainer.appendChild(img);

    }

    catBtn.addEventListener("click", getCatImage);

    async function getExchangeRate() {
        const response = await fetch("https://v6.exchangerate-api.com/v6/a5e4514e7b6ae5a71eacb3eb/latest/USD");
        const data = await response.json();
        const startingAmount = document.getElementById("currency-amount").value;
        const rate = document.getElementById("currency-to").value.toUpperCase();
        if (!data.conversion_rates[rate]) {
            currencyContainer.innerHTML = `
                <div class="error">
                    <p>Invalid currency code. Please try again.</p>
                </div>
            `;
        } else if (!startingAmount || startingAmount <= 0) {
            currencyContainer.innerHTML = `
                <div class="error">
                    <p>Please enter a valid amount greater than zero.</p>
                </div>
            `;
        } else {
            currencyContainer.innerHTML = `
                <div class="result">
                    <p> ${startingAmount} USD is equal to ${Math.ceil(data.conversion_rates[rate] * startingAmount * 100) / 100} ${rate}. The exchange rate is ${data.conversion_rates[rate]}</p>
                </div>
            `;}
    }

    currencyBtn.addEventListener("click", getExchangeRate);

    async function getGitHubUser() {
        const username = document.getElementById("username").value.toUpperCase();
        const response = await fetch(`https://api.github.com/users/${username}`);
        githubContainer.innerHTML = "" //Clear previous content
        if (response.status === 404) {
            githubContainer.innerHTML = `
                <div class="error">
                    <p>User not found. Please try another username.</p>
                </div>
            `;
        } else {
            const data = await response.json();
            githubContainer.innerHTML = `
                <img src="${data.avatar_url}" width="100" />
                <h2>${data.name || data.login}</h2>
                <p>${data.bio || 'No bio available'}</p>
                <p>Followers: ${data.followers} | Repos: ${data.public_repos}</p>
                <a href="${data.html_url}" target="_blank">View Profile</a>
                `;}
        }
    githubBtn.addEventListener("click", getGitHubUser);

    async function getMovies() {
        const response = await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=4e4a17c21d8a536b1321ef13de555f40");
        const data = await response.json();
        moviesContainer.innerHTML = `
            <h1>Top 5 Movies This Weeek</h1>
            <ul>
                <li>${data.results[0].title}</li>
                <li>${data.results[1].title}</li>
                <li>${data.results[2].title}</li>
                <li>${data.results[3].title}</li>
                <li>${data.results[4].title}</li>
            </ul>    
        `}

    moviesBtn.addEventListener("click", getMovies);

    async function getJoke() {
        const response = await fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single");
        const data = await response.json();
        jokeContainer.innerHTML = ""; //Clear previous content
        jokeContainer.innerHTML = `
        <div>
            <h1>Here's your joke!</h1>
            <p>${data.joke}<p>
    `}

    jokeBtn.addEventListener("click", getJoke);

});
