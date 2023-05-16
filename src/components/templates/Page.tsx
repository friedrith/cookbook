import React, { useEffect } from 'react'
import ReactTooltip from 'react-tooltip'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import { isMobile } from '~/src/utils/platforms/mobile'
import useIsStandalonePWA from '~/src/hooks/useIsStandalonePWA'
import useEventListener from '~/src/hooks/useEventListener'

type Props = {
  className?: string
  children: React.ReactNode
  title?: string
  onScroll?: (number: number) => void
  scroll?: number
  style?: React.CSSProperties
}

const browserTabTitle = (title: string | undefined, appName: string) => {
  const cleanTitle = title ?? ''
  const separator = title ? ` - ` : ``

  return `${cleanTitle}${separator}${appName}`
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
    ? t('_AppName')
    : browserTabTitle(title, t('_AppName'))

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
        className={`relative bg-white scroll-auto select-none z-20	${className}`}
        style={style}
        id="page"
      >
        {children}
      </div>
    </>
  )
}

export default Page
