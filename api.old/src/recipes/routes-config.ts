import { Application } from 'express'
import {
  all,
  importRecipe,
  create,
  remove,
  patch,
  removeAll,
  getOneByLink,
} from './controller'
import { isAuthenticated } from '../auth/authenticated'

export function routesConfig(app: Application) {
  app.post('/recipes/import', [isAuthenticated, importRecipe])

  app.post('/recipes', [isAuthenticated, create])

  app.get('/recipes/:linkId', [getOneByLink])

  app.get('/recipes', [isAuthenticated, all])

  app.delete('/recipes/all', [isAuthenticated, removeAll])

  app.delete('/recipes/:id', [isAuthenticated, remove])

  app.patch('/recipes/:id', [isAuthenticated, patch])
}
