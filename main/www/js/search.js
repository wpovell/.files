import {urls} from '/js/data.js';

const SUGG_URL = 'https://www.google.com/complete/search';

const $suggestions = $('#suggestions');
const $search = $('#search');
const $bar = $('#bar');
const $timeWrapper = $('#timeWrapper');
const $autocomplete = $('#autocomplete');

function getSuggestions(query, callback) {
  // Clear correction
  $autocomplete.val('');

  let suggestions = [];

  let shortcut = urls[query.split(':')[0]]
  if (shortcut && shortcut.suggest) {
    console.log(shortcut.suggest);
    suggestions = shortcut.suggest.slice();
  }

  if (query.length < 3) {
    return callback(suggestions);
  } else {
    $.ajax(SUGG_URL, {
      data: {
        q: query,
        client: 'firefox'
      },
      dataType: 'jsonp'
    }).then((data) => {
      return callback(suggestions.concat(data[1]));
    });
  }
}

function hideSearch(e) {
  e.target.value = '';
  $bar.hide();
  $timeWrapper.show();
  $suggestions.empty();
  $autocomplete.val('');
}

function submitHandler(alt, ctrl) {
  let query = $search.val();
  let url;

  // Go directly if url
  if (query.match(/[^\.\s]*\.?[^\.\s]\.[^\.\s]/i) && !query.trim().includes(' ')) {
    url = query;
    if (!(url.startsWith('http://') || url.startsWith('http://'))) {
      url = 'https://' + url;
    }
  } else {
    url = 'https://www.google.com/search?q=' + encodeURIComponent(query);
    // Feelin' lucky
    if (ctrl) {
      url += '&btnI=I';
    }
  }

  let [root, shortQuery] = query.split(':');
  shortQuery = shortQuery || '';

  let res = urls[root];
  if (res) {
    if (typeof res.query === 'string') {
      url = res.query;
    } else {
      url = res.query(shortQuery);
    }
    url = 'https://' + url;
  }

  // Open in new tab
  if (alt) {
    window.open(url);
  } else {
    document.location.href = url;
  }
}

function updateSuggestions(suggestions) {
  $suggestions.empty();

  // Autocomplete
  if (suggestions.length > 0  && suggestions[0].startsWith($search.val())) {
    $autocomplete.val(suggestions[0]);
  } else {
    $autocomplete.val('');
  }

  if (suggestions.length == 0) {
    $suggestions.empty();
  } else {
    for (let suggestion of suggestions) {
      $suggestions.append(`<li>${suggestion}</li>`);
    }
  }
}

function inputHandler(e) {
  if (e.key == 'Enter') {
    submitHandler(e.altKey, e.ctrlKey);
  } else if (e.key == 'Escape') {
    hideSearch(e);
  } else if (e.key == 'ArrowRight') {
    let suggestion = $autocomplete.val();
    if (suggestion && e.target.selectionStart == $search.val().length) {
      $search.val(suggestion);
      e.target.selectionStart = $search.val().length;
    }
  } else { // Character typed
    if (e.key == 'Backspace' || e.key.length == 1) {
      getSuggestions(e.target.value, updateSuggestions);
      let res = urls[$search.val().split(':')[0]];
      if (res) {
        $search.css('color', res.color);
      } else {
        $search.css('color', '');
      }
    }
    return;
  }

  e.preventDefault();
}

export function setupSearch() {
  // Show search on type
  document.onkeydown = (e) => {
    if ($search.val() || (e.key.length == 1 && !e.ctrlKey) || (e.ctrlKey && e.key == 'v')) {
      $timeWrapper.hide();
      $bar.show();
      $search.focus();
    }
  }

  $search.keyup(inputHandler);

  // Handling copy rather than ^C had better responsiveness
  $search.bind('copy', hideSearch);
}
