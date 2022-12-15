import Container from 'components/atoms/Container'
import { useTranslation } from 'react-i18next'
import FeaturesDesktop from './FeaturesDesktop'
import FeaturesMobile from './FeaturesMobile'

const PrimaryFeatures = () => {
  const { t } = useTranslation('marketing')

  return (
    <section
      id="features"
      aria-label="Features for investing all your money"
      className="bg-gray-900 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
          <h2 className="text-3xl font-medium tracking-tight text-white">
            {t('Every feature you need to be a real chief.')}
          </h2>
          <p className="mt-2 text-lg text-gray-400 leading-8">
            {t('CookBook was designed')}
          </p>
        </div>
      </Container>
      <div className="mt-16 md:hidden">
        <FeaturesMobile />
      </div>
      <Container className="hidden md:mt-20 md:block">
        <FeaturesDesktop />
      </Container>
    </section>
  )
}

export default PrimaryFeatures
