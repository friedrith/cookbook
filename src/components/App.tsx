import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, Location } from 'react-router-dom'

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
import Help from 'components/views/Help'

import HistoryContext from 'contexts/History'

import { useAppDispatch } from 'hooks/redux'
import { initSession } from 'store'
import { isMobile } from 'utils/platforms/mobile'

const areLocationIncludes = (
  location1: Location,
  location2: Location,
  routes: string[]
) =>
  routes.some(
    r => location1.pathname.includes(r) && location2.pathname.includes(r)
  )

const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initSession())
  }, [dispatch])

  const location = useLocation()

  const [previousLocation, setPreviousLocation] = useState('')

  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransistionStage] = useState('')

  useEffect(() => {
    if (location !== displayLocation) {
      if (
        isMobile() &&
        areLocationIncludes(location, displayLocation, ['/recipes', '/login'])
      ) {
        if (displayLocation.pathname.includes(location.pathname)) {
          setTransistionStage('slideRight')
        } else {
          setTransistionStage('slideLeft')
        }
      } else {
        setDisplayLocation(location)
      }

      setPreviousLocation(displayLocation.pathname)
    }
  }, [location, displayLocation])

  return (
    <div
      id="app"
      className={`${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === 'slideRight') {
          setTransistionStage('slideRightEnd')
          setDisplayLocation(location)
        } else if (transitionStage === 'slideLeft') {
          setTransistionStage('slideLeftEnd')
          setDisplayLocation(location)
        }
      }}
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
          <Route path="/help" element={<Help />} />
          <Route path="/*" element={<NotFound404 />} />
        </Routes>
      </HistoryContext.Provider>
    </div>
  )
}

export default App
