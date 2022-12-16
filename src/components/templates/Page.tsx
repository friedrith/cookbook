import { Helmet } from 'react-helmet'
import React, { useEffect } from 'react'
import ReactTooltip from 'react-tooltip'
import { useTranslation } from 'react-i18next'

import { isMobile } from 'utils/platforms/mobile'
import useIsStandalonePWA from 'hooks/useIsStandalonePWA'
import useEventListener from 'hooks/useEventListener'

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
  useEffect(() => {
    window.scrollTo(0, scroll)
  }, [scroll])

  useEventListener('scroll', () => {
    onScroll(window.scrollY || 0)
  })

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
        className={`relative bg-white overflow-auto scroll-auto select-none z-20	${className}`}
        style={style}
        id="page"
      >
        {children}
      </div>
    </>
  )
}

export default Page
