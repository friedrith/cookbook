import { Link } from 'react-router-dom'

import Badge from 'components/atoms/Badge'

type Props = {
  keywords: string[]
}

const ENCODED_HASHTAG = '%23'

const KeywordList = ({ keywords }: Props) => {
  return (
    <>
      {keywords.map(keyword => (
        <Link
          key={keyword}
          className="mr-1"
          to={`/recipes?q=${ENCODED_HASHTAG}${keyword}`}
        >
          <Badge>{keyword}</Badge>
        </Link>
      ))}
    </>
  )
}

export default KeywordList
