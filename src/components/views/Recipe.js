import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/solid'

import { getRecipe } from 'store'
import Header from 'components/molecules/Header2'

const stats = [
  { name: 'Total Subscribers', stat: '71,897' },
  { name: 'Avg. Open Rate', stat: '58.16%' },
  { name: 'Avg. Click Rate', stat: '24.57%' }
]

export const Recipe = () => {
  let { recipeId } = useParams()

  const recipe = useSelector(getRecipe(recipeId))

  return (
    <>
      <Header>
        <div className="flex-1 flex justify-left ">
          <Link
            type="button"
            to="/recipes"
            className="inline-flex items-center py-2 border border-transparent text-md leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ChevronLeftIcon className="h-7 w-7" aria-hidden="true" />
            Back
          </Link>
        </div>
      </Header>
      <div className="max-w-5xl mx-auto px-2 sm:px-4 lg:px-8 py-5">
        <h1 className="mb-10">
          <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {recipe.title}
          </span>
        </h1>

        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map(item => (
            <div key={item.name} className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  )
}

export default Recipe
