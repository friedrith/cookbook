type Props = {
  children: React.ReactNode
  more?: React.ReactNode
}

const SectionTitle = ({ children, more }: Props) => {
  return (
    <h2 className="text-lg leading-6 font-medium text-gray-900 pb-6 flex items-center">
      <div className="flex-1">{children}</div>
      {more}
    </h2>
  )
}

export default SectionTitle
