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

const sum = (...args: number[]): number =>
  args.length > 0 ? args[0] + sum(...args.slice(1)) : 0

const findColor = (children: string) => {
  const colorIndex =
    sum(...children.split(' ').map(l => l.toUpperCase().charCodeAt(0))) %
    colors.length

  return colors[colorIndex]
}

const Badge = ({ className = '', children, color }: Props) => {
  const foundColor = color || findColor(children)

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-${foundColor}-100 text-${foundColor}-800 ${className} -events-auto`}
    >
      {children}
    </span>
  )
}

export default Badge
