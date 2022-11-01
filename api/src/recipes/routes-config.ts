import { Application } from 'express'
import { all, importRecipe, create, remove, patch } from './controller'
import { isAuthenticated } from '../auth/authenticated'
// import { isAuthorized } from '../auth/authorized'

export function routesConfig(app: Application) {
  app.post('/recipes/import', [isAuthenticated, importRecipe])

  app.post('/recipes', [isAuthenticated, create])

  app.get('/recipes', [isAuthenticated, all])

  app.delete('/recipes/:id', [isAuthenticated, remove])

  app.patch('/recipes/:id', [isAuthenticated, patch])
}
