import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Page from 'components/templates/Page'
import Hero from 'features/landing/components/Hero'
import Header from 'features/landing/components/Header'
import PrimaryFeatures from 'features/landing/components/PrimaryFeatures'
import SecondaryFeatures from 'features/landing/components/SecondaryFeatures'
import CallToAction from 'features/landing/components/CallToAction'
import Footer from 'features/landing/components/Footer'
import Faqs from 'features/landing/components/Faqs'
import rememberScroll from 'utils/services/rememberScroll'

const scroll = rememberScroll()

export const LandingPage = () => {
  const { hash } = useLocation()

  const questionId = hash.slice(1)

  useEffect(() => {
    document.getElementById(questionId)?.scrollIntoView()
  }, [questionId])

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
