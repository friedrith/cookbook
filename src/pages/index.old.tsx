import { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'react-i18next/serverSideTranslations'

import { isWindowDefined } from '@/utils/platforms/window'
import Page from '@/components/templates/Page'
import Hero from '@/features/marketing/components/Landing/Hero'
import Header from '@/features/marketing/components/Landing/Header'
import PrimaryFeatures from '@/features/marketing/components/Landing/PrimaryFeatures'
import SecondaryFeatures from '@/features/marketing/components/Landing/SecondaryFeatures'
import CallToAction from '@/features/marketing/components/Landing/CallToAction'
import Footer from '@/features/marketing/components/Landing/Footer'
import Faqs from '@/features/marketing/components/Landing/Faqs'
import rememberScroll from '@/utils/services/rememberScroll'
import { getClosestLocale, getLocale } from '@/utils/services/locales'

const scroll = rememberScroll()

const useScrollToHash = () => {
  useEffect(() => {
    if (isWindowDefined()) {
      document.getElementById(window.location.hash)?.scrollIntoView()
    }
  }, [])
}

const LandingPage = () => {
  useScrollToHash()

  return (
    <Page scroll={scroll.scroll} onScroll={v => scroll.onScroll(v)}>
      <Header />
      <Hero />
      <PrimaryFeatures />
      <SecondaryFeatures />
      <CallToAction />
      <Faqs />
      <Footer />
    </Page>
  )
}

export default LandingPage
