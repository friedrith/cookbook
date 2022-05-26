type Props = {
  url?: string
}

const Avatar = ({ url }: Props) =>
  url ? (
    <img className="rounded-full h-10 w-10" src={url} alt="" />
  ) : (
    <svg
      className="bg-primary-500 dark:bg-dark-secondary-300 rounded-full h-10 w-10 text-gray-300"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )

export default Avatar
