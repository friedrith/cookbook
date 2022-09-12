import { forwardRef, ForwardedRef } from 'react'

type Props = {
  className?: string
  children: React.ReactNode
  style?: object
}

const Box = forwardRef(
  (
    { className, children, style = {} }: Props,
    ref: ForwardedRef<HTMLDivElement>
  ) => (
    <div
      className={`bg-white shadow rounded-md ${className}`}
      ref={ref}
      style={style}
    >
      {children}
    </div>
  )
)

export default Box
