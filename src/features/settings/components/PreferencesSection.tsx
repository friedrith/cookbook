type Props = {
  title: string
  description?: string
  children?: React.ReactNode
}

const PreferencesSection = ({ title, description, children = [] }: Props) => {
  return (
    <div className="mt-10">
      <div className="space-y-1">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
        <p className="max-w-2xl text-sm text-gray-500">{description}</p>
      </div>
      <div className="mt-0.5">
        <dl className="">{children}</dl>
      </div>
    </div>
  )
}

export default PreferencesSection
