import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { areRecipesFetched, fetchRecipes } from 'store'
import { actualizeTheme } from 'utils/theme'

export const CookBook = () => {
  const dispatch = useDispatch()
  const fetched = useSelector(areRecipesFetched)

  useEffect(async () => {
    await dispatch(fetchRecipes())
    actualizeTheme()
  }, [fetched])

  return <div className="min-h-full relative pb-36 bg-gray-100 dark:bg-slate-900">{fetched ? <Outlet /> : <div>loading</div>}</div>
}

export default CookBook
