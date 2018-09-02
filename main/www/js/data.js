export const urls = {
  'wd': {
    name: 'workday',
    color: '#0568CB',
    query: 'wd5.myworkday.com/brown/login.flex',
  },
  's': {
    name: 'slack',
    color: '#4D394B',
    query: '2018cs033tas.slack.com',
  },
  'w': {
    name: 'weather',
    color: '#4DBFD9',
    query: 'www.google.com/search?q=weather'
  },
  'ff': {
    name: 'bank',
    color: '#427C30',
    query: 'firstfinancial.org'
  },
  '192': {
    name: 'router',
    color: '#b2b2b2',
    query: '192.168.1.1'
  },
  'd': {
    name: 'drive',
    color: '#F4B400',
    query: (q) => {
      let base = 'drive.google.com';
      if (q == 'cs33') {
        return base + '/drive/u/0/folders/1QWcj9eTvVAnS5nVnNRqaEqVuJz0mUKNs';
      }
      return base;
    },
    suggest: ['cs33']
  },
  'pb': {
    name: 'pushbullet',
    color: '#4AB367',
    query: 'pushbullet.com'
  },
  'wg': {
    color: '#006600',
    query: '4chan.org/wg'
  },
  'p': {
    name: 'piazza',
    color: '#3E7AAB',
    query: 'piazza.com'
  },
  'x': {
    name: 'xkcd',
    color: '#000000',
    query: 'xkcd.com'
  },
  'l': {
    name: 'linkedin',
    color: '#0077B5',
    query: 'linkedin.com'
  },
  'rt': {
    color: '#fafafa',
    query: 'rt.cs.brown.edu'
  },
  'hm': {
    name: 'hypemachine',
    color: '#83C441',
    query: 'hypem.com/popular'
  },
  'so': {
    name: 'soundcloud',
    color: '#FF4400',
    query: 'soundcloud.com'
  },
  'lh': {
    name: 'localhost',
    color: '#94BFD0',
    query: (q) => {
      return 'localhost:' + q;
    }
  },
  'b': {
    name: 'brown',
    color: '#3A1E1A',
    query: (q) => {
      let cc;
      switch (q) {
        case 'cab':
          return 'cab.brown.edu';
        case 'canvas':
          return 'canvas.brown.edu';
        case 'cs33':
          cc = 'cs033'
          break;
      }
      return 'cs.brown.edu/courses/' + cc
    },
    suggest: ['cs33', 'cab', 'canvas']
  },
  'cab': {
    color: '#A10311',
    query: 'cab.brown.edu'
  },
  'nyt': {
    color: '#1A1A1A',
    query: 'nytimes.com'
  },
  'g': {
    name: 'github',
    color: '#404448',
    query: (q) => {
      let u = 'github.com/';
      if (q == 'smu') {
        u += 'signmeup/signmeup';
      } else if (q == 'isotope') {
        u += 'wpovell/isotopeticketing';
      } else if (q == 'bluenos') {
        u += 'wpovell/bluenos';
      } else if (q) {
        u += q;
      }
      return u;
    },
    suggest: ['wpovell', 'bluenos', 'smu', 'isotope']
  },
  'a': {
    name: 'amazon',
    color: '#FF9900',
    query: (q) => {
      let r = 'amazon.com/';
      if (q)
        r += 's/field-keywords=' + encodeURIComponent(q);
      return r;
    }
  },
  'y': {
    name: 'youtube',
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
    suggest: ['u/northernlion']
  },
  'f': {
    name: 'facebook',
    color: '#4267B2',
    query: 'facebook.com'
  },
  'h': {
    name: 'hackernews',
    color: '#FF6600',
    query: (q) => {

      if (q) {
        let res = q.match(/^[0-9]{1,2}$/);
        if (res) {
          let ret = $("#hn a:not(.comment)")[parseInt(res) - 1].href;
          ret = ret.replace(/https?:\/\//, '');
          return ret;
        }
        res = q.match(/^([0-9]{1,2})c$/);
        if (res) {
          ret = $("#hn a.comment")[parseInt(res[1]) - 1].href;
          ret = ret.replace(/https?:\/\//, '');
          return ret;
        }
      }

      return 'news.ycombinator.com'
    }
  },
  'r': {
    name: 'reddit',
    color: '#CEE3F8',
    query: (q) => {
      let u = 'reddit.com/';
      if (q && q.startsWith('m/')) {
        u += 'me/' + q;
      } else if (q && !q.startsWith('u/')) {
        u += 'r/' + q;
      } else if (q) {
        u += q;
      }
      return u;
    },
    suggest: ['m/programming', 'm/nix', 'hiphopheads', 'u/puzzel']
  },
  'n': {
    name: 'netflix',
    color: '#E30813',
    query: 'netflix.com'
  },
  'c': {
    name: 'calendar',
    color: '#DB4A38',
    query: 'calendar.google.com'
  },
  'e': {
    name: 'email',
    color: '#DB4A38',
    query: (q) => {
      let acct = 0;
      if (q == "personal") {
        acct = 1;
      }
      url = `mail.google.com/mail/u/${acct}/#inbox`
      return url;
    },
    suggest: ["brown", "personal"]
  },
  't': {
    name: 'twitter',
    color: '#1DA1F2',
    query: 'twitter.com'
  },
  'i': {
    name: 'instagram',
    color: '#7E46C0',
    query: 'instagram.com'
  },
  'm': {
    name: 'messenger',
    color: '#0084FF',
    query: 'messenger.com'
  }
}
