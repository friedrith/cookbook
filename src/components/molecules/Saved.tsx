import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { CheckIcon } from '@heroicons/react/outline'

type Props = {
  className?: string
}

const Saved = ({ className }: Props) => {
  const { t } = useTranslation()

  return (
    <span
      className={classNames(
        'font-normal !text-xs !text-white px-1 py-0.5 bg-lime-600 rounded-sm inline-flex items-center',
        className
      )}
    >
      {t('_Saved')}
      <CheckIcon className="h-4 w-4 ml-1" aria-hidden="true" />
    </span>
  )
}

export default Saved
