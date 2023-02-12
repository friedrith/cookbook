import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { appWithTranslation, useTranslation } from 'react-i18next'
import { Provider } from 'react-redux'

import wrapper from '@/store'

import config from '../../react-i18next.config'

import '@/utils/services/i18n'

import '@/styles/globals.css'
import { getLocale } from '@/utils/services/locales'

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props

  const { i18n } = useTranslation()

  const dir = i18n.dir()

  useEffect(() => {
    document.body.dir = dir
  }, [dir])

  const locale = getLocale()

  console.log('locale', locale, i18n.language)

  useEffect(() => {
    document.documentElement.setAttribute('lang', locale ?? '')
    console.log('language', locale)
  }, [locale])

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default appWithTranslation(App)
