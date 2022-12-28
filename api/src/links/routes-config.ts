import { Application } from 'express'
import { create } from './controller'
import { isAuthenticated } from '../auth/authenticated'

export function routesConfig(app: Application) {
  app.post('/links', [isAuthenticated, create])
}
