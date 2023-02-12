import i18n from 'i18next'

import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'

import { enabled } from '@/utils/services/features'

export const languages = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' },
  enabled('farsi') ? { value: 'pes', label: 'Farsi' } : null,
].filter(Boolean) as Array<{ value: string; label: string }>

export const fallbackLng = 'en'

let initialized = false

export const useInitI18n = (locale: string = '') => {
  if (initialized) return
  console.log('initialized', locale)

  initialized = true

  i18n
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`),
      ),
    )
    // pass the i18n instance to react-i18next.
    // .use(initReactI18next) // we don't initialize because should not be initialized on backend side
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      ns: ['common'],
      fallbackLng: locale ?? 'en',
      lng: locale ?? '',
      debug: false && process.env.NODE_ENV !== 'production',
      load: 'all',
      supportedLngs: languages.map(l => l.value),

      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      // backend: {
      //   loadPath: `/locales/{{lng}}/{{ns}}.json`,
      // },
    })
}

export default i18n
