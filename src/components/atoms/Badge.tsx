import classNames from 'classnames'

export enum BadgeSize {
  small,
  large,
}

export type Props = {
  className?: string
  children?: React.ReactNode | string
  size?: BadgeSize
  onClick?: () => void
}

const Badge = ({
  className = '',
  children,
  size = BadgeSize.small,
  onClick = () => {},
}: Props) => {
  return (
    <div
      role="link"
      onKeyDown={() => {}}
      onClick={onClick}
      tabIndex={0}
      className={classNames(
        `flex flex-initial items-center px-2 py-0.5 rounded font-medium ${className} -events-auto`,
        size === BadgeSize.small ? `text-xs` : `text-sm md:text-xs`
      )}
    >
      {children}
    </div>
  )
}

export default Badge
