import { useTranslation } from 'react-i18next'
import {
  LifebuoyIcon,
  BugAntIcon,
  ChatBubbleBottomCenterTextIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import { CakeIcon } from '@heroicons/react/24/solid'

import Modal from 'components/atoms/Modal'
import Logo from 'components/atoms/Logo'
import p from '../../../package.json'

type Props = {
  open: boolean
  onClose: () => void
}

const resources = [
  {
    name: 'Help Center',
    description: 'Get all of your questions answered in our FAQ.',
    href: '/faq',
    icon: LifebuoyIcon,
  },
  {
    name: 'Report a bug',
    description: 'Help us to understand your situation and fix it.',
    href: 'https://github.com/friedrith/cookbook/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBug%5D%3A+',
    icon: BugAntIcon,
    blank: true,
  },
  {
    name: 'Suggest a feature',
    description: 'Tell us what is missing and how we can improve CookBook.',
    href: 'https://github.com/friedrith/cookbook/issues/new?assignees=&labels=issue%3A+proposal%2C+needs+triage&template=proposal.md',
    icon: SparklesIcon,
    blank: true,
  },
  {
    name: 'Contact us',
    description:
      'You can send an email at <a class="text-indigo-500 text-bold" href="mailto:thibault.friedrich@gmail.com">thibault.friedrich@gmail.com</a>',
    href: 'mailto:thibault.friedrich@gmail.com',
    icon: ChatBubbleBottomCenterTextIcon,
  },
]

const HelpPopup = ({ open, onClose }: Props) => {
  const { t } = useTranslation()

  return (
    <Modal
      title={
        <div className="flex flex-col items-center justify-center">
          <CakeIcon
            className="h-8 w-8 stroke-1 text-gray-900 mr-1"
            aria-hidden="true"
          />
          <Logo withoutIcon withoutTag />
        </div>
      }
      open={open}
      onClose={onClose}
      description={t('_Version', { version: p.version })}
    >
      <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
        {resources.map(item => (
          <a
            key={item.name}
            href={item.href}
            className="-m-3 flex items-start rounded-lg p-3 transition duration-150 ease-in-out hover:bg-gray-50"
            target="_blank"
            rel="noreferrer"
          >
            <item.icon
              className="h-6 w-6 flex-shrink-0 text-indigo-600"
              aria-hidden="true"
            />
            <div className="ml-4">
              <p className="text-base font-medium text-gray-900">{item.name}</p>
              <p
                className="mt-1 text-sm text-gray-500"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          </a>
        ))}
      </div>
    </Modal>
  )
}

export default HelpPopup
