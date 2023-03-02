import Link from 'next/link'

import Badge, { BadgeSize } from '@/components/atoms/Badge'

type Props = {
  className?: string
  keyword: string
  size: BadgeSize
  onChangeQuery?: (query: string) => void
}

const colors = ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'pink']

const sum = (...args: number[]): number =>
  args.length > 0 ? args[0] + sum(...args.slice(1)) : 0

const findColor = (children: string) => {
  const colorIndex =
    sum(...children.split(' ').map(l => l.toUpperCase().charCodeAt(0))) %
    colors.length

  return colors[colorIndex]
}

const ENCODED_HASHTAG = '%23'

const KeywordBadge = ({
  className = '',
  keyword,
  size = BadgeSize.small,
  onChangeQuery = () => {},
  ...props
}: Props) => {
  const foundColor = findColor(keyword)

  return (
    <Link
      key={keyword}
      className={`inline-flex ${className}`}
      href={`/recipes?q=${ENCODED_HASHTAG}${keyword}`}
      onClick={() => onChangeQuery(`#${keyword}`)}
    >
      <Badge
        className={`bg-${foundColor}-100 text-${foundColor}-800`}
        size={size}
        {...props}
      >
        {keyword}
      </Badge>
    </Link>
  )
}

export default KeywordBadge
