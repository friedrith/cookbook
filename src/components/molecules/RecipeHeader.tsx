import React from 'react'

import CategoryBadgeList from '~/src/features/categories/components/CategoryBadgeList'

type Props = {
  recipeName: string
  keywords: string[]
  children?: React.ReactNode
}

const RecipeHeader = ({ recipeName, children, keywords }: Props) => {
  return (
    <div className="flex-1 relative h-full flex items-center z-50">
      <div className="absolute w-full pr-1 pl-2 leading-0 flex flex-col justify-center pointer-events-auto z-50">
        <h1 className="text-left rtl:text-right font-bold leading-2 text-gray-900 text-lg lg:text-2xl line-clamp-1 text-left flex flex-col items-center text-ellipsis break-words">
          <span>
            {recipeName} {children}
          </span>
        </h1>
        {keywords.length > 0 ? (
          <CategoryBadgeList
            className="text-left text-ellipsis break-words line-clamp-1 mt-[-5px]"
            categories={keywords}
          />
        ) : null}
      </div>
    </div>
  )
}

export default RecipeHeader
