import { useTranslation } from 'react-i18next'

import Footer from 'components/atoms/Footer'
import Page from 'components/templates/Page'

export const FaqPage = () => {
  const { t } = useTranslation()
  return (
    <Page className={`bg-blue-500`}>
      {t('_FAQ')}
      <Footer />
    </Page>
  )
}

export default FaqPage
