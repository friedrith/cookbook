import Lottie from 'react-lottie'
import PropTypes from 'prop-types'

const Icon = ({ src }) => {
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: src,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return <Lottie options={defaultOptions} height={40} width={40} />
}

Icon.propTypes = {
  src: PropTypes.object.isRequired
}

export default Icon
