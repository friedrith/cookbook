import LandingPage from '@/components/views/LandingPage'

import { getServerSideLocale } from './i18n/serverSide'
import ServicesWrapper from '@/app/ServicesWrapper'

const IndexPage = () => {
  return (
    <ServicesWrapper serverSideLocale={getServerSideLocale()}>
      <LandingPage />
    </ServicesWrapper>
  )
}

export default IndexPage
