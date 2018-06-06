import {setupWeather} from "/js/weather.js";
import {setupSearch} from "/js/search.js";

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec"
];

// Update time
function setClock() {
  let time = $("#time");
  let date = $("#date");

  let curTime = new Date();
  let curHour = curTime.getHours();
  if (curHour == 0) 
    curHour = 12;
  
  curHour = ((curHour - 1) % 12 + 1 + "").padStart(2, "0");
  let curMin = (curTime.getMinutes() + "").padStart(2, "0");

  time.text(curHour + " " + curMin);
  date.text(months[curTime.getMonth()] + " " + curTime.getDate());
}

function setupClock() {
  setClock();
  setInterval(setClock, 5000);
}

// Force reload on back button
window.addEventListener("pageshow", function(event) {
  var historyTraversal = event.persisted || (typeof window.performance != "undefined" && window.performance.navigation.type === 2);
  if (historyTraversal) {
    window.location.reload();
  }
});

$(() => {
  setupClock();
  setupWeather();
  setupSearch();
});
