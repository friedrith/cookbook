import { useTranslation } from 'react-i18next'

import WorkInProgressPrage from 'components/templates/WorkInProgressPage'

const Help = () => {
  const { t } = useTranslation()

  return <WorkInProgressPrage title={t('_Help')} />
}

export default Help
