const path = require('path')
const serveStatic = require('serve-static')

const assetsPath = path.join(__dirname, 'public')

module.exports = function (app) {
  app.use('/', serveStatic(assetsPath))
}
