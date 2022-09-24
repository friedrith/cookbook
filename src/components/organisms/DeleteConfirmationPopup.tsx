import { ExclamationIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import Modal, { PopupType } from 'components/atoms/Modal'

type Props = {
  open: boolean
  onSubmit: () => void
  onClose: () => void
}

const DeleteConfirmation = ({ open, onClose, onSubmit }: Props) => {
  const { t } = useTranslation()

  return (
    <Modal
      open={open}
      onClose={onClose}
      icon={ExclamationIcon}
      type={PopupType.Warning}
      description={t('_If you leave')}
    >
      <button
        type="button"
        className="mb-3 inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
        onClick={onClose}
      >
        {t('_Cancel')}
      </button>
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
        onClick={onSubmit}
      >
        {t('_Lose my recipe')}
      </button>
    </Modal>
  )
}

export default DeleteConfirmation
