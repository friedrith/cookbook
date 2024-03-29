import { CogIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import Modal, { PopupType } from '~/src/components/atoms/Modal'
import Settings from '~/src/components/organisms/Settings'

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
      icon={CogIcon}
      title={t('_settings')}
      type={PopupType.Black}
    >
      <Settings />
    </Modal>
  )
}

export default SettingsPopup
