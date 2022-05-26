type Props = {
  className?: string
  children: React.ReactNode
}

const Page = ({ className, children }: Props) => (
  <div
    className={`relative h-screen w-screen bg-white dark:bg-black ${className}`}
  >
    {children}
  </div>
)

export default Page
