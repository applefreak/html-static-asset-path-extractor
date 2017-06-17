const fs = require('fs')
const path = require('path')
const htmlparser = require('htmlparser2').Parser
const mimeLookup = require('mime-types').contentType
const validStaticFile = require('./static-assets-ext').contains

const EXTRACT_DEFAULTS = {
  link: 'href',
  img: 'src',
  script: 'src',
}

const getParser = (onopentag) => {
  let parser = undefined
  const initParser = () => {
    parser = new htmlparser({ onopentag }, {decodeEntities: true})
    return parser
  }

  return parser ? parser : initParser()
}

module.exports = (file, extracts = EXTRACT_DEFAULTS) => {
  const result = []
  // TODO handle error
  const content = fs.readFileSync(file)

  let parser = getParser((name, attrs) => {
    if (name in extracts) {
      const filePath = attrs[extracts[name]]
      const ext = path.extname(filePath)
      if (ext.length > 2 && validStaticFile(ext.substr(1))) {
        const contentType = mimeLookup(filePath)
        result.push({ filePath, contentType })
      }
    }
  })
  parser.write(content)
  parser.end()

  return result
}
