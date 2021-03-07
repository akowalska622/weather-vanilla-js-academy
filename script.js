const app = document.getElementById("app");
apiKey = "5b162d66a98e4562adb129d87cd0555b";
let latitude;
let longitude;

const getDate = () => {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let date = `Today is ${new Date().toLocaleDateString("en-us", options)}`;

  return date;
};

const getWeather = async () => {
  let res = await fetch("https://ipapi.co/json");
  let ip = await res.json();
  latitude = ip.latitude;
  longitude = ip.longitude;
  let url = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&lat=${latitude}&lon=${longitude}`;

  let resWeather = await fetch(url);
  let weatherData = await resWeather.json();
  let weather = weatherData.data[0];

  let html = `
  <h1>${weather.city_name}, ${ip.country_name}</h1>
  <h3>${getDate()}</h3>
  <p id="temperature">${weather.temp}\u00B0c</p>
  <span id="feels">Feels like: ${weather.app_temp}\u00B0c</span>
  <div class="more-info">
    <img src=${`https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`}/>
    <div class="info">
      <p class="info-desc">Clouds</p>
      <p>${weather.clouds}%</p>
    </div>
    
    <div class="info">
      <p class="info-desc">Wind</p>
      <p>${Math.floor(weather.wind_spd)} m/s</p>
    </div>
    
    <div class="info">
      <p class="info-desc">Humidity</p>
      <p>${Math.floor(weather.rh)}%</p>
    </div>
    
  </div>


  `;
  app.innerHTML = html;
};

getWeather();
