import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Page from '~/src/components/templates/Page'
import Hero from '~/src/features/landing/components/Hero'
import Header from '~/src/features/landing/components/Header'
import PrimaryFeatures from '~/src/features/landing/components/PrimaryFeatures'
import SecondaryFeatures from '~/src/features/landing/components/SecondaryFeatures'
import CallToAction from '~/src/features/landing/components/CallToAction'
import Footer from '~/src/features/landing/components/Footer'
import Faqs from '~/src/features/landing/components/Faqs'
import rememberScroll from '~/src/utils/services/rememberScroll'

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
