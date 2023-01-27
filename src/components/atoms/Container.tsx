import classNames from 'classnames'

type Props = {
  className?: string
  children?: React.ReactNode
  fullWidth?: boolean
}

const Container = ({ className, fullWidth, ...props }: Props) => {
  return (
    <div
      className={classNames(
        'px-4 lg:px-16',
        { 'max-w-screen-xl m-auto': !fullWidth },
        className,
      )}
      {...props}
    />
  )
}

export default Container
