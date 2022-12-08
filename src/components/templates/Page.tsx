import { Helmet } from 'react-helmet'
import React, { useRef, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'
import { useTranslation } from 'react-i18next'

import { isMobile } from 'utils/platforms/mobile'
import useIsStandalonePWA from 'hooks/useIsStandalonePWA'

type Props = {
  className?: string
  children: React.ReactNode
  title?: string
  onScroll?: (number: number) => void
  scroll?: number
  style?: React.CSSProperties
}

const Page = ({
  className = '',
  children,
  title,
  onScroll = () => {},
  scroll = 0,
  style,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, scroll)
    }
  }, [scroll])

  const { t } = useTranslation()

  const isStandalonePWA = useIsStandalonePWA()

  const fullTitle = isStandalonePWA
    ? title
    : `${title ? `${title} - ` : ''}${t('_AppName')}`

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{fullTitle}</title>
      </Helmet>
      <ReactTooltip
        effect="solid"
        getContent={dataTip => dataTip}
        disable={isMobile()}
        backgroundColor="black"
        delayShow={250}
      />
      <div
        className={`relative inset-0 h-full w-screen bg-white overflow-auto scroll-auto select-none z-20	${className}`}
        style={style}
        id="page"
        ref={ref}
        onScroll={() => onScroll(ref.current?.scrollTop || 0)}
      >
        {children}
      </div>
    </>
  )
}

export default Page
