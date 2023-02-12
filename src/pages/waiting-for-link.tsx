import { useTranslation, Trans } from 'react-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'react-i18next/serverSideTranslations'

import LoginPage from '@/components/templates/LoginPage'
import useIsStandalonePWA from '@/hooks/useIsStandalonePWA'
import { isIpad } from '@/utils/platforms/mobile'
import StandaloneLinkValidation from '@/components/organisms/StandaloneLinkValidation'
import { useOnLoggedInAnotherTab } from '@/features/recipes/utils/broadcast'
import { getClosestLocale } from '@/utils/services/locales'

interface Props {
  email: string
}

const WaitingForLink = ({ email }: Props) => {
  const { t } = useTranslation()

  const isStandalone = useIsStandalonePWA()

  useOnLoggedInAnotherTab(() => {
    window.location.reload()
  })

  return (
    <LoginPage title={t('_Waiting for link')}>
      <div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          {t('login._An email on its way')}
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          {isStandalone && isIpad() ? (
            <>
              <Trans i18nKey="_We sent an email.pwa" values={{ email }} />
              <StandaloneLinkValidation />
            </>
          ) : (
            <Trans i18nKey="_We sent an email" values={{ email }} />
          )}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {t('_This link will expire 24 hours.')}
        </p>
      </div>
    </LoginPage>
  )
}

// https://stackoverflow.com/questions/69101425/can-you-forward-a-locale-to-a-language-in-nextjs-i18n
// https://stackoverflow.com/questions/67502005/how-to-force-next-js-to-always-redirect-to-a-preferred-user-language
export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  locale,
  defaultLocale,
}) => {
  const closestLocale = getClosestLocale(req, defaultLocale)

  const { email } = query

  return {
    props: {
      email,
      ...(await serverSideTranslations(closestLocale, [
        'common',
        'marketing',
        'faq',
        'help',
      ])),
      // Will be passed to the page component as props
    },
  }
}

export default WaitingForLink
