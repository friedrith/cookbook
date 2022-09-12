type Props = {
  className?: string
  children: string
  color?: string
}

const colors = [
  'gray',
  'red',
  'yellow',
  'green',
  'blue',
  'indigo',
  'purple',
  'pink',
]

const findColor = (children: string) => {
  const colorIndex = children.toUpperCase().charCodeAt(0) % colors.length

  return colors[colorIndex]
}

const Badge = ({ className = '', children, color }: Props) => {
  const foundColor = color || findColor(children)

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-${foundColor}-100 text-${foundColor}-800 ${className} pointer-events-auto`}
    >
      {children}
    </span>
  )
}

export default Badge
