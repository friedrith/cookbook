type Props = {
  children: React.ReactNode
  more?: React.ReactNode
  className?: string
}

const SectionTitle = ({ children, more, className }: Props) => {
  return (
    <h2
      className={`text-lg leading-6 text-xl font-semibold text-indigo-600 pb-6 flex items-center ${className}`}
    >
      <div className="flex-1">{children}</div>
      {more}
    </h2>
  )
}

export default SectionTitle