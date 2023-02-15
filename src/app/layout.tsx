// https://locize.com/blog/next-13-app-dir-i18n/

import { cookies } from 'next/headers'
import { getServerSideLocale } from './i18n/serverSide'
import ServicesWrapper from '@/app/ServicesWrapper'

import './globals.css'

import { fallbackLng } from '@/app/i18n/i18n'

interface Props {
  children: React.ReactNode
  params: {
    locale: string
  }
}

const RootLayout = ({ children }: Props) => {
  const cookieStore = cookies()
  const locale = cookieStore.get('i18next')?.value ?? fallbackLng
  return (
    <html lang={locale}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body dir={locale === 'pes' ? 'rtl' : 'ltr'}>
        <ServicesWrapper serverSideLocale={getServerSideLocale()}>
          {children}
        </ServicesWrapper>
      </body>
    </html>
  )
}

export default RootLayout
