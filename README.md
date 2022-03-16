# Get Browser
This fixes the [browser version 100 problem](https://hacks.mozilla.org/2022/02/version-100-in-chrome-and-firefox/). Get the browser name and version in JSON format. window.browser Ex. {"browser": "brave", "version": "100"}

Add this to your site
```html
<script src="https://cdn.jsdelivr.net/gh/bribes/get-browser@latest/js/getbrowser.min.js"></script>
```

Usage Ex.
```javascript
console.log(window.browser); // Ex. {"browser": "brave", "version": "100"}
```

## Cloudflare Worker API
I set up a cloudflare worker for this if someone wants to use this as an API. If using server side put user agent taken from user as user agent sending to API.

https://get-browser.faav.tk/

### Responses

200
```json
{"browser":"brave","version":"100"}
```

No User Agent 404
```json
{"error":"no_user_agent","message":"No User Agent Found!","code":404}
```

No Browser 404
```json
{"error":"no_browser","message":"No Browser Detected!","code":404}
```

You can set this up yourself, heres the code:
[Source Code](https://raw.githubusercontent.com/bribes/get-browser/main/worker/cf-worker.js)
