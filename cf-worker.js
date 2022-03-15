// by Faav#6320

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
    }
  };

const browser = function () {
try {
  var ua = Object.fromEntries(request.headers)['user-agent'],
    tem, M = ua.match(/(opera|chrome|safari|firefox|msie|ccleaner|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return {
      name: 'ie',
      version: (tem[1] || '')
    };
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bEdg\/(\d+)/) // matches user-agent Ex. Edg/99.0.1150.39
    if (tem != null) return {
      name: 'edge',
      version: tem[1]
    };
    tem = ua.match(/\bOPR\/(\d+)/)
    if (tem != null) return {
      name: 'opera',
      version: tem[1]
    };
    tem = ua.match(/\bCCleaner\/(\d+)/)
    if (tem != null) return {
        name: 'ccleaner',
      version: tem[1]
    };
if (!Object.fromEntries(request.headers)['sec-ch-ua']) return {
      name: 'brave',
      version: M[2]
    };
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }
  return {
    name: M[0].toLowerCase(),
    version: M[1]
  };
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
