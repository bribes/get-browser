# Get Browser
This fixes the web browser 100 issue. Get the browser name and version in JSON format. window.browser Ex. {"name": "brave", "version": "100"}

Add this to your site
```html
<script src="https://cdn.jsdelivr.net/gh/bribes/get-browser@latest/getbrowser.min.js"></script>
```

Usage Ex.
```javascript
console.log(window.browser); // Ex. {"name": "brave", "version": "100"}
```

## Cloudflare Worker API
I set up a cloudflare worker for this if someone wanted to ues an API.

https://get-browser.faav.tk/

You can set one up yourself heres the code:
[Source Code](https://raw.githubusercontent.com/bribes/get-browser/main/cf-worker.js)
