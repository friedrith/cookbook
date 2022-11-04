import { ParallaxBanner } from 'react-scroll-parallax'

type Props = {
  imageUrl: string
  alt: string
  loading?: boolean
}

const ImageBanner = ({ imageUrl, alt, loading }: Props) => {
  return (
    <div className="h-96 relative">
      <ParallaxBanner
        layers={[
          {
            image: imageUrl,
            speed: -20,
          },
        ]}
        className="h-96 "
      />
    </div>
  )
}

export default ImageBanner
