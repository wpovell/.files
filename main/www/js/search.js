import { urls } from '/js/data.js';

const SUGG_URL = 'https://www.google.com/complete/search';

// JQuery handles
const $suggestions = $('#suggestions');
const $search = $('#search');
const $bar = $('#bar');
const $timeWrapper = $('#timeWrapper');
const $autocomplete = $('#autocomplete');
const $hn = $('#hn');
const $xkcd = $('#xkcd');

// Currently active suggestion
let active = -1;

// Get shortcut name if : is present in search
function getSplit() {
  let split = $search.val().split(":");
  if (split.length == 1) {
    return split;
  } else {
    return [split[0], split[1]]
  }
}

// Updates suggestions based on shortcut & google suggestions
function getSuggestions() {
  // Clear correction
  $autocomplete.val('');

  let suggestions = [];

  let shortcut = urls[getSplit()[0]]
  if (shortcut && shortcut.suggest) {
    suggestions = shortcut.suggest.slice();
  }

  if ($search.val().length < 3) {
    return updateSuggestions(suggestions);
  } else {
    $.ajax(SUGG_URL, {
      data: {
        q: $search.val(),
        client: 'firefox'
      },
      dataType: 'jsonp'
    }).then((data) => {
      return updateSuggestions(suggestions.concat(data[1]));
    });
  }
}

// Switch from search to start
function hideSearch(e) {
  e.target.value = '';
  $bar.hide();
  $hn.hide();
  $xkcd.hide();
  $suggestions.empty();
  $autocomplete.val('');
  $timeWrapper.show();
}

// Run on enter, redirects to new page
function submitHandler(alt, ctrl) {
  let query = $search.val();
  let url;

  let [root, shortQuery] = getSplit();
  shortQuery = shortQuery || '';

  let res = urls[root];

  // Go directly if url
  if (query.match(/[^\.\s]*\.?[^\.\s]\.[^\.\s]/i) && !query.trim().includes(' ')) {
    url = query;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url;
    }
  } else if (res) {
    if (typeof res.query === 'string') {
      url = res.query;
    } else {
      url = res.query(shortQuery);
    }
    url = 'https://' + url;
  } else {
    url = 'https://www.google.com/search?q=' + encodeURIComponent(query);
    // Feelin' lucky
    if (ctrl) {
      url += '&btnI=I';
    }
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
  if (suggestions.length > 0 && suggestions[0].startsWith($search.val())) {
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
    const start = e.target.value.split(':')[0];
    if (e.key == 'Backspace' || e.key.length == 1) {
      active = -1;
      getSuggestions();
      let res = urls[start];
      if (res) {
        $search.css('color', res.color);
      } else {
        $search.css('color', '');
      }
    }

    // Show hackernews
    if (start == 'h') {
      $hn.show();
    } else {
      $hn.hide();
    }

    if (start == 'x') {
      $xkcd.show();
    } else {
      $xkcd.hide();
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

    if (e.key == 'Tab') {
      e.preventDefault();

      // Don't do anything if no suggestions
      if ($suggestions.children().size() == 0) {
        return;
      }

      if (active == -1) {
        active = 0;
      } else {
        let d = 1;
        if (e.shiftKey) {
          d = -1;
        }

        let n = $suggestions.children().size();
        active = (active + d + n) % n;
      }
      let activeColor = 'var(--foreground)';

      const [short] = getSplit();
      const entry = urls[short];
      if (entry) {
        activeColor = entry['color'];
        $search.val(short + ":" + $suggestions.children().eq(active).text());
      } else {
        $search.val($suggestions.children().eq(active).text());
      }

      // Highlight suggestion
      $suggestions.children().css('color', '');
      $suggestions.children().eq(active).css('color', activeColor);

      // Remove autocorrect
      $autocomplete.val('');

    }
  }

  $search.keyup(inputHandler);

  // Handling copy rather than ^C had better responsiveness
  $search.bind('copy', hideSearch);
}
