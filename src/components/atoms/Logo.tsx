import classNames from 'classnames'

import { ReactComponent as LogoIcon } from 'assets/logo.svg'

type Props = {
  className?: string
}

const Logo = ({ className }: Props) => {
  return <LogoIcon className={classNames('h-9', className)} />
}

/**
 * E71E4D
 * E21A5F
 * D70466
 */

export default Logo
