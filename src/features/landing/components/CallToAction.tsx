import { useTranslation } from 'react-i18next'

import Container from 'components/atoms/Container'
import CircleBackground from 'components/atoms/CircleBackground'
import Button from 'components/atoms/Button'
import { getCurrentUser } from 'store'
import { useAppSelector } from 'hooks/redux'

const CallToAction = () => {
  const { t } = useTranslation('marketing')

  const user = useAppSelector(getCurrentUser)

  return (
    <section
      id="get-free-shares-today"
      className="relative overflow-hidden bg-gray-900 py-20 sm:py-28"
    >
      <div className="absolute top-1/2 left-20 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
        <CircleBackground color="#fff" className="animate-spin-slower" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-md sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            {t('Add your first recipe today')}
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            {t('It takes 30 seconds')}
          </p>
          <div className="mt-8 flex justify-center">
            <Button.Primary
              className="px-5 py-3"
              to={user ? '/recipes' : '/login'}
            >
              {t('Try')}
            </Button.Primary>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default CallToAction
