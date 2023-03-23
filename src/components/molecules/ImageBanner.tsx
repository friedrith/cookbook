import useEventListener from 'hooks/useEventListener'
import { useState } from 'react'

type Props = {
  imageUrl: string
  alt: string
  loading?: boolean
}

const ImageBanner = ({ imageUrl, alt, loading }: Props) => {
  const [shift, setShift] = useState(0)

  useEventListener('scroll', () => {
    setShift(-window.scrollY / 3)
  })

  return (
    <div className="h-96 relative overflow-hidden">
      <div className="h-96 w-full fixed z-0 overflow-hidden">
        <img
          src={imageUrl}
          className="h-[35rem] w-full object-cover relative"
          alt={alt}
          style={{ top: shift }}
        />
      </div>
    </div>
  )
}

export default ImageBanner
