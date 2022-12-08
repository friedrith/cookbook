type Props = {
  label: string
  onClick: () => void
  tooltip: string
  children: React.ReactNode
}

const SectionAction = ({ label, onClick, tooltip, children }: Props) => {
  return (
    <button
      className="flex items-center text-gray-400 hover:text-indigo-600 cursor-pointer"
      onClick={onClick}
    >
      <div className="mr-2 font-normal text-xs">{label}</div>
      <div>{children}</div>
    </button>
  )
}

export default SectionAction
