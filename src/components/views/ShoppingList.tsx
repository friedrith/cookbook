import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import Container from '~/src/components/atoms/Container'
import Page from '~/src/components/templates/Page'

import MobileShoppingListHeader from '~/src/features/shoppingList/components/MobileShoppingListHeader'
import IngredientTable from '~/src/features/ingredients/components/IngredientTable'

const ShoppingList = () => {
  const { t } = useTranslation()

  return (
    <Page title={t('shoppingList.Shopping list')}>
      <div className={classNames('bg-white min-h-[100vh] md:h-auto md:m-10')}>
        <MobileShoppingListHeader />

        <Container>
          <IngredientTable ingredients={[]} />
        </Container>
      </div>

      {/* <MobileDock /> */}
    </Page>
  )
}

export default ShoppingList
