import classNames from 'classnames'
import { useSearchParams } from 'react-router-dom'

import logo from '~/src/assets/logo.svg'
import logoRtl from '~/src/assets/logo-rtl.svg'

type Props = {
  className?: string
}

const Logo = ({ className }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams()

  return (
    <img
      src={
        document.getElementsByTagName('body')?.[0].dir === 'rtl'
          ? logoRtl
          : logo
      }
      className={classNames('h-9 cursor-pointer', className)}
      onClick={() => {
        setSearchParams({})
      }}
      alt="logo"
      data-testid="logo"
    />
  )
}

/**
 * E71E4D
 * E21A5F
 * D70466
 */

export default Logo
