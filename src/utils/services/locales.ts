// import i18n from 'i18next'
// import { initReactI18next } from 'react-i18next'
// import Backend from 'i18next-http-backend'
// import LanguageDetector from 'i18next-browser-languagedetector'
import Cookies from 'js-cookie'
import languageDetector from 'next-language-detector'

import { enabled } from '@/utils/services/features'

export const languages = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' },
  enabled('farsi') ? { value: 'pes', label: 'Farsi' } : null,
].filter(Boolean) as Array<{ value: string; label: string }>

export const saveLocale = (locale: string) => {
  console.log('saveLocale', locale)
  Cookies.set('i18next', locale, { expires: 2000, path: '/' })
}

export const getLocale = () => Cookies.get('NEXT_LOCALE')

// const getLocales = (str: string, defaultLocale: string | undefined) =>
//   str?.split(',').map(type =>
//     type
//       .split(';')[0]
//       .trim()
//       .replace('*', defaultLocale ?? ''),
//   ) ?? ''

export const getClosestLocale = (req: any, defaultLocale: string | undefined) =>
  req.cookies.NEXT_LOCALE ?? defaultLocale ?? ''

// i18n
//   // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
//   // learn more: https://github.com/i18next/i18next-http-backend
//   // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
//   .use(Backend)
//   // detect user language
//   // learn more: https://github.com/i18next/i18next-browser-languageDetector
//   // .use(LanguageDetector)
//   // pass the i18n instance to react-i18next.
//   .use(initReactI18next)
//   // init i18next
//   // for all options read: https://www.i18next.com/overview/configuration-options
//   .init({
//     ns: ['default'],
//     fallbackLng: 'pes',
//     debug: process.env.NODE_ENV !== 'production',

//     load: 'all',
//     supportedLngs: languages.map(l => l.value),

//     interpolation: {
//       escapeValue: false, // not needed for react as it escapes by default
//     },a
//     backend: {
//       loadPath: `/locales/{{lng}}/{{ns}}.json`,
//     },
//   })

// export default i18n
