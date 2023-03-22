import { Parallax, Background } from 'react-parallax'

type Props = {
  imageUrl: string
  alt: string
  loading?: boolean
}

const ImageBanner = ({ imageUrl, alt, loading }: Props) => {
  console.log('imageUrl', imageUrl, `url("${imageUrl}")`)

  return (
    <div className="h-96 relative">
      <Parallax className="h-96 w-full" strength={400}>
        <Background className="h-[35rem] w-screen">
          <img
            src={imageUrl}
            className="h-[35rem] w-full object-cover"
            alt="fill murray"
          />
        </Background>
      </Parallax>
    </div>
  )
}

export default ImageBanner
