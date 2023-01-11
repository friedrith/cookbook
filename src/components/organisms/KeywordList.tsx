import { Link } from 'react-router-dom'

import Badge from 'components/atoms/Badge'

type Props = {
  keywords: string[]
  className?: string
}

const ENCODED_HASHTAG = '%23'

const KeywordList = ({ keywords, className = '' }: Props) => {
  return (
    <div className={`text-left ${className}`}>
      {keywords.map(keyword => (
        <Link
          key={keyword}
          className="mr-1 inline-flex"
          to={`/recipes?q=${ENCODED_HASHTAG}${keyword}`}
        >
          <Badge>{keyword}</Badge>
        </Link>
      ))}
    </div>
  )
}

export default KeywordList
