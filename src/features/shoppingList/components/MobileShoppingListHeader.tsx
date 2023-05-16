/* eslint-disable i18next/no-literal-string */
import React from 'react'

import Header from '~/src/components/atoms/Header'
import { useTranslation } from 'react-i18next'

const MobileShoppingListHeader: React.FC = props => {
  const { t } = useTranslation()
  return (
    <>
      <Header className="block md:hidden border-b border-gray-200">
        <h1 className="text-xl font-semibold leading-6 text-gray-900">
          {t('shoppingList.Shopping list')}
        </h1>
      </Header>
    </>
  )
}

export default MobileShoppingListHeader
