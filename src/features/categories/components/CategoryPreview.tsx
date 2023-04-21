import { useState } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import LordIcon from 'components/atoms/LordIcon'
import { firstLetterUppercase } from 'utils/string'
import Category from '../Category'

interface CategoryPreviewProps {
  category: Category
  active?: boolean
  onClick?: () => void
  className?: string
}

const CategoryPreview: React.FC<CategoryPreviewProps> = ({
  category,
  active,
  onClick,
  className,
}) => {
  const [isHover, setHover] = useState(false)

  const color = onClick && (isHover || active) ? '#111827' : '#6B7280'

  const { t } = useTranslation('categories')

  const title = firstLetterUppercase(t(category.name))

  return (
    <button
      className={classNames(
        'relative flex flex-col items-center pt-2 pb-4 md:pb-5 text-gray-500 transition-all outline-none outline-0',
        {
          'text-gray-900': active,
          'hover:text-gray-900': onClick,
          'cursor-pointer': onClick && !active,
          'cursor-default	': !onClick || active,
        },
        className,
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => {}}
      onClick={onClick}
    >
      <LordIcon
        src={`/icons/${category.image}.json`}
        colors={{
          primary: color,
          secondary: color,
        }}
        size={45}
      />
      <div className="text-2xs font-medium w-16">{title}</div>
      {active ? (
        <div className="absolute left-0 right-0 bottom-1 md:bottom-2 flex justify-center">
          <div className="bg-gray-900 h-[6px] w-[6px] rounded-full" />
        </div>
      ) : // <div className="bg-gray-900 h-[2px] absolute left-1 right-1 bottom-0" />
      null}
    </button>
  )
}

export default CategoryPreview
