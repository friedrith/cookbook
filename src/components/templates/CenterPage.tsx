import Page from './Page'

type Props = {
  className?: string
  children: React.ReactNode
  title?: string
}

const CenterPage = ({ className = '', children, title }: Props) => {
  return (
    <Page title={title}>
      <div className="h-screen w-full flex items-center justify-center relative">
        <div className={className}>{children}</div>
      </div>
    </Page>
  )
}

export default CenterPage
