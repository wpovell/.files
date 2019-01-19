export const urls = {
  'mp': {
    name: 'maps',
    color: '#4285f4',
    query: (q) => {
      let base = 'www.google.com/maps';
      if (!q) {
        return base;
      }

      return base + '/search/' + q;
    },
  },
  'lv': {
    name: 'laundry view',
    color: '#645e50',
    query: 'www.laundryview.com/home/1921/1429242',
  },
  'gr': {
    name: 'goodreads',
    color: '#372213',
    query: 'www.goodreads.com',
  },
  'wa': {
    name: 'wolfram alpha',
    color: '#dd1100',
    query: (q) => {
      let base = 'www.wolframalpha.com';
      if (!q) {
        return base;
      }

      return base + '/input/?i=' + q;
    }
  },
  'gs': {
    name: 'gradescope',
    color: '#1b807c',
    query: 'www.gradescope.com',
  },
  'ol': {
    name: 'overleaf',
    color: '#4f9c45',
    query: 'v2.overleaf.com/project',
  },
  'zip': {
    name: 'zipcar',
    color: '#6cb33e',
    query: 'www.zipcar.com',
  },
  'smu': {
    name: 'signmeup',
    color: 'white',
    query: 'signmeup.cs.brown.edu',
  },
  'sys': {
    name: 'sysdoc',
    color: '#ba3925',
    query: 'sysdoc.cs.brown.edu',
  },
  'wd': {
    name: 'workday',
    color: '#0568CB',
    query: 'wd5.myworkday.com/brown/login.flex',
  },
  's': {
    name: 'slack',
    color: '#4D394B',
    query: 'cs167tas2019.slack.com',
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
      if (q == 'os') {
        return base + '/drive/folders/1YLRnArLEhdaeQaHQ100XWDkmcCkCmEFv'
      }
      return base;
    },
    suggest: ['os']
  },
  'pb': {
    name: 'pushbullet',
    color: '#4AB367',
    query: 'pushbullet.com'
  },
  'wg': {
    color: '#006600',
    query: '4chan.org/wg/catalog'
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
  'cs': {
    name: 'cs',
    color: '#006a91',
    query: (q) => {
      let base = 'cs.brown.edu/courses/';
      switch(q) {
      case 'os':
        return base + 'csci1670';
      case 'dist':
        return base + 'cs138/s19';
      default:
        return base + q;
      }
    },
    suggest: ['os', 'dist'],
  },
  'can': {
    color: '#A10311',
    query: 'canvas.brown.edu',
  },
  'ss': {
    color: '#A10311',
    query: 'selfservice.brown.edu',
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
    color: '#606468',
    query: (q) => {
      let u = 'github.com/';
      if (q) {
        if (q.includes('/')) {
          u += q;
        } else {
          u += 'wpovell/'+q;
        }
      }
      return u;
    },
    suggest: ['wpovell/', '.files'],
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

      if (q == 'nl') {
        u += 'user/northernlion/videos';
      } else if (q && q.startsWith('u/')) {
        u += 'user/' + q.slice(2) + '/videos';
      } else if (q) {
        u += 'results?search_query=' + encodeURIComponent(q);
      }

      return u;
    },
    suggest: ['nl']
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
          let ret = $("#hn a.comment")[parseInt(res[1]) - 1].href;
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
      if (q == 'hhh') {
        u += 'r/hiphopheads';
      } else if (q && q.startsWith('m/')) {
        u += 'me/' + q;
      } else if (q && !q.startsWith('u/')) {
        u += 'r/' + q;
      } else if (q) {
        u += q;
      }
      return u;
    },
    suggest: ['m/programming', 'm/nix', 'hhh', 'u/puzzel']
  },
  'n': {
    name: 'netflix',
    color: '#E30813',
    query: 'netflix.com'
  },
  'c': {
    name: 'calendar',
    color: '#DB4A38',
    query: (q) => {
      let acct = 1;
      if (q == "brown") {
        acct = 1;
      }
      let url = `calendar.google.com/calendar/b/${acct}/r`;
      return url;
    },
    suggest: ["brown", "personal"],
  },
  'e': {
    name: 'email',
    color: '#DB4A38',
    query: (q) => {
      let acct = 0;
      if (q == "personal") {
        acct = 1;
      }
      let url = `mail.google.com/mail/u/${acct}/#inbox`
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
