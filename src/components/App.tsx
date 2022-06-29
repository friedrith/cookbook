import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Welcome from 'components/views/Welcome'
import RecipeList from 'components/views/RecipeList'
import RecipeView from 'components/views/RecipeView'
import Preferences from 'components/views/Preferences'
import Login from 'components/views/Login'
import WaitingForLink from 'components/views/WaitingForLink'
import VerifyLink from 'components/views/VerifyLink'
import CreateRecipe from 'components/views/CreateRecipe'
import ProtectedPage from 'components/templates/ProtectedPage'

import { useAppDispatch } from 'hooks/redux'
import { initSession } from 'store'

const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initSession())
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/recipes" element={<ProtectedPage onlyRoles={['user']} />}>
        <Route path="" element={<RecipeList />} />
        <Route path="new" element={<CreateRecipe />} />
        <Route path=":recipeId" element={<RecipeView />} />
      </Route>
      <Route
        path="/preferences"
        element={
          <ProtectedPage onlyRoles={['user']}>
            <Preferences />
          </ProtectedPage>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/waiting-for-link" element={<WaitingForLink />} />
      <Route path="/verify-link" element={<VerifyLink />} />
    </Routes>
  )
}

export default App
