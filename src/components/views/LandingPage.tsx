import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Page from 'components/templates/Page'
import Hero from 'components/organisms/Landing/Hero'
import Header from 'components/organisms/Landing/Header'
import PrimaryFeatures from 'components/organisms/Landing/PrimaryFeatures'
import SecondaryFeatures from 'components/organisms/Landing/SecondaryFeatures'
import CallToAction from 'components/organisms/Landing/CallToAction'
import Footer from 'components/organisms/Landing/Footer'
import Faqs from 'components/organisms/Landing/Faqs'
import rememberScroll from 'utils/rememberScroll'

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
