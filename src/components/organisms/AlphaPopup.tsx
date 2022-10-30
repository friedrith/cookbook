import { ShieldCheckIcon } from '@heroicons/react/outline'
import { useTranslation, Trans } from 'react-i18next'

import Modal, { PopupType } from 'components/atoms/Modal'

type Props = {
  open: boolean
  onClose: () => void
}

const AlphaPopup = ({ open, onClose }: Props) => {
  const { t } = useTranslation()

  return (
    <Modal
      open={open}
      onClose={onClose}
      icon={ShieldCheckIcon}
      description={<Trans i18nKey={'_CookBook is in alpha'} />}
      type={PopupType.Warning}
    >
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 sm:text-sm"
        onClick={onClose}
      >
        {t('_Ok Got it')}
      </button>
    </Modal>
  )
}

export default AlphaPopup
