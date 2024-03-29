import { useTranslation } from 'react-i18next'

export type Action = {
  label: string
  onClick: () => void
}

type Props = {
  message: string
  actions: Action[]
  onClose: () => void
}

const Notification = ({ message, actions, onClose }: Props) => {
  const { t } = useTranslation()
  return (
    <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="p-4">
        <div className="flex items-center">
          <div className="flex w-0 flex-1 justify-between">
            <p className="w-0 flex-1 text-sm font-medium text-gray-400">
              {message}
            </p>
            {actions.map(({ label, onClick }) => (
              <button
                type="button"
                className="ml-3 flex-shrink-0 rounded-md bg-gray-900 text-sm font-medium text-white hover:text-gray-300"
                onClick={onClick}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              type="button"
              className="inline-flex rounded-md bg-gray-900 hover:bg-gray-800 text-gray-400 focus:text-white"
              onClick={onClose}
            >
              <span className="sr-only">{t('notifications.Close')}</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notification
