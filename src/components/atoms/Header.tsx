import classNames from 'classnames'
import Container from 'components/atoms/Container'

type Props = {
  children: React.ReactNode
  className?: string
}

const Header = ({ children, className }: Props) => {
  return (
    <Container
      className={classNames(
        'flex items-center h-16 lg:h-20 justify-between',
        className
      )}
    >
      {children}
    </Container>
  )
}

export default Header
