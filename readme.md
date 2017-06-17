# HTML Static Asset Path Extractor

A simple utility to extract static assets' path from an HTML page

## Install

```bash
npm install --save html-static-asset-path-extractor
```

## Usage

```javascript
const extractor = require('html-static-asset-path-extractor')
const extracted = extractor('./test.html')
console.log(extracted)
```

## Testing

```bash
npm test
```

## License

MIT
