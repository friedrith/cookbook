import React from 'react'
import { Link } from 'react-router-dom'

import Badge from 'components/atoms/Badge'

type Props = {
  recipeName: string
  keywords: string[]
  children?: React.ReactNode
}

const RecipeHeader = ({ recipeName, children, keywords }: Props) => {
  return (
    <div className="p-1 pl-2 pb-4 pt-4 flex-1 ">
      <h1 className="font-bold leading-5 text-gray-900 text-lg lg:text-2xl sm:truncate text-left flex items-center">
        {recipeName} {children}
      </h1>
      <div className="text-left">
        {keywords.map(keyword => (
          <Link
            key={keyword}
            className="mr-1 pointer-events-auto"
            to={`/recipes?q=${keyword}`}
          >
            <Badge key={keyword} className="mr-1">
              {keyword}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RecipeHeader
