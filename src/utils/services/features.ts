import devFeatures from '~/config/features.dev.json'
import prodFeatures from '~/config/features.prod.json'
import betaFeatures from '~/config/features.beta.json'

type Features = { [id: string]: boolean }

const findFeatures = () => {
  if (process.env.NODE_ENV !== 'production') return devFeatures

  if (process.env.REACT_APP_STAGE === 'beta') return betaFeatures

  return prodFeatures
}

const features: Features = findFeatures()

export const enabled = (featureName: string) => Boolean(features[featureName])
