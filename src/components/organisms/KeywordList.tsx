import { Link } from 'react-router-dom'

import Badge from 'components/atoms/Badge'

type Props = {
  keywords: string[]
  className?: string
  onChangeQuery?: (query: string) => void
}

const ENCODED_HASHTAG = '%23'

const KeywordList = ({
  keywords,
  className = '',
  onChangeQuery = () => {},
}: Props) => {
  return (
    <div className={`text-left ${className}`}>
      {keywords.map(keyword => (
        <Link
          key={keyword}
          className="mr-1 inline-flex"
          to={`/recipes?q=${ENCODED_HASHTAG}${keyword}`}
          onClick={() => onChangeQuery(`#${keyword}`)}
        >
          <Badge>{keyword}</Badge>
        </Link>
      ))}
    </div>
  )
}

export default KeywordList
