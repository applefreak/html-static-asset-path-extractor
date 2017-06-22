const should = require('should')
const extractor = require('../extractor.js')

describe('extractor test', () => {
  describe('The extracting method', () => {
    it('should correctly extract static assets', () => {
      extractor(__dirname + '/test.html')
      .then(data => {
        data.should.containDeep([
          { filePath: 'test.css', contentType: 'text/css; charset=utf-8' },
          {filePath: 'script.js', contentType: 'application/javascript; charset=utf-8'},
          { filePath: '/public/cat.jpg', contentType: '/public/cat.jpg' }
        ])
      })
      
    })
  })
})
