import classNames from 'classnames'

type Props = {
  className?: string
  children?: React.ReactNode
}

const Container = ({ className, ...props }: Props) => {
  return (
    <div
      className={classNames('max-w-screen-xl m-auto px-4 lg:px-10 ', className)}
      {...props}
    />
  )
}

export default Container
