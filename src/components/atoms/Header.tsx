import classNames from 'classnames'
import Container from '@/components/atoms/Container'

type Props = {
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
  white?: boolean
}

const Header = ({ children, className, fullWidth, white }: Props) => {
  return (
    <div className={classNames({ 'bg-white shadow': white })}>
      <Container
        fullWidth={fullWidth}
        className={classNames(
          'flex items-center h-16 lg:h-16 justify-between',
          className,
        )}
      >
        {children}
      </Container>
    </div>
  )
}

export default Header
