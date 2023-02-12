import classNames from 'classnames'
import { useRouter } from 'next/navigation'

type Props = {
  className?: string
}

const Logo = ({ className }: Props) => {
  const router = useRouter()

  return (
    <img
      src="/images/logo.svg"
      className={classNames('h-9 cursor-pointer', className)}
      onClick={() => {
        router.push('/recipes')
      }}
      alt="logo"
    />
    // <LogoIcon
    //   className={classNames('h-9 cursor-pointer', className)}
    //   onClick={() => {
    //     setSearchParams({})
    //   }}
    // />
  )
}

/**
 * E71E4D
 * E21A5F
 * D70466
 */

export default Logo
