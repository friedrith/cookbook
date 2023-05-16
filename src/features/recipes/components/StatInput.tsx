import SectionTitle from '~/src/components/atoms/SectionTitle'
import Input from '~/src/components/atoms/Input'

type Props = {
  id: string
  icon:
    | ((props: React.SVGProps<SVGSVGElement>) => JSX.Element)
    | React.ExoticComponent<{
        children?: React.ReactNode
      }>
  label: string
  value: string | number
  unit?: string
  placeholder: string
  onChange: (value: string) => void
}

const StatInput = ({
  id,
  icon: Icon,
  label,
  value,
  unit,
  onChange,
  placeholder,
}: Props) => {
  const width = Math.max(`${value}`.length, 1) * 9

  return (
    <div className="flex flex-col items-center">
      <label className="flex flex-col items-center" htmlFor={id}>
        <Icon className="h-7 w-7 text-indigo-600" aria-hidden="true" />
        <SectionTitle className="pb-0">{label}</SectionTitle>
      </label>
      <div className="flex items-center">
        <Input.Basic
          type="number"
          placeholder={placeholder}
          className="text-right"
          id={id}
          style={{ flex: `0 0 ${width}px`, width: `${width}px` }}
          value={`${value}`}
          onChange={onChange}
        />
        {unit && <div className="pl-1">{unit}</div>}
      </div>
    </div>
  )
}

export default StatInput
