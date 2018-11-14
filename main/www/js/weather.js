import {WEATHER_API} from '/js/api.js';

// Weather refresh in seconds
const WEATHER_REFRESH = 60 * 20;
const WEATHER_DEFAULT = ['/q/RI/Providence', 'Providence, RI'];

// Days of the week
const days = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
];

// Use GeoIP to get location for weather.
// TODO: Stop using default and just have callback
function getLocation() {
  let cached = JSON.parse(window.localStorage.getItem('location'));
  if (cached == null || ((new Date) - new Date(cached['time'])) / 1000 > WEATHER_REFRESH) {
    console.log("Fetching location");
    $.ajax(`https://api.wunderground.com/api/${WEATHER_API}/geolookup/q/autoip.json`, {dataType: 'jsonp'}).then((data) => {
      data = data.location;
      console.log(data);
      let newCached = {
        name: data.city,
        state: data.state,
        time: new Date(),
        code: data.l
      };
      window.localStorage.setItem('location', JSON.stringify(newCached));
    });
    return WEATHER_DEFAULT;
  } else {
    return [cached.code, `${cached.name}, ${cached.state}`];
  }
}

// Fetches & caches weather data
function getWeather(callback) {
  let location = getLocation();

  let modifiedCallback = (data) => {
    console.log(data);
    let jsonData = {
      'location': location[1],
      'time': new Date(),
      'weather': data
    }
    localStorage.setItem('weather', JSON.stringify(jsonData));
    callback(jsonData);
  };

  let data = JSON.parse(window.localStorage.getItem('weather'));

  if (data == null || location[1] != data['location'] || ((new Date) - new Date(data['time'])) / 1000 > WEATHER_REFRESH) {
    console.log("Fetching weather");
    console.log(location);
    data = $.ajax(`https://api.wunderground.com/api/${WEATHER_API}/forecast10day${location[0]}.json`, {dataType: 'jsonp'}).then(modifiedCallback);
  } else {
    callback(data);
  }
}

// Adds weather data to DOM
export function setupWeather() {
  getWeather((data) => {
    let weather = data.weather;
    for (let day of weather.forecast.simpleforecast.forecastday.slice(0, 5)) {
      day.conditions = day.conditions.replace('Chance of a Thunderstorm', 'Thunderstorm Chance');
      let date = new Date(parseInt(day.date.epoch) * 1000);
      let dayOfWeek = days[date.getDay()];
      let icon = '';
      if (day.icon.match(/snow/) || day.icon.match(/sleet/)) {
        icon = '';
      } else if (day.icon.match(/cloudy/) || day.icon.match(/fog/)) {
        icon = '';
      } else if (day.icon.match(/rain/)) {
        icon = '';
      } else if (day.icon == 'clear') {
        icon = '';
      } else if (day.icon.match(/storms/)) {
        icon = ''
      }
      $('#weatherWrapper').append(`
        <div class="day">
          <div class="bold">${dayOfWeek}</div>
          <div>
            <span>${icon}</span>
            <span class="bold">${day.high.fahrenheit}°</span>
            <span>${day.low.fahrenheit}°</span>
          </div>
          <div>${day.conditions}</div>
        </div>
      `);
    }
    $('#weatherWrapper').append(`<p id="location">${data.location}</p>`);
  });
}
