export interface TransitionProps {
  className: string
  onAnimationEnd: () => void
  children?: React.ReactNode
}

const Transition: React.FC<TransitionProps> = ({
  className,
  onAnimationEnd,
  children,
}) => {
  return (
    <div id="app" className={className} onAnimationEnd={onAnimationEnd}>
      {children}
    </div>
  )
}

export default Transition
