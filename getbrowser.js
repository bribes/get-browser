window.browser = function () {
  var ua = navigator.userAgent,
    tem, M = ua.match(/(opera|chrome|duckduckgo|alohabrowser|safari|firefox|msie|ccleaner|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return {
      browser: 'ie',
      version: (tem[1] || '')
    };
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bEdg\/(\d+)/) // matches user-agent Ex. Edg/99.0.1150.39
    if (tem != null) return {
      browser: 'edge',
      version: tem[1]
    };
    tem = ua.match(/\bOPR\/(\d+)/)
    if (tem != null) return {
      browser: 'opera',
      version: tem[1]
    };
    tem = ua.match(/\bCCleaner\/(\d+)/)
    if (tem != null) return {
      browser: 'ccleaner',
      version: tem[1]
    };
    var isBrave = !("mozInnerScreenX" in window) && ("chrome" in window && "webkitStorageInfo" in window && "brave" in navigator && "isBrave" in navigator.brave) ? true : false;
    if (isBrave === true) return {
      browser: 'brave',
      version: M[2]
    };
  }
  if (M[1] === 'Safari') {
    tem = ua.match(/\bDuckDuckGo\/(\d+)/)
    if (tem != null) return {
      browser: 'duckduckgo',
      version: tem[1]
    };
    tem = ua.match(/\bAlohaBrowser\/(\d+)/)
    if (tem != null) return {
      browser: 'aloha',
      version: tem[1]
    };
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }
  return {
    browser: M[0].toLowerCase(),
    version: M[1]
  };
}();
