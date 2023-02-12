import ServicesWrapper from '@/app/ServicesWrapper'
import { getServerSideLocale } from './i18n/serverSide'
import NotFound404 from '@/components/views/NotFound404'

export const NotFound = () => {
  return (
    <ServicesWrapper serverSideLocale={getServerSideLocale()}>
      <NotFound404 />
    </ServicesWrapper>
  )
}

export default NotFound
