import classNames from 'classnames'
import Container from 'components/atoms/Container'

type Props = {
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
}

const Header = ({ children, className, fullWidth }: Props) => {
  return (
    <Container
      fullWidth={fullWidth}
      className={classNames(
        'flex items-center h-16 lg:h-16 justify-between',
        className
      )}
    >
      {children}
    </Container>
  )
}

export default Header
