type Props = {
  children: React.ReactNode
  more?: React.ReactNode
  className?: string
}

const SectionTitle = ({ children, more, className }: Props) => {
  return (
    <h2
      className={`text-lg leading-6 lg:text-xl xl:text-2xl font-semibold text-gray-800 pb-6 flex flex-row items-center justify-left ${className}`}
    >
      <div className="flex-1">{children}</div>
      {more}
    </h2>
  )
}

export default SectionTitle
