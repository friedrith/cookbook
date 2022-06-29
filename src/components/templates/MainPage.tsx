type Props = {
  children: React.ReactNode
  className?: string
}

const MainPage = ({ children, className }: Props) => {
  return (
    <div className={`bg-white px-4 lg:px-10 py-4 lg:py-10 ${className}`}>
      <div className="max-w-screen-xl m-auto">{children}</div>
    </div>
  )
}

export default MainPage
