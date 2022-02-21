import { useState } from 'react'

import * as settings from 'assets/109-slider-toggle-settings-outline-edited.json'
import * as search from 'assets/42-search-outline-edited.json'
import Icon from 'components/atoms/Icon'
import Preferences from 'components/molecules/Preferences'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  return (
    <header className="flex py-2 items-center">
      <div className="w-10"></div>
      <div className="font-semibold	text-lg text-white">CookBook</div>
      <div className="flex-1"></div>
      <button className="mr-4">
        <Icon src={search} />
      </button>
      <button className="" onClick={openModal}>
        <Icon src={settings} />
      </button>
      <Preferences open={isOpen} onClose={closeModal} />
    </header>
  )
}

export default Header
