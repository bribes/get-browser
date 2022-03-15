# Get Browser
This fixes [the browser version 100 problem](https://hacks.mozilla.org/2022/02/version-100-in-chrome-and-firefox/). Get the browser name and version in JSON format. window.browser Ex. {"name": "brave", "version": "100"}

Add this to your site
```html
<script src="https://cdn.jsdelivr.net/gh/bribes/get-browser@latest/getbrowser.min.js"></script>
```

Usage Ex.
```javascript
console.log(window.browser); // Ex. {"name": "brave", "version": "100"}
```

## Cloudflare Worker API
I set up a cloudflare worker for this if someone wants to use this as an API.

https://get-browser.faav.tk/

You can set this up yourself, heres the code:
[Source Code](https://raw.githubusercontent.com/bribes/get-browser/main/cf-worker.js)
