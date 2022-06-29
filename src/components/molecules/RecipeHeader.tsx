import React from 'react'

import Badge from 'components/atoms/Badge'

type Props = {
  recipeName: string
  keywords: string[]
  children?: (isMaximized: boolean) => React.ReactNode
}

const RecipeHeader = ({ recipeName, keywords }: Props) => {
  return (
    <div className="p-1 pl-2 pb-4 pt-4 lg:pt-4 flex-1">
      <h1 className="font-bold leading-5 text-gray-900 text-lg lg:text-2xl sm:truncate text-left">
        {recipeName}
      </h1>
      <div className="text-left">
        {keywords.map((keyword) => (
          <Badge key={keyword} className="mr-1">
            {keyword}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default RecipeHeader
