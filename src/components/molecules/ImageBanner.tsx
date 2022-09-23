type Props = {
  imageUrl: string
  alt: string
  loading?: boolean
}

const ImageBanner = ({ imageUrl, alt, loading }: Props) => {
  return (
    <div className="h-96">
      <div
        className="h-96 w-full bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />
    </div>
  )
}

export default ImageBanner
