import { CakeIcon } from '@heroicons/react/solid'
import { useTranslation } from 'react-i18next'

const Logo = () => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center pointer-events-none	select-none overflow-visible">
      <CakeIcon
        className="h-8 w-8 stroke-1 text-gray-900 mr-1"
        aria-hidden="true"
      />
      <div className="relative overflow-visible flex items-center">
        <h2 className="text-2xl sm:text-2xl font-bold leading-7 text-gray-900  sm:truncate ">
          {t('_AppName')}
        </h2>
        <span className="relative ml-0.5 bottom-[-3px] inline-flex items-center rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-medium text-white">
          {t('_Beta')}
        </span>
      </div>
    </div>
  )
}

export default Logo
