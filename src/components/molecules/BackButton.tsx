import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowLeftIcon } from '@heroicons/react/outline'

import Button from 'components/atoms/Button'
import HistoryContext from 'contexts/History'

type Props = {
  url: string
  className?: string
  basic?: boolean
  disabled?: boolean
}

const BackButton = ({ url, className, basic, disabled }: Props) => {
  const { previousLocation } = useContext(HistoryContext)
  const navigate = useNavigate()

  console.log('previousLocation', previousLocation)

  if (previousLocation) {
    return (
      <Button.Icon
        onClick={() => navigate(-1)}
        icon={ArrowLeftIcon}
        basic={basic}
        className={className}
        disabled={disabled}
      />
    )
  }

  return (
    <Button.Icon
      url={url}
      icon={ArrowLeftIcon}
      basic={basic}
      className={className}
      disabled={disabled}
    />
  )
}

export default BackButton
