type Props = {
  label?: string
  id?: string
  children: React.ReactNode
}

const FormItem = ({ id, label, children }: Props) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
    </div>
  )
}

export default FormItem
