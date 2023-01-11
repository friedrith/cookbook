import { Link } from 'react-router-dom'

import Badge, { BadgeSize } from 'components/atoms/Badge'

type Props = {
  keywords: string[]
  className?: string
  onChangeQuery?: (query: string) => void
  size?: BadgeSize
}

const ENCODED_HASHTAG = '%23'

const KeywordList = ({
  keywords,
  className = '',
  onChangeQuery = () => {},
  size = BadgeSize.small,
}: Props) => {
  return (
    <div className={`text-left rtl:text-right ${className}`}>
      {keywords.map(keyword => (
        <Link
          key={keyword}
          className="mr-1 inline-flex"
          to={`/recipes?q=${ENCODED_HASHTAG}${keyword}`}
          onClick={() => onChangeQuery(`#${keyword}`)}
        >
          <Badge size={size}>{keyword}</Badge>
        </Link>
      ))}
    </div>
  )
}

export default KeywordList
