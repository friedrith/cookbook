import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Roles from 'models/Roles'

import LandingPage from 'components/views/LandingPage'
import RecipeList from 'components/views/RecipeList'
import RecipeView from 'components/views/RecipeView'
import Preferences from 'components/views/Preferences'
import Login from 'components/views/Login'
import LinkWaiting from 'components/views/LinkWaiting'
import LinkVerification from 'components/views/LinkVerification'
import RecipeNew from 'components/views/RecipeNew'
import ProtectedPage from 'components/templates/ProtectedPage'
import RecipeEdit from 'components/views/RecipeEdit'
import Faq from 'components/views/Faq'
import NotFound404 from 'components/views/NotFound404'

import HistoryContext from 'contexts/History'

import { useAppDispatch } from 'hooks/redux'
import useTransition from 'hooks/useTransition'
import { initSession } from 'store'
import { fetchOfficialWebsites } from 'store/officialWebsites'

const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initSession())
    dispatch(fetchOfficialWebsites())
  }, [dispatch])

  const [transitionStage, previousLocation, displayLocation, onAnimationEnd] =
    useTransition()

  return (
    <div
      id="app"
      className={`${transitionStage}`}
      onAnimationEnd={onAnimationEnd}
    >
      <HistoryContext.Provider value={{ previousLocation }}>
        <Routes location={displayLocation}>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/recipes"
            element={<ProtectedPage onlyRoles={[Roles.User]} />}
          >
            <Route path="" element={<RecipeList />} />
            <Route path="new" element={<RecipeNew />} />
            <Route path=":recipeId" element={<RecipeView />} />
            <Route path=":recipeId/edit" element={<RecipeEdit />} />
          </Route>
          <Route
            path="/preferences"
            element={
              <ProtectedPage onlyRoles={[Roles.User]}>
                <Preferences />
              </ProtectedPage>
            }
          />
          <Route path="/login/waiting-for-link" element={<LinkWaiting />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-link" element={<LinkVerification />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/*" element={<NotFound404 />} />
        </Routes>
      </HistoryContext.Provider>
    </div>
  )
}

export default App
