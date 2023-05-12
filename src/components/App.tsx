import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Roles from 'models/Roles'

import LandingPage from 'components/views/LandingPage'
import RecipeList from 'components/views/RecipeList'
import RecipeView from 'components/views/RecipeView'
import Preferences from 'components/views/Preferences'
import Login from 'components/views/Login'
import RecipeNew from 'components/views/RecipeNew'
import RecipeEdit from 'components/views/RecipeEdit'
import RecipeFocus from 'components/views/RecipeFocus'
import NotFound404 from 'components/views/NotFound404'
import RecipeShare from 'components/views/RecipeShare'
import CodeVerify from 'components/views/CodeVerify'
import ProtectedRoute from 'components/routes/ProtectedRoute'
import PortalRoute from 'components/routes/PortalRoute'
import GlobalRoute from 'components/routes/GlobalRoute'
import useAuthentication from 'features/authentication/hooks/useAuthentication'
import ShoppingList from 'components/views/ShoppingList'

import HistoryContext from 'contexts/History'

import useTransition from 'hooks/useTransition'

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
