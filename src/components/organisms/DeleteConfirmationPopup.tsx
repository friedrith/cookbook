import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import Modal, { PopupType } from 'components/atoms/Modal'
import Button from 'components/atoms/Button'

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
      icon={ExclamationTriangleIcon}
      type={PopupType.Warning}
      description={t('_If you leave')}
    >
      <Button.Primary className="mb-3 w-full" onClick={onClose}>
        {t('_Cancel')}
      </Button.Primary>
      <Button.Error className="mb-3 w-full" onClick={onSubmit}>
        {t('_Lose my recipe')}
      </Button.Error>
    </Modal>
  )
}

export default DeleteConfirmation
