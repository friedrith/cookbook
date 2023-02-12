// https://locize.com/blog/next-13-app-dir-i18n/

import i18next from 'i18next'
import { cookies } from 'next/headers'

import './globals.css'

import { fallbackLng, initI18Next } from '@/app/i18n/i18n'

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
      <body dir={locale === 'pes' ? 'rtl' : 'ltr'}>{children}</body>
    </html>
  )
}

export default RootLayout
