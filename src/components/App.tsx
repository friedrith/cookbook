import { Routes, Route } from 'react-router-dom'

import Welcome from 'components/views/Welcome'
import RecipeList from 'components/views/RecipeList'
import RecipeDetails from 'components/views/RecipeDetails'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/recipes">
        <Route path="" element={<RecipeList />} />
        <Route path=":recipeId" element={<RecipeDetails />} />
      </Route>
    </Routes>
  )
}

export default App
