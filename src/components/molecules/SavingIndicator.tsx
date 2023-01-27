import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

type Props = {
  className?: string
}

const Saved = ({ className }: Props) => {
  const { t } = useTranslation()

  return (
    <span
      className={classNames(
        'inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800',
        className,
      )}
    >
      <svg
        className="-ml-1 mr-1.5 h-2 w-2 text-yellow-800"
        fill="currentColor"
        viewBox="0 0 8 8"
      >
        <circle cx="4" cy="4" r="3" />
      </svg>
      {t('_Saving')}
    </span>
  )
}

export default Saved
