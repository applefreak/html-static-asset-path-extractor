const IMAGE = ['jpeg', 'jpg', 'gif', 'png', 'svg', 'ico']
const PLAIN = ['txt', 'json', 'csv', 'yaml', 'yml', 'css', 'js']
const FONT = ['woff', 'woff2', 'ttf', 'otf', 'eot']
const ALL = [...IMAGE, ...PLAIN, ...FONT]

const contains = ext => ALL.includes(ext)

module.exports = {
  IMAGE,
  PLAIN,
  FONT,
  ALL,
  contains
}
