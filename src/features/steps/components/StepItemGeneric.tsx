import { useMemo } from 'react'
import { unescape } from 'lodash'

import Ingredient from '~/src/models/Ingredient'
import { replaceUrlsByLinks } from '~/src/features/steps/utils/parseStep'
import { useAppSelector } from '~/src/hooks/redux'
import { getTemperature } from '~/src/store/index'
import convertTemperature from '~/src/features/units/utils/convertTemperature'
import IngredientBadge from '~/src/features/ingredients/components/IngredientBadge'
import findDurations from '~/src/features/timers/utils/findDurations'
import DurationBadge from '~/src/features/timers/components/DurationBadge'
import { enabled } from '~/src/utils/services/features'

type PropsGeneric = {
  className?: string
  linkClassName?: string
  description: string | React.ReactNode
  descriptionClassName?: string
  iconClassName?: string
  icon: React.ReactNode
  isLastOne?: boolean
  onClick?: () => void
  ingredients?: Ingredient[]
}

const StepItemGeneric = ({
  className,
  linkClassName,
  isLastOne = false,
  iconClassName,
  description,
  descriptionClassName,
  icon,
  onClick,
  ingredients = [],
}: PropsGeneric) => {
  const temperature = useAppSelector(getTemperature)

  const descriptionParsed = useMemo(
    () =>
      typeof description === 'string'
        ? convertTemperature(
            replaceUrlsByLinks(unescape(description), 'underline'),
            temperature,
          )
        : '',
    [description, temperature],
  )

  const durations = useMemo(
    () => (typeof description === 'string' ? findDurations(description) : []),
    [description],
  )

  return (
    <li className={`relative ${className}`}>
      {!isLastOne ? (
        <div
          className={`ltr:-ml-px rtl:-mr-px absolute ltr:mt-0.5 rtl:ml-0.5 top-4 ltr:left-4 rtl:right-4 w-0.5 h-full ${linkClassName}`}
          aria-hidden="true"
        />
      ) : null}
      <button
        onClick={onClick}
        className="relative z-10 flex items-start group"
      >
        <span className="h-9 flex items-center">
          <span
            className={`w-8 h-8 flex items-center justify-center rounded-full ${iconClassName}`}
          >
            {icon}
          </span>
        </span>
        <div className="ms-4 min-w-0 flex flex-col">
          {descriptionParsed ? (
            <div
              className={`text-sm ltr:text-left rtl:text-right select-text ${descriptionClassName}`}
              dangerouslySetInnerHTML={{ __html: descriptionParsed }}
            />
          ) : (
            <div
              className={`text-sm ltr:text-left rtl:text-right select-text ${descriptionClassName}`}
            >
              {description}
            </div>
          )}
          <div
            className="flex flex-row flex-wrap"
            onClick={event => event.stopPropagation()}
            onKeyDown={() => {}}
            role="link"
            tabIndex={0}
          >
            {ingredients.map((ingredient, index) => (
              <IngredientBadge
                className="mr-1 mb-1"
                key={`${ingredient.name} ${index}`}
                ingredient={ingredient}
              />
            ))}
            {enabled('timer') &&
              durations.map(duration => (
                <DurationBadge
                  key={duration}
                  duration={duration}
                  className="mr-1 mb-1"
                />
              ))}
          </div>
        </div>
      </button>
    </li>
  )
}

export default StepItemGeneric
