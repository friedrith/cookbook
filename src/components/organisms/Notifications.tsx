import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

import Notification from 'components/molecules/Notification'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { getRecipesToDelete, cancelDeletion } from 'store'

const Notifications = () => {
  const dispatch = useAppDispatch()

  const container = document.getElementById('notifications')

  const recipes = useAppSelector(getRecipesToDelete)

  const { t } = useTranslation()

  if (!container) {
    return null
  }

  return createPortal(
    <div
      aria-live="assertive"
      className="fixed bottom-0 inset-x-0 z-50 flex items-start px-4 py-6 pointer-events-none sm:p-6"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-start">
        {recipes.map(recipe => (
          <Notification
            message={t('_Recipe deleted', { recipeName: recipe.name })}
            actions={[
              {
                label: t('_Undo'),
                onClick: () => dispatch(cancelDeletion(recipe)),
              },
            ]}
          />
        ))}
      </div>
    </div>,
    container
  )
}

export default Notifications
