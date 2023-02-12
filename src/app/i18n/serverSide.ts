import { cookies } from 'next/headers'
import { fallbackLng } from './i18n'

export const getServerSideLocale = () => {
  const cookieStore = cookies()

  return cookieStore.get('i18next')?.value ?? fallbackLng
}
