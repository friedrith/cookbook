import { Helmet } from 'react-helmet'
import { useRef, useEffect } from 'react'

type Props = {
  className?: string
  children: React.ReactNode
  title?: string
}

const Page = ({ className = '', children, title }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, 0)
    }
  }, [])

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title ? `${title} - ` : ''}CookBook</title>
      </Helmet>
      <div
        className={`relative inset-0 h-full w-screen bg-white overflow-auto scroll-auto	${className}`}
        id="page"
        ref={ref}
      >
        {children}
      </div>
    </>
  )
}

export default Page
