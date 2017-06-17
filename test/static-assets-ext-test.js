const should = require('should')
const sae = require('../static-assets-ext').contains

describe('static-assets-extension test', () => {
  describe('The "contains" method', () => {
    it('Should return "true" when passing it "js"', () => {
      sae('js').should.equal(true)
    })
    it('Should return "false" when passing it "abcd"', () => {
      sae('abcd').should.equal(false)
    })
  })
})
