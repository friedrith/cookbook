import { Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'

import LandingPage from 'components/views/LandingPage'
import ListOfRecipes from 'components/views/ListOfRecipes'
import CookBook from 'components/views/CookBook'
import Recipe from 'components/views/Recipe'

import Loading from 'components/atoms/Loading'

const App = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/recipes" element={<CookBook />}>
        <Route path="" element={<ListOfRecipes />} />
        <Route path=":recipeId" element={<Recipe />} />
      </Route>
    </Routes>
  </Suspense>
)

export default App
