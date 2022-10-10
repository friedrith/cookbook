import React, { useState, useRef, useMemo, useLayoutEffect } from 'react'

import classNames from 'utils/classNames'
import useEventListener from 'hooks/useEventListener'

export const TopBarContext = React.createContext({ isMaximized: false })

type Props = {
  restRef: React.RefObject<HTMLDivElement>
  children?: (isMaximized: boolean) => React.ReactNode
  onMaximizedChanged?: (isMaximized: boolean) => void
  offset?: number
}

const TopBar = ({
  restRef,
  children,
  onMaximizedChanged = () => {},
  offset = 90,
}: Props) => {
  const [isMaximized, setMaximized] = useState(false)

  const onScroll = useMemo(
    () => () => {
      if (ref.current && restRef.current) {
        const positionY = ref.current.getBoundingClientRect().top
        const positionY2 = restRef.current.getBoundingClientRect().top
        const isMaximized = positionY > positionY2 - offset
        setMaximized(isMaximized)
        onMaximizedChanged(isMaximized)
      }
    },
    [restRef, onMaximizedChanged, offset]
  )

  const [page, setPage] = useState<HTMLElement | null>(null)

  useLayoutEffect(() => {
    setPage(document.getElementById('page'))
  }, [])

  useEventListener('scroll', onScroll, page)

  const ref = useRef<HTMLInputElement>(null)

  return (
    <div
      className={classNames(
        'fixed z-40 top-0 left-0 right-0 px-4 lg:px-10 pointer-events-none',
        isMaximized ? 'bg-white shadow' : ''
      )}
    >
      <div className="max-w-screen-xl m-auto flex items-center h-16 lg:h-20">
        <TopBarContext.Provider value={{ isMaximized }}>
          {children ? children(isMaximized) : null}
        </TopBarContext.Provider>
      </div>
      <div className="fixed" ref={ref} />
    </div>
  )
}

export default TopBar
