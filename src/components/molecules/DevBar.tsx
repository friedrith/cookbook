import { useTranslation } from 'react-i18next'

const DevBar = () => {
  const { t } = useTranslation()
  return (
    <div className="fixed z-50 top-20 right-5">
      <button onClick={() => window.location.reload()}>{t('_Refresh')}</button>
    </div>
  )
}

export default DevBar
