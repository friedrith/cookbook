import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Badge, { BadgeSize } from '~/src/components/atoms/Badge'

type Props = {
  className?: string
  category: string
  size: BadgeSize
  onChangeQuery: (query: string) => void
}

const colors = ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'pink']

const sum = (...args: number[]): number =>
  args.length > 0 ? args[0] + sum(...args.slice(1)) : 0

const findRandomColor = (words: string) => {
  const colorIndex =
    sum(...words.split(' ').map(w => w.toUpperCase().charCodeAt(0))) %
    colors.length

  return colors[colorIndex]
}

const ENCODED_HASHTAG = '%23'

const CategoryBadge: React.FC<Props> = ({
  className = '',
  category,
  size = BadgeSize.small,
  onChangeQuery,
}) => {
  const foundColor = findRandomColor(category)

  const { t } = useTranslation('categories')

  return (
    <Link
      className={`inline-flex ${className}`}
      to={`/recipes?q=${ENCODED_HASHTAG}${category}`}
      onClick={() => onChangeQuery(`#${category}`)}
    >
      <Badge
        className={`bg-${foundColor}-100 text-${foundColor}-800`}
        size={size}
      >
        {t(category)}
      </Badge>
    </Link>
  )
}

export default CategoryBadge
