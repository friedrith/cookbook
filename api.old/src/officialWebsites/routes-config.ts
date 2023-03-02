import { Application } from 'express'
import { getOfficialDomains } from './controller'

export function routesConfig(app: Application) {
  app.get('/officialWebsites', [getOfficialDomains])
}
