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
    let h = d.getHours();
    if (h == 0)
	h = 12;
    h = (((h-1) % 12)+1 + "").padStart(2, "0");
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
let sug = document.getElementById("suggest");
function setVis(hideSearch) {
    let sVis = hideSearch ? 'none' : 'block';
    let tVis = hideSearch ? 'block' : 'none';
    t.style.display = tVis;
    dt.style.display = tVis;
    s.style.display = sVis;
    sug.style.display = sVis;
}

let urls = {
    'd'  : {
	color : '#F4B400',
	query : 'drive.google.com'
    },
    'p' : {
	color : '#3E7AAB',
	query : 'piazza.com'
    },
    'x' : {
	color : '#000000',
	query : 'xkcd.com'
    },
    'l' : {
	color : '#0077B5',
	query : 'linkedin.com'
    }, 
    'rt' : {
	color: '#fafafa',
	query: 'rt.cs.brown.edu'
    },
    'hm' : {
	color: '#83C441',
	query: 'hypem.com/popular'
    },
    's' : {
	color: '#FF4400',
	query: 'soundcloud.com'
    },
    'b' : {
	color: '#3A1E1A',
	query: (q) => {
	    let cc;
	    switch (q) {
	    case 'cab':
		return 'cab.brown.edu';
	    case 'canvas':
		return 'canvas.brown.edu';
	    case 'cs147':
		cc = 'cs1470';
		break;
	    case 'cs123':
		cc = q;
		break;
	    case 'cs33':
		cc = 'csci0330';
		break;
	    case 'cs100':
		cc = 'csci0100'
		break;
	    }
	    return 'cs.brown.edu/courses/'+cc
	},
	suggest: ['cs147', 'cs123', 'cs33', 'cs100', 'cab', 'canvas']
    },
    'cab' : {
	color: '#A10311',
	query: 'cab.brown.edu'
    },
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
	    } else if (q == 'isotope') {
                u += 'athyuttamre/isotopeticketing';
            } else {
		u += q;
	    }
	    return u;
	},
	suggest: ['wpovell', 'smu', 'isotope']
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
	    if (q == 'chill') {
		return u += 'watch?v=AQBh9soLSkI';
	    }

	    if (q && q.startsWith('u/')) {
		u += 'user/' + q.slice(2) + '/videos';
	    } else if (q) {
		u += 'results?search_query=' + encodeURIComponent(q);
	    }

	    return u;
	},
	suggest: ['u/northernlion', 'chill']
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
	},
	suggest: ['m/programming', 'm/nix']
	  
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
    // Go directly if url
    if (q.match(/[^\.\s]*\.?[^\.\s]\.[^\.\s]/i)) {
	return 'https://' + q;
    }
    
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

// Capture paste
document.addEventListener("paste", (e) => {
    s.innerText += e.clipboardData.getData('text/plain');
    if (s.innerText)
	setVis(false);
}, false);

let lastS;
document.onkeypress = (e) => {
    if (e.key == 'Tab' && !s.innerText)
	return;
    
    if (['l','r','C','v'].includes(e.key) && e.ctrlKey) {
	return;
    }
    e.preventDefault();
    setVis(false);
    console.log(e);
    e.stopPropagation();
    if (e.key == 'Escape') {
	s.innerText = '';
	lastS = '';
	setVis(true);
    } else if (e.key == 'Backspace') {
	s.innerText = s.innerText.slice(0,-1);
    } else if (e.key == 'Enter') {
	let url = enter();
	if (e.altKey) {
	    window.open(url);
	} else {
	    document.location.href = url;
	}
    } else if (e.key == 'Tab') {
	let ss = document.getElementById('suggest').children[0].children;
	let found = false;
	let setNext = false;
	for (let c of ss) {
	    if (setNext) {
		setNext = false;
		c.classList.add('active');
	    } else if (c.classList.contains('active')) {
		found = true;
		setNext = true;
		c.style.color = '';
		c.classList.remove('active');
	    }
	}
	if (!found || setNext) {
	    ss[0].classList.add('active');
	}
	let active = document.getElementsByClassName('active')[0];
	active.style.color = s.style.color;
	s.innerText = s.innerText.split(':')[0] + ':' + active.innerText;
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

    if (urls[start] && urls[start].suggest) {
	if(lastS != urls[start].suggest) {
	    let suggest = urls[start].suggest;
	    lastS = suggest;
	    sug.innerHTML = '<ul>' +
		suggest.map((x) => { return '<li>'+x+'</li>'; }).join('') +
		'</ul>';
	}
    } else {
	sug.innerHTML = '';
    }

    if (!s.innerText) {
	lastS = '';
	setVis(true);
    }
};
