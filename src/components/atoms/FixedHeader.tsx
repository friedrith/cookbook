import React, { useState, useRef, useMemo } from 'react'

import classNames from 'classnames'
import useEventListener from 'hooks/useEventListener'

export const TopBarContext = React.createContext({ isMaximized: false })

type Props = {
  restRef: React.RefObject<HTMLDivElement>
  children?: (isMaximized: boolean) => React.ReactNode
  onMaximizedChanged?: (isMaximized: boolean) => void
  offset?: number
  className?: string
  maximizedClassName?: string
  disableMaximize?: boolean
}

const FixedHeader = ({
  restRef,
  children,
  onMaximizedChanged = () => {},
  offset = 90,
  className = '',
  disableMaximize = false,
}: Props) => {
  const [isMaximized, setMaximized] = useState(false)

  const onScroll = useMemo(
    () => () => {
      if (ref.current && restRef.current && !disableMaximize) {
        const positionY = ref.current.getBoundingClientRect().top
        const positionY2 = restRef.current.getBoundingClientRect().top
        const isMaximized = positionY > positionY2 - offset
        setMaximized(isMaximized)
        onMaximizedChanged(isMaximized)
      }
    },
    [restRef, onMaximizedChanged, offset, disableMaximize],
  )

  useEventListener('scroll', onScroll)

  const ref = useRef<HTMLInputElement>(null)

  return (
    <div className={classNames(className, 'fixed z-40 top-0 left-0 right-0')}>
      <TopBarContext.Provider value={{ isMaximized }}>
        {children ? children(isMaximized) : null}
      </TopBarContext.Provider>
      <div className="fixed" ref={ref} />
    </div>
  )
}

export default FixedHeader
