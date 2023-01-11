import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

import Button from 'components/atoms/Button'
import HistoryContext from 'contexts/History'

import isRightToLeft from 'utils/platforms/isRightToLeft'

type Props = {
  url: string
  className?: string
  basic?: boolean
  disabled?: boolean
  title?: string
}

const BackButton = ({ url, className, basic, disabled, title }: Props) => {
  const { previousLocation } = useContext(HistoryContext)
  const navigate = useNavigate()

  const icon = isRightToLeft() ? ArrowRightIcon : ArrowLeftIcon

  if (previousLocation && previousLocation === url) {
    return (
      <span data-tip={title}>
        <Button.Icon
          onClick={() => navigate(-1)}
          icon={icon}
          basic={basic}
          className={className}
          disabled={disabled}
          title={title}
        />
      </span>
    )
  }

  return (
    <span data-tip={title}>
      <Button.Icon
        url={url}
        icon={icon}
        basic={basic}
        className={className}
        disabled={disabled}
        title={title}
      />
    </span>
  )
}

export default BackButton
