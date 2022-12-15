import Container from 'components/atoms/Container'

type Props = {
  children: React.ReactNode
  className?: string
}

const LargeMainPage = ({ children, className }: Props) => {
  return <Container className={`bg-white ${className}`}>{children}</Container>
}

export default LargeMainPage
