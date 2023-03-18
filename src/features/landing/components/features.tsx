import SmartphoneShoppingBagIcon from 'features/landing/components/SmartphoneShoppingBagIcon'
import SmartphoneStepListIcon from 'features/landing/components/SmartphoneStepListIcon'
import SmartphoneImportIcon from 'features/landing/components/SmartphoneImportIcon'

import importImage from 'assets/import.png'
import shoppingList from 'assets/shoppingList.png'
import step from 'assets/steps.png'

// resolution 390x844
const Screen = (image: string, alt: string) => () =>
  <img className="absolute inset-0" src={image} alt={alt} />

const features = [
  {
    name: 'Import your recipes in one click',
    description:
      'Just copy-paste the website url of your favorite recipe and all the details are automatically imported in CookBook.',
    icon: SmartphoneImportIcon,
    screen: Screen(importImage, 'Import'),
  },
  {
    name: 'Create grocery shopping list in a blink',
    description:
      'The ingredients list of your recipe is added to your favorite todo app in 3 clicks',
    icon: SmartphoneShoppingBagIcon,
    screen: Screen(shoppingList, 'Shopping list'),
  },
  {
    name: 'Follow the steps without back and forth',
    description: 'Each step automatically reminds',
    icon: SmartphoneStepListIcon,
    screen: Screen(step, 'Steps'),
  },
]

export default features
