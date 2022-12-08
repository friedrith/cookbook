type Props = {
  className?: string
  children?: React.ReactNode
  onSubmit?: (event: React.SyntheticEvent) => void
}

const Form = ({ className, children, onSubmit = () => {} }: Props) => {
  return (
    <form
      className={className}
      onSubmit={event => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      {children}
    </form>
  )
}

export default Form
