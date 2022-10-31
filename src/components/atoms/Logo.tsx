import { CakeIcon } from '@heroicons/react/24/solid'
import { useTranslation } from 'react-i18next'

import usePopup from 'hooks/usePopup'
import AlphaPopup from 'components/organisms/AlphaPopup'

type Props = {
  withoutIcon?: boolean
  withoutTag?: boolean
}

const Logo = ({ withoutIcon = false, withoutTag = false }: Props) => {
  const { t } = useTranslation()

  const alphaPopup = usePopup()

  return (
    <div className="flex items-center 	select-none overflow-visible relative z-50">
      {!withoutIcon && (
        <CakeIcon
          className="h-8 w-8 stroke-1 text-gray-900 mr-1"
          aria-hidden="true"
        />
      )}
      <div className="relative overflow-visible flex items-center">
        <h2 className="text-2xl sm:text-2xl font-bold leading-7 text-gray-900  sm:truncate ">
          {t('_AppName')}
        </h2>
        {!withoutTag && (
          <button
            className="relative ml-0.5 bottom-[-3px] inline-flex items-center rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-medium text-white cursor-pointer"
            onClick={alphaPopup.open}
          >
            {t('_Alpha')}
          </button>
        )}
      </div>
      <AlphaPopup open={alphaPopup.isOpen} onClose={alphaPopup.close} />
    </div>
  )
}

export default Logo
