import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowLeftIcon } from '@heroicons/react/24/outline'

import Button from 'components/atoms/Button'
import HistoryContext from 'contexts/History'

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

  if (previousLocation) {
    return (
      <span data-tip={title}>
        <Button.Icon
          onClick={() => navigate(-1)}
          icon={ArrowLeftIcon}
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
        icon={ArrowLeftIcon}
        basic={basic}
        className={className}
        disabled={disabled}
        title={title}
      />
    </span>
  )
}

export default BackButton
