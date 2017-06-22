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

const slashSlicer = (string) =>  (string[0] !== '/') ? string : string.substr(1)

module.exports = (file, extracts = EXTRACT_DEFAULTS) => {
  return new Promise((resolve, reject) => {
    const result = []

    let parser = getParser((name, attrs) => {
      if (name in extracts) {
        if (extracts[name] in attrs) {
          const filePath = slashSlicer(attrs[extracts[name]])
          const ext = path.extname(filePath)
          if (ext.length > 1 && validStaticFile(ext.substr(1))) {
            const contentType = mimeLookup(filePath)
            result.push({ filePath, contentType })
          }
        }
      }
    })

    const fileStream = fs.createReadStream(file)

    fileStream.on('data', data => parser.write(data))
    fileStream.on('end', () => {
      parser.end()
      resolve(result)
    })
  })
}
