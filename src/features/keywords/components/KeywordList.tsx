import { BadgeSize } from 'components/atoms/Badge'
import KeywordBadge from 'features/keywords/components/KeywordBadge'

type Props = {
  keywords: string[]
  className?: string
  onChangeQuery?: (query: string) => void
  size?: BadgeSize
}

const KeywordList = ({
  keywords,
  className = '',
  onChangeQuery = () => {},
  size = BadgeSize.small,
}: Props) => {
  return (
    <div className={`text-left rtl:text-right ${className}`}>
      {keywords.map(keyword => (
        <KeywordBadge
          key={keyword}
          className={`${size === BadgeSize.small ? 'mr-1' : 'mr-2'}`}
          size={size}
          keyword={keyword}
          onChangeQuery={onChangeQuery}
        />
      ))}
    </div>
  )
}

export default KeywordList
