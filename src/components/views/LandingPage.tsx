import Page from 'components/templates/Page'
import Hero from 'components/organisms/Landing/Hero'
import Header from 'components/organisms/Landing/Header'
import PrimaryFeatures from 'components/organisms/Landing/PrimaryFeatures'
import SecondaryFeatures from 'components/organisms/Landing/SecondaryFeatures'
import CallToAction from 'components/organisms/Landing/CallToAction'
import Footer from 'components/organisms/Landing/Footer'
import rememberScroll from 'utils/rememberScroll'

const scroll = rememberScroll()

export const LandingPage = () => {
  return (
    <Page scroll={scroll.scroll} onScroll={v => scroll.onScroll(v)}>
      <Header />
      <Hero />
      <PrimaryFeatures />
      <SecondaryFeatures />
      <CallToAction />
      <Footer />
    </Page>
  )
}

export default LandingPage
