// by Faav#6320

// Supports: Chrome, Firefox, Brave (Desktop Only), Opera, Safari, Edge, DuckDuckGo, Trident, Opera, Internet Explorer, CCleaner, Aloha

/* jshint esversion: 10 */

import {
  Router
}
from 'tiny-request-router';
const router = new Router();

async function userAgent(request) {
  const init = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*"
    },
    code: 200
  };

const browser = function () {
  try {
   var headers = Object.fromEntries(request.headers), ua = headers['user-agent'],
   tem, M = ua.match(/(opera|chrome|duckduckgo|alohabrowser|safari|firefox|msie|ccleaner|trident(?=\/))\/?\s*(\d+)/i) || [];
   if (ua) {
    if (M.length == 0) {
      init.code = 404;
      return {
       error: "no_browser",
       message: "No Browser Detected!",
       code: 404
      };
    }

    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return {
        browser: 'ie',
        version: (tem[1] || '')
      };
    }

    if (M[1] === 'Chrome') {
     tem = ua.match(/\bDuckDuckGo\/(\d+)/);
     if (tem != null) return {
       browser: 'duckduckgo',
       version: tem[1]
     };
     if (!headers['x-requested-with']) {} else {
       if (headers['x-requested-with'] == "io.metamask") return {
         browser: 'metamask',
         version: M[2]
       };
     }
     if (!headers['sec-ch-ua'] && ua.includes("Mobile") == false) return {
       browser: 'brave',
       version: M[2]
     };
    }

    if (M[1] === 'Safari') {
     var ver = ua.match(/\bVersion\/(\d+)/);
     var tem = ua.match(/\bAlohaBrowser\/(\d+)/);
     if (ver != null) M[2] = ver[1];
     if (tem != null) return {
       browser: 'aloha',
       version: ver[1]
     };
    }

    if (headers['sec-ch-ua']) return {
       browser: headers['sec-ch-ua'].split('"')[9].toLowerCase().replace(' browser', '').split(" ")[headers['sec-ch-ua'].split('"')[9].toLowerCase().replace(' browser', '').split(" ").length-1],
       version: headers['sec-ch-ua'].split('"')[11],
    };

    return {
      browser: M[1].toLowerCase(),
      version: M[2]
    }
     } else {
      init.code = 404;
      return {
        error: "no_user_agent",
        message: "No User Agent Found!",
        code: 404
      };
     }
  } catch {}
}();

  return new Response(JSON.stringify(browser), init);
}

router.get('/', async(request) => userAgent(request));

addEventListener('fetch', event => {
  const request = event.request;
  const { pathname } = new URL(request.url);

  const match = router.match(request.method, pathname);
  if (match) {
    event.respondWith(match.handler(request));
  }
});
