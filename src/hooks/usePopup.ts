import { useState } from 'react'

const usePopup = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialState)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return {
    isOpen,
    open,
    close,
    toggle: () => (isOpen ? close() : open()),
  }
}

export default usePopup
