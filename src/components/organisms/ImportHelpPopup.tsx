import { useTranslation } from 'react-i18next'

import Modal from 'components/atoms/Modal'
import { useAppSelector } from 'hooks/redux'
import { getOfficialWebsites } from 'store/officialWebsites'
import Button from 'components/atoms/Button'

type Props = {
  open: boolean
  onClose: () => void
}

const ImportHelpPopup = ({ open, onClose }: Props) => {
  const { t } = useTranslation()
  const officialWebsites = useAppSelector(getOfficialWebsites)

  return (
    <Modal
      open={open}
      onClose={onClose}
      description={
        <>
          {t(
            'CookBook officially support recipe import from the following websites'
          )}
          <div className="overflow-auto h-96 p-1 my-3">
            <ul className="ml-10 my-1">
              {officialWebsites.map((w: string) => (
                <li key={w}>
                  <a
                    className="text-indigo-600 hover:text-primary-500"
                    href={`https://${w}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {w}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {t(
            'However import from other websites containing recipes might work too. If your recipe was not imported successfully, let us know by write a '
          )}
          <a
            className="text-indigo-600 hover:text-primary-500"
            href="https://github.com/friedrith/cookbook/issues/new?assignees=&labels=issue%3A+proposal%2C+needs+triage&template=proposal.md"
            target="_blank"
            rel="noreferrer"
          >
            {t('proposal')}
          </a>
          {t(' or contact us at ')}
          <a
            className="text-indigo-600 hover:text-primary-500"
            href="mailto:thibault.friedrich@gmail.com"
            target="_blank"
            rel="noreferrer"
            // eslint-disable-next-line i18next/no-literal-string
          >
            thibault.friedrich@gmail.com
          </a>
        </>
      }
      title={t('import.Import from a recipe catalog')}
    >
      <div>
        <Button.Black className="w-full" onClick={onClose}>
          {t('_Ok Got it')}
        </Button.Black>
      </div>
    </Modal>
  )
}

export default ImportHelpPopup
