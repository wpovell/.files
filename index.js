window.addEventListener( "pageshow", function ( event ) {
    var historyTraversal = event.persisted || ( typeof window.performance != "undefined" && window.performance.navigation.type === 2 );
    if ( historyTraversal ) {
	window.location.reload();
    }
});

let t = document.getElementById("time");
let dt = document.getElementById("date");
const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];

function setTime() {
    let d = new Date();
    h = ((d.getHours() % 12) + "").padStart(2, "0");
    let m = (d.getMinutes()+"").padStart(2, "0");
    t.innerText = h + " " + m;
}

function setDate() {
    let d = new Date();
    dt.innerText = months[d.getMonth()] + " " + d.getDate();
}
f = () => { setTime(); setDate(); };
f();
setInterval(f, 5000);

let s = document.getElementById("search");

function setVis(hideSearch) {
    let sVis = hideSearch ? 'none' : 'block';
    let tVis = hideSearch ? 'block' : 'none';
    t.style.display = tVis;
    dt.style.display = tVis;
    s.style.display = sVis;
}

let urls = {
    'g' : ['github.com', '#404448'],
    'a' : ['amazon.com', '#FF9900'],
    'y' : ['youtube.com', '#FF0000'],
    'f' : ['facebook.com', '#4267B2'],
    'h' : ['news.ycombinator.com', '#FF6600'],
    'r' : ['reddit.com', '#CEE3F8'],
    'n' : ['netflix.com', '#E30813'],
    'c' : ['calendar.google.com', '#DB4A38'],
    'm' : ['gmail.com','#DB4A38'],
    't' : ['twitter.com', '#1DA1F2'],
    'i' : ['instagram.com', '#7E46C0']
}


function enter() {
    let q = s.innerText;

    if (urls[q]) {
	return 'https://' + urls[q][0];
    }
    
    if (q.startsWith('r/')) {
	return 'https://reddit.com/r/' + q.slice(2);
    }

    return 'https://www.google.com/search?q=' + encodeURIComponent(q);
}

document.addEventListener("paste", (e) => {
    s.innerText += e.clipboardData.getData('text/plain');
}, false);

document.onkeypress = (e) => {
    setVis(false);
    console.log(e);
    
    if (e.key == 'Escape') {
	s.innerText = '';
	setVis(true);
    } else if (e.key == 'Backspace') {
	s.innerText = s.innerText.slice(0,-1);
    } else if (e.key == 'Enter') {
	e.stopPropagation();
	document.location.href = enter();
    } else if (e.key == 'c' && e.ctrlKey) {
	s.innerText = '';
    } else if (e.charCode != 0 || e.key == ' ') {
	if (e.key == ' ') {
	    s.innerText += ' ';
	} else {
	    s.innerText += e.key;
	}
    }

    if (urls[s.innerText] || s.innerText.startsWith('r/')) {
	console.log(urls[s.innerText.slice(0,1)]);
	s.style.color = urls[s.innerText][1];
    } else {
	s.style.color = '';
    }

    let c;
    if((c=/#[0-9a-f]{6}$/i.exec(s.innerText)) ||
       (c=/#[0-9a-f]{3}$/i.exec(s.innerText))) {
	s.style.color = c[0];
    } else {
	s.style.color = '';
    }

};
