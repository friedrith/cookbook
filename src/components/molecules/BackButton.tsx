import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

import Button from '@/components/atoms/Button'
import HistoryContext from '@/contexts/History'

import isRightToLeft from '@/utils/platforms/isRightToLeft'

type Props = {
  url: string
  className?: string
  basic?: boolean
  disabled?: boolean
  title?: string
}

const useForgetPreviousLocationAfter = (timeout: number) => {
  const [shouldForgetPreviousLocation, forgetPreviousLocation] = useState(false)

  useEffect(() => {
    let t = setTimeout(() => {
      forgetPreviousLocation(true)
    }, timeout)

    return () => clearTimeout(t)
  }, [timeout])

  return shouldForgetPreviousLocation
}

const BackButton = ({ url, className, basic, disabled, title }: Props) => {
  const { previousLocation } = useContext(HistoryContext)
  const rooter = useRouter()

  const icon = isRightToLeft() ? ArrowRightIcon : ArrowLeftIcon

  const shouldForgetPreviousLocation = useForgetPreviousLocationAfter(30000)

  if (
    previousLocation &&
    previousLocation === url &&
    !shouldForgetPreviousLocation
  ) {
    return (
      <span data-tip={title}>
        <Button.Icon
          onClick={() => rooter.back()}
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
