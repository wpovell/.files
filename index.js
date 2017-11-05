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
    h = (((d.getHours()-1) % 12)+1 + "").padStart(2, "0");
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
    'nyt' : {
	color: '#1A1A1A',
	query: 'nytimes.com'
    },
    'g' : {
	color: '#404448',
	query: (q) => {
	    let u = 'github.com/';
	    if (q == 'smu') {
		u += 'signmeup/signmeup';
	    } else {
		u += q;
	    }
	    return u;
	},
	suggest: () => {
	    return ['wpovell', 'smu'];
	}
    },
    'a' : {
	color: '#FF9900',
	query: (q) => {
	    let r = 'amazon.com/';
	    if (q)
		r += 's/field-keywords=' + encodeURIComponent(q);
	    return r;
	}
    },
    'y' : {
	color: '#FF0000',
	query: (q) => {
	    let u = 'youtube.com/';
	    if (q && q.startsWith('u/')) {
		u += 'user/' + q.slice(2) + '/videos';
	    } else if (q) {
		u += 'results?search_query=' + encodeURIComponent(q);
	    }

	    return u;
	},
	suggest: () => {
	    return ['u/northernlion'];
	}
    },
    'f' : {
	color: '#4267B2',
	query: 'facebook.com'
    },
    'h' : {
	color: '#FF6600',
	query: 'news.ycombinator.com'
    },
    'r' : {
	color: '#CEE3F8',
	query: (q) => {
	    let u = 'reddit.com/';
	    if (q && q.startsWith('m/')) {
		u += 'me/' + q;
	    } else if (q) {
		u += 'r/' + q;
	    }
	    return u;
	}
    },
    'n' : {
	color: '#E30813',
	query: 'netflix.com',
    },
    'c' : {
	color: '#DB4A38',
	query: 'calendar.google.com',
    },
    'e' : {
	color: '#DB4A38',
	query: 'gmail.com'
    },
    't' : {
	color: '#1DA1F2',
	query: 'twitter.com'
    },
    'i' : {
	color: '#7E46C0',
	query: 'instagram.com'
    },
    'm' : {
	color: '#0084FF',
	query: 'messenger.com'
    }
}


function enter() {
    let q = s.innerText;
    let r = urls[q.split(':')[0]]
    if (r) {
	if (typeof r.query == 'string') {
	    return 'http://'+r.query;
	} else {
	    return 'http://'+r.query(q.split(':')[1]);
	}
    }
    
    return 'https://www.google.com/search?q=' + encodeURIComponent(q);
}

document.addEventListener("paste", (e) => {
    s.innerText += e.clipboardData.getData('text/plain');
}, false);

document.onkeypress = (e) => {
    if (['l','r','C','v'].includes(e.key) && e.ctrlKey) {
	return;
    }
    e.preventDefault();
    setVis(false);
    console.log(e);
    e.stopPropagation();
    if (e.key == 'Escape') {
	s.innerText = '';
	setVis(true);
    } else if (e.key == 'Backspace') {
	s.innerText = s.innerText.slice(0,-1);
    } else if (e.key == 'Enter') {
	document.location.href = enter();
    } else if (e.key == 'c' && e.ctrlKey) {
	s.innerText = '';
    } else if (!e.ctrlKey && (e.charCode != 0 || e.key == ' ')) {
	s.innerText += e.key;	
    }

    let c;
    let start = s.innerText.split(':')[0]
    if (urls[start]) {
 	s.style.color = urls[start].color;
    } else if((c=/#[0-9a-f]{6}$/i.exec(s.innerText)) ||
	     (c=/#[0-9a-f]{3}$/i.exec(s.innerText))) {
	s.style.color = c[0];
    } else {
	s.style.color = '';
    }

    if (!s.innerText) {
	setVis(true);
    }
};


