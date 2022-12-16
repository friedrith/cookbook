import classNames from 'classnames'

import useFullWidth from 'hooks/useFullWidth'

type Props = {
  className?: string
  children?: React.ReactNode
}

const Container = ({ className, ...props }: Props) => {
  const isFullWidth = useFullWidth()

  return (
    <div
      className={classNames(
        'px-4 lg:px-10',
        { 'max-w-screen-xl m-auto': !isFullWidth },
        className
      )}
      {...props}
    />
  )
}

export default Container
