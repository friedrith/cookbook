import { useTranslation } from 'react-i18next'

import usePopup from 'hooks/usePopup'
import AlphaPopup from 'components/organisms/AlphaPopup'

type Props = {
  withoutIcon?: boolean
  withoutTag?: boolean
}

const AlphaTag = ({ withoutIcon = false, withoutTag = true }: Props) => {
  const { t } = useTranslation()

  const alphaPopup = usePopup()

  return (
    <>
      <button
        className="relative ml-0.5 bottom-[-10px] inline-flex items-center rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-medium text-white cursor-pointer"
        onClick={alphaPopup.open}
      >
        {t('_Alpha')}
      </button>
      <AlphaPopup open={alphaPopup.isOpen} onClose={alphaPopup.close} />
    </>
  )
}

/**
 * E71E4D
 * E21A5F
 * D70466
 */

export default AlphaTag
