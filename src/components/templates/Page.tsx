import { Helmet } from 'react-helmet'

type Props = {
  className?: string
  children: React.ReactNode
  title?: string
}

const Page = ({ className, children, title }: Props) => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title ? `${title} - ` : ''}CookBook</title>
    </Helmet>
    <div className={`relative h-screen w-screen bg-white ${className}`}>
      {children}
    </div>
  </>
)

export default Page
