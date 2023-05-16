import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Roles from '~/src/models/Roles'

import LandingPage from '~/src/components/views/LandingPage'
import RecipeList from '~/src/components/views/RecipeList'
import RecipeView from '~/src/components/views/RecipeView'
import Preferences from '~/src/components/views/Preferences'
import Login from '~/src/components/views/Login'
import RecipeNew from '~/src/components/views/RecipeNew'
import RecipeEdit from '~/src/components/views/RecipeEdit'
import RecipeFocus from '~/src/components/views/RecipeFocus'
import NotFound404 from '~/src/components/views/NotFound404'
import RecipeShare from '~/src/components/views/RecipeShare'
import CodeVerify from '~/src/components/views/CodeVerify'
import ProtectedRoute from '~/src/components/routes/ProtectedRoute'
import PortalRoute from '~/src/components/routes/PortalRoute'
import GlobalRoute from '~/src/components/routes/GlobalRoute'
import useAuthentication from '~/src/features/authentication/hooks/useAuthentication'
import ShoppingList from '~/src/components/views/ShoppingList'

import HistoryContext from '~/src/contexts/History'

import useTransition from '~/src/hooks/useTransition'

const App = () => {
  const [transitionStage, previousLocation, displayLocation, onAnimationEnd] =
    useTransition()

  const { i18n } = useTranslation()

  document.body.dir = i18n.dir()

  const { checkSession } = useAuthentication()

  checkSession()

  return (
    <HistoryContext.Provider value={{ previousLocation }}>
      <GlobalRoute>
        <Routes location={displayLocation}>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/recipes"
            element={
              <ProtectedRoute
                className={transitionStage}
                onAnimationEnd={onAnimationEnd}
                onlyRoles={[Roles.User]}
              />
            }
          >
            <Route path="" element={<RecipeList />} />
            <Route path="new" element={<RecipeNew />} />
            <Route path="shopping-list" element={<ShoppingList />} />
            <Route path=":recipeId" element={<RecipeView />} />
            <Route path=":recipeId/focus" element={<RecipeFocus />} />
            <Route path=":recipeId/edit" element={<RecipeEdit />} />
          </Route>
          <Route path="/share/:linkId" element={<RecipeShare />} />
          <Route
            path="/preferences"
            element={
              <ProtectedRoute
                className={transitionStage}
                onAnimationEnd={onAnimationEnd}
                onlyRoles={[Roles.User]}
              >
                <Preferences />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PortalRoute
                className={transitionStage}
                onAnimationEnd={onAnimationEnd}
              />
            }
          >
            <Route path="code-verify" element={<CodeVerify />} />
            <Route path="" element={<Login />} />
          </Route>
          <Route path="/*" element={<NotFound404 />} />
        </Routes>
      </GlobalRoute>
    </HistoryContext.Provider>
  )
}

export default App
