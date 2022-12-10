import { ReactComponent as LogoIcon } from 'assets/logo.svg'

type Props = {
  className?: string
  withoutIcon?: boolean
  withoutTag?: boolean
}

const Logo = ({ className }: Props) => {
  return <LogoIcon className="h-8" />
}

/**
 * E71E4D
 * E21A5F
 * D70466
 */

export default Logo
