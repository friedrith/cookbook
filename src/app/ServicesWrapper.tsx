'use client'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

import i18n, { useInitI18n } from '@/app/i18n/i18n'
import store from '@/store'

interface Props {
  serverSideLocale: string
  children: React.ReactNode
}

/**
 * https://clerk.dev/docs/nextjs/v13-beta
 * @param param0
 * @returns
 */

const ServicesWrapper = ({ serverSideLocale, children }: Props) => {
  useInitI18n(serverSideLocale)

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>{children}</Provider>
    </I18nextProvider>
  )
}

export default ServicesWrapper
