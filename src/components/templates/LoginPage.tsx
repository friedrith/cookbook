import { useTranslation } from 'react-i18next'

import Page from './Page'

import BackButton from '~/src/components/molecules/BackButton'
import PortalLayout from '~/src/components/templates/PortalLayout'

type Props = {
  children: React.ReactNode
  title: string
  description?: React.ReactNode
}

const LoginPage = ({ children, title, description }: Props) => {
  const { t } = useTranslation()

  return (
    <Page title={title}>
      <PortalLayout>
        <BackButton
          url="/"
          className="fixed top-5 left-5 lg:top-10 lg:left-10"
          title={t('_Back to landing page')}
        />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{title}</h2>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        <div className="mt-8">{children}</div>
      </PortalLayout>
    </Page>
  )
}

export default LoginPage
