import { forwardRef, ForwardedRef } from 'react'

type Props = {
  className?: string
  children: React.ReactNode
}

const Box = forwardRef(
  ({ className, children }: Props, ref: ForwardedRef<HTMLDivElement>) => (
    <div className={`bg-white shadow rounded-md ${className}`} ref={ref}>
      {children}
    </div>
  )
)

export default Box
