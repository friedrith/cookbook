import React, { useState, useRef, useMemo } from 'react'

import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/outline'

import Badge from 'components/atoms/Badge'
import classNames from 'utils/classNames'
import useEventListener from 'hooks/useEventListener'

type Props = {
  recipeName: string
  keywords: string[]
  restRef: React.RefObject<HTMLDivElement>
  children?: (isMaximized: boolean) => React.ReactNode
}

const TopBar = ({ recipeName, keywords, restRef, children }: Props) => {
  const [isMaximized, setMaximized] = useState(false)

  const onScroll = useMemo(
    () => () => {
      if (ref.current && restRef.current) {
        const positionY = ref.current.getBoundingClientRect().top
        const positionY2 = restRef.current.getBoundingClientRect().top
        const isMaximized = positionY > positionY2 - 20
        setMaximized(isMaximized)
      }
    },
    [restRef]
  )

  useEventListener('scroll', onScroll)

  const ref = useRef<HTMLInputElement>(null)

  return (
    <div
      className={classNames(
        'fixed top-0 left-0 right-0 px-4 lg:px-10 z-20',
        isMaximized ? 'bg-white shadow' : ''
      )}
    >
      <div className="max-w-screen-xl m-auto flex items-start">
        <Link
          className={classNames(
            'p-2 text-base font-medium text-gray-900 hover:text-gray-900 flex h-15 w-15 items-center cursor-pointer mt-4 lg:mt-6 bg-white rounded-md',
            isMaximized ? '' : 'shadow '
          )}
          to="/recipes"
        >
          <ArrowLeftIcon className="h-7 w-7" aria-hidden="true" />
        </Link>
        {isMaximized && (
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
        )}
        {children ? children(isMaximized) : null}
        <div ref={ref} />
      </div>
    </div>
  )
}

export default TopBar
