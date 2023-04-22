const path = require('path')
const { readFileSync } = require('fs')

const englishLocales = path.join(__dirname, '../../public/locales/en')

module.exports = (translations, currentFileAbsolutePath) => {
  const namespace = path.basename(currentFileAbsolutePath)

  return JSON.parse(
    readFileSync(path.join(englishLocales, namespace), { encoding: 'utf-8' }),
  )
}
