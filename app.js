const apiKey = "";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;

const searchContainer = document.querySelector('.search');
const userInput = document.querySelector('input');

function search(){
    if(userInput.value !== ""){
        checkWeather(userInput.value)

        userInput.value = "";
        searchContainer.style.animation = "";
    }
    else{
        searchContainer.style.animation = "shake .13s 3";

        searchContainer.addEventListener('animationend', () => {
            searchContainer.style.animation = "";
            userInput.focus();
        }, {once: true});
    }
}


async function checkWeather(city){
    if (navigator.onLine) {
        document.querySelector('.city').textContent = "searching...";
    } else {
        document.querySelector('.city').textContent = "Error: Offline";
    }

    const response = await fetch(apiUrl + `&q=${city}&appid=${apiKey}`);
    var data = await response.json();

    document.querySelector('.city').textContent = data.name;
    document.querySelector('.temp').textContent = data.main.temp + "°c";
    document.querySelector('.wind').textContent = data.wind.speed + " km/h";
    document.querySelector('.humidity').textContent = data.main.humidity + "%";

    const weatherImg = document.querySelector('.weather-img');

    if(data.weather[0].main == "Clouds"){
        weatherImg.src = "img/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherImg.src = "img/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherImg.src = "img/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherImg.src = "img/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherImg.src = "img/mist.png";
    }
    else if(data.weather[0].main == "Snow"){
        weatherImg.src = "img/snow.png";
    }
}
