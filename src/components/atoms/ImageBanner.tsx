type Props = {
  imageUrl: string
  alt: string
  loading?: boolean
  children?: React.ReactNode
}

const ImageBanner = ({ imageUrl, alt, children, loading }: Props) => {
  return (
    <div className="h-96">
      <div
        className="h-96 w-full"
        style={{
          background: `url(${imageUrl})`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default ImageBanner
