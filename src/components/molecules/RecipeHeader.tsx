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
    <div className="flex-1 relative h-full flex items-center">
      <div className="absolute w-full pr-1 pl-2">
        <h1 className="font-bold leading-5 text-gray-900 text-lg lg:text-2xl line-clamp-1 text-left flex flex-col items-center text-ellipsis break-words overflow-hidden">
          <span>
            {recipeName} {children}
          </span>
        </h1>
        {keywords.length > 0 ? (
          <div className="text-left text-ellipsis break-words overflow-hidden line-clamp-1">
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
        ) : null}
      </div>
    </div>
  )
}

export default RecipeHeader
