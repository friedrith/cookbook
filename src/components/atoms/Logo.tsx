import classNames from 'classnames'
import { useSearchParams } from 'react-router-dom'

import { ReactComponent as LogoIcon } from 'assets/logo.svg'

type Props = {
  className?: string
}

const Logo = ({ className }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams()

  return (
    <LogoIcon
      className={classNames('h-9 cursor-pointer', className)}
      onClick={() => {
        setSearchParams({})
      }}
    />
  )
}

/**
 * E71E4D
 * E21A5F
 * D70466
 */

export default Logo
