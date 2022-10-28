import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import thumbnailUrl from 'utils/thumbnailUrl'
import Recipe from 'models/Recipe'

type Props = {
  recipe: Recipe
}

const RecipePreview = ({ recipe }: Props) => {
  const { t } = useTranslation()

  const [previewUrl, setPreviewUrl] = useState(thumbnailUrl(recipe.imageUrl))

  return (
    <Link className="relative group" to={`/recipes/${recipe.id}`}>
      <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden bg-gray-200">
        <img
          src={previewUrl}
          alt={recipe.name}
          className="object-center object-cover"
          onError={() => setPreviewUrl(recipe.imageUrl)}
        />
        <div
          className="flex items-end opacity-0 p-4 group-hover:opacity-100"
          aria-hidden="true"
        >
          <div className="w-full bg-white bg-opacity-75 backdrop-filter backdrop-blur py-2 px-4 rounded-md text-sm font-medium text-gray-900 text-center">
            {t('_View Recipe')}
          </div>
        </div>
      </div>
      <div className="mt-1 md:mt-2 flex items-center justify-between text-base font-medium text-gray-900 space-x-8">
        <h3 className="break-words line-clamp-3 text-ellipsis">
          <span aria-hidden="true" className="absolute inset-0" />
          {recipe.name}
        </h3>
      </div>
      {/* <p className="mt-1 text-sm text-gray-500">{recipe.keywords}</p> */}
    </Link>
  )
}

export default RecipePreview
