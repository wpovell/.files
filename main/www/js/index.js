// Weather refresh in seconds
const WEATHER_REFRESH = 60 * 20;
const WEATHER_LOCATION = 'MD/Baltimore';

// Fetches & caches weather data
function getWeather(callback) {
  let modifiedCallback = (data) => {
      let jsonData = {
          'location': WEATHER_LOCATION,
          'time': new Date(),
          'weather': data
      }
      localStorage.setItem('weather', JSON.stringify(jsonData));
      callback(jsonData);
  };

  let data = JSON.parse(window.localStorage.getItem('weather'));

    if (data == null || WEATHER_LOCATION != data['location'] ||
        ((new Date) - new Date(data['time'])) / 1000 > WEATHER_REFRESH) {
    console.log("Fetching weather");
    data = $.ajax(`https://api.wunderground.com/api/${WEATHER_API}/forecast10day/q/${WEATHER_LOCATION}.json`, {
      dataType: 'jsonp'
    }).then(modifiedCallback);
  } else {
    callback(data);
  }
}

// Adds weather data to DOM
function setWeather() {
  // Days of the week
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  getWeather((data) => {
    let weather = data['weather'];
    for (let day of weather.forecast.simpleforecast.forecastday.slice(0, 5)) {
      let date = new Date(parseInt(day.date.epoch) * 1000);
      let dayOfWeek = days[date.getDay()];
      let icon = '';
      if (day.icon.match(/snow/)) {
        icon = '';
      } else if (day.icon.match(/cloudy/)) {
        icon = '';
      } else if (day.icon.match(/rain/)) {
        icon = '';
      } else if (day.icon == 'clear') {
        icon = '';
      }
      $('#weather').append(`
        <li>
          <div class="bold">${dayOfWeek}</div>
          <div>${icon} ${day.conditions}</div>
          <div>
            <span class="bold">${day.high.fahrenheit}°</span>
            <span>${day.low.fahrenheit}°</span>
          <div>
        </li>
      `);
    }
  });
}

// Fetches top hackernews stories and adds to DOM
// TODO: Cache?
function setHN(callback) {
  $.ajax('https://hacker-news.firebaseio.com/v0/topstories.json', {
    dataType: "jsonp",
  }).then((data) => {
    let rank = 1;
    for (let id of data.slice(0, 10)) {
      $("#hn").append(`<li id="${id}">${rank}. </li>`);
      $.ajax(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
        dataType: 'jsonp',
      }).then((data) => {
        $(`#${id}`).append(`
          <a href="${data.url}">${data.title}</a>
          <br/>
          <a class="comment" href="https://news.ycombinator.com/item?id=${id}">comments</a>
          <br/>
          <br/>`);
      });
      rank++;
    }
  });
}

// Force reload on back button
window.addEventListener("pageshow", function(event) {
  var historyTraversal = event.persisted || (typeof window.performance != "undefined" && window.performance.navigation.type === 2);
  if (historyTraversal) {
    window.location.reload();
  }
});

// Capture paste
document.addEventListener("paste", (e) => {
  const curQuery = $('#search').text();
  const newQuery = curQuery + e.clipboardData.getData('text/plain');
  $('#search').text(newQuery);
  if (newQuery)
    setSearch(true);
}, false);


// Update time
function setClock() {
  let time = $('#time');
  let date = $('#date');
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  let curTime = new Date();
  let curHour = curTime.getHours();
  if (curHour == 0)
    curHour = 12;

  curHour = (((curHour - 1) % 12) + 1 + "").padStart(2, "0");
  let curMin = (curTime.getMinutes() + "").padStart(2, "0");

  time.text(curHour + " " + curMin);
  date.text(months[curTime.getMonth()] + " " + curTime.getDate());
}
setInterval(setClock, 5000)

// Set search visibility
function setSearch(showSearch) {
  if (showSearch) {
    $('#searchWrapper').show();
    $('#timeWrapper').hide();
  } else {
    $('#searchWrapper').hide();
    $('#timeWrapper').show();
  }
}

// Perform action on enter
function enter() {
  let query = $('#search').text();
  // Go directly if url
  if (query.match(/[^\.\s]*\.?[^\.\s]\.[^\.\s]/i)) {
    return 'https://' + query;
  }

  let response = urls[query.split(':')[0]];
  if (response) {
    // Go directly to site
    if (typeof response.query == 'string') {
      return 'http://' + response.query;
    } else {
      return 'http://' + response.query(query.split(':')[1]);
    }
  }

  // No matches, google it
  return 'https://www.google.com/search?q=' + encodeURIComponent(query);
}

let lastQuery = '';
let lastSuggest = '';
document.onkeypress = (e) => {
  let search = $('#search');
  let searchQuery = search.text();

  // Don't do anything for tab if there isn't a query
  if ((e.key == 'Tab' || e.key == ' ') && !searchQuery)
    return;

  // Allow some control keys
  if (['l', 'r', 'C', 'v'].includes(e.key) && e.ctrlKey) {
    return;
  }

  // For everything else, prevent the default
  e.preventDefault();
  e.stopPropagation();


  if (e.key == 'Escape') {
    search.text('');
    lastQuery = '';
  } else if (e.key == 'Backspace') {
    search.text(searchQuery.slice(0, -1));
    searchQuery = search.text();
  } else if (e.key == 'Enter') {
    let url = enter();

    // Open in new tab
    if (e.altKey) {
      window.open(url);
    } else {
      document.location.href = url;
    }
  } else if (e.key == 'Tab') {
    let searchSuggest = $('#suggest').children().first().children();
    let index = -1;
    for (let i = 0; i < searchSuggest.length; i++) {
      if (searchSuggest[i].classList.contains('active')) {
        // Get index of new suggestion to have selected
        index = (searchSuggest.length + i + (e.keyShiftKey ? -1 : 1)) % searchSuggest.length;
      }
    }
    if (index == -1) {
      index = 0;
    }

    let start = search.text().split(':')[0];
    searchSuggest.removeClass('active');
    searchSuggest.css('color', '');
    let active = searchSuggest.eq(index);
    active.css('color', urls[start].color);
    active.addClass('active');
    search.text(start + ':' + active.text());
  } else if (e.key == 'c' && e.ctrlKey) {
    search.text('');
  } else if (!e.ctrlKey && (e.charCode != 0 || e.key == ' ')) {
    search.text(searchQuery + e.key);
    searchQuery = search.text();
  }

  // Set query color
  let start = search.text().split(':')[0]
  let color = '';
  let c;
  if (urls[start]) {
    color = urls[start].color;
  } else if ((c = /#[0-9a-f]{6}$/i.exec(searchQuery)) ||
    (c = /#[0-9a-f]{3}$/i.exec(searchQuery))) {
    let color = c;
  }
  search.css('color', color);

  // Show hackernews
  if (start == 'h') {
    $('#hn').show();
  } else {
    $('#hn').hide();
  }

  // Add suggests
  if (start != lastSuggest && urls[start] && urls[start].suggest) {
    lastSuggest = start;
    let suggest = urls[start].suggest;
    $('#suggest').html('<ul>' +
      suggest.map((x) => {
        return '<li>' + x + '</li>';
      }).join('') +
      '</ul>');
  } else if (searchQuery == '') {
    $('#suggest').html('');
  }

  setSearch(searchQuery.replace(/\s+/, '') != '');
};

$(() => {
  setSearch(false);
  setClock();
  setHN();
  setWeather();
});
