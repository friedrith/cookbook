import React, { useState, useRef, useMemo } from 'react'

import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/outline'

import classNames from 'utils/classNames'
import useEventListener from 'hooks/useEventListener'

type Props = {
  restRef: React.RefObject<HTMLDivElement>
  children?: (isMaximized: boolean) => React.ReactNode
  backButtonUrl?: string
}

const TopBar = ({ backButtonUrl, restRef, children }: Props) => {
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
        {backButtonUrl && (
          <Link
            className={classNames(
              'p-2 text-base font-medium text-gray-900 hover:text-gray-900 flex h-15 w-15 items-center cursor-pointer mt-4 lg:mt-6',
              isMaximized ? '' : 'bg-white shadow rounded-md'
            )}
            to={backButtonUrl}
          >
            <ArrowLeftIcon className="h-7 w-7" aria-hidden="true" />
          </Link>
        )}
        {children ? children(isMaximized) : null}
        <div ref={ref} />
      </div>
    </div>
  )
}

export default TopBar
