import { UserCircleIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import Modal, { PopupType } from 'components/atoms/Modal'
import Settings from 'components/organisms/Settings'

type Props = {
  open: boolean
  onClose: () => void
}

const SettingsPopup = ({ open, onClose }: Props) => {
  const { t } = useTranslation()

  return (
    <Modal
      open={open}
      onClose={onClose}
      icon={UserCircleIcon}
      title={t('_Settings')}
      type={PopupType.Black}
    >
      <Settings />
    </Modal>
  )
}

export default SettingsPopup
