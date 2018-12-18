// Fetches top hackernews stories and adds to DOM
export function setupHN() {
  $.ajax('https://hacker-news.firebaseio.com/v0/topstories.json', {
    dataType: "jsonp",
  }).then((data) => {
    let rank = 1;
    for (let id of data.slice(0, 10)) {
      $("#hn").append(`<li id="${id}">${rank}. </li>`);
      $.ajax(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
        dataType: 'jsonp',
      }).then((data) => {
        let comment = `https://news.ycombinator.com/item?id=${id}`;
        let url = data.url ? data.url : comment;
        $(`#${id}`).append(`
            <a href="${url}">${data.title}</a>
            <br/>
            <a class="comment" href="${comment}">comments</a>
            <br/>
            <br/>`);
      });
      rank++;
    }
  });
}

// Loads most recent XKCD comic
export function setupXKCD() {
  $.ajax('http://dynamic.xkcd.com/api-0/jsonp/comic/', {
    dataType: 'jsonp'
  }).then((data) => {
    $('#xkcd').html(`
      <img src="${data.img}" />
      <p>${data.alt}</p>`);
  });
}