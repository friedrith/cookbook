type Props = {
  className?: string
}

const SmartphoneImportIcon = (props: Props) => {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 4a4 4 0 014-4h14a4 4 0 014 4v10h-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 002 2h5v2H9a4 4 0 01-4-4V4z"
        fill="#A3A3A3"
      />
      <path
        d="M12 25l8-8m0 0h-6m6 0v6"
        stroke="#737373"
        strokeWidth={2}
        strokeLinecap="round"
        transform="rotate(-180, 16, 22) translate(-12, -5) scale(1.3)"
      />
    </svg>
  )
}

export default SmartphoneImportIcon
