import { BadgeSize } from '~/src/components/atoms/Badge'
import CategoryBadge from './CategoryBadge'

type Props = {
  categories: string[]
  className?: string
  onChangeQuery?: (query: string) => void
  size?: BadgeSize
}

const KeywordList = ({
  categories,
  className = '',
  onChangeQuery = () => {},
  size = BadgeSize.small,
}: Props) => {
  return (
    <div className={`text-left rtl:text-right ${className}`}>
      {categories.map(category => (
        <CategoryBadge
          key={category}
          className={`${size === BadgeSize.small ? 'mr-1' : 'mr-2'}`}
          size={size}
          category={category}
          onChangeQuery={onChangeQuery}
        />
      ))}
    </div>
  )
}

export default KeywordList
