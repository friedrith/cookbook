import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import thumbnailUrl from 'utils/thumbnailUrl'
import Recipe from 'models/Recipe'
import KeywordList from 'features/categories/components/KeywordList'
import { BadgeSize } from 'components/atoms/Badge'

type Props = {
  recipe: Recipe
  onClick?: (event: React.SyntheticEvent) => void
}

const RecipePreview = ({ recipe, onClick = () => {} }: Props) => {
  const { t } = useTranslation()

  const [previewUrl, setPreviewUrl] = useState(thumbnailUrl(recipe.imageUrl))

  const navigate = useNavigate()

  return (
    <div
      role="button"
      tabIndex={0}
      className="relative group"
      // to={`/recipes/${recipe.id}`}
      onClick={event => {
        onClick(event)
        navigate(`/recipes/${recipe.id}`)
        event.preventDefault()
      }}
      onKeyDown={() => {}}
    >
      <div className="aspect-w-3 aspect-h-3 rounded-xl overflow-hidden bg-gray-200">
        <img
          src={previewUrl}
          alt={recipe.name}
          className="object-center object-cover indent-[-9999px]"
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
      <div className="mt-1 md:mt-2.5 flex items-center justify-between text-sm md:text-sm font-medium text-gray-900 space-x-8">
        <h3 className="break-words line-clamp-1 text-ellipsis">
          <span aria-hidden="true" className="absolute inset-0" />
          {recipe.name}
        </h3>
      </div>
      <KeywordList
        className="mt-1 text-sm text-gray-500 break-words line-clamp-1 text-ellipsis"
        size={BadgeSize.large}
        keywords={recipe.keywords}
      />
    </div>
  )
}

export default RecipePreview
