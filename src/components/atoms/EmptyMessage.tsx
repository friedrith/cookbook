type Props = {
  title: string
  message?: string
  children?: React.ReactNode
}

const EmptyMessage = ({ title, message, children }: Props) => {
  return (
    <>
      <h3 className="mt-2 text-base font-medium text-gray-900">{title}</h3>
      {message && <p className="mt-1 text-base text-gray-500">{message}</p>}
      {children && <div className="mt-6">{children}</div>}
    </>
  )
}

export default EmptyMessage
