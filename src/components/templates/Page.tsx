type Props = {
  className?: string
  children: React.ReactNode
}

const Page = ({ className, children }: Props) => (
  <div className={`relative h-screen w-screen bg-white ${className}`}>
    {children}
  </div>
)

export default Page
