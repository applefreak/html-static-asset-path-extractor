const should = require('should')
const extractor = require('../extractor.js')
const fs = require('fs')

const result = [
  { filePath: 'test.css', contentType: 'text/css; charset=utf-8' },
  {filePath: 'script.js', contentType: 'application/javascript; charset=utf-8'},
  { filePath: 'test/script.js', contentType: 'test/script.js' },
  { filePath: 'public/cat.jpg', contentType: 'public/cat.jpg' }
]

describe('extractor test', () => {
  describe('The extracting method', () => {
    it('should extract static assets provided a file path', () => {
      extractor(__dirname + '/test.html')
      .then(data => {
        data.should.containDeep(result)
      })
    })

    it('should extract static assets provided an HTML string', () => {
      const html = fs.readFileSync(__dirname + '/test.html').toString()
      extractor(html)
      .then(data => {
        data.should.containDeep(result)
      })
    })
  })
})
