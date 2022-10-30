import { Helmet } from 'react-helmet'
import { useRef, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'
import { useTranslation } from 'react-i18next'

import { isMobile } from 'utils/platforms/mobile'
import useIsStandalonePWA from 'hooks/useIsStandalonePWA'

type Props = {
  className?: string
  children: React.ReactNode
  title?: string
}

const Page = ({ className = '', children, title }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, 0)
    }
  }, [])

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
        className={`relative inset-0 h-full w-screen bg-white overflow-auto scroll-auto select-none	${className}`}
        id="page"
        ref={ref}
      >
        {children}
      </div>
    </>
  )
}

export default Page
