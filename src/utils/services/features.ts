import devFeatures from 'config/features.dev.json'
import prodFeatures from 'config/features.prod.json'

type Features = { [id: string]: boolean }

const features: Features =
  process.env.NODE_ENV !== 'production' ? devFeatures : prodFeatures

export const enabled = (featureName: string) => Boolean(features[featureName])
