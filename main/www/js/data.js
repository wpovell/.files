let urls = {
    'ff' : {
        color : '#427C30',
        query: 'firstfinancial.org'
    },
    
    '192' : {
        color : '#b2b2b2',
        query : '192.168.1.1'
    },
    'd'  : {
	color : '#F4B400',
	query : 'drive.google.com'
    },
    'pb' : {
        color : '#4AB367',
        query : 'pushbullet.com'
    },
    'wg' : {
        color : '#006600',
        query : '4chan.org/wg'
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
    'w' : {
        color: '#6FC8E3',
        query: 'google.com/search?q=weather'
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
	query: (q) => {
            let res = q.match(/^[0-9]{1,2}$/);
            if (res) {
                let ret = $("#hn a:not(.comment)")[parseInt(res)-1].href;
                ret = ret.replace(/https?:\/\//, '');
                return ret;
            }
            res = q.match(/^([0-9]{1,2})c$/);
            if (res) {
                ret = $("#hn a.comment")[parseInt(res[1])-1].href;
                ret = ret.replace(/https?:\/\//, '');
                return ret;
            }

            return 'news.ycombinator.com'
        }
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
