import { useState, Fragment } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDebouncedCallback } from 'use-debounce'
import { Tab } from '@headlessui/react'
import { useTranslation } from 'react-i18next'

import usePrevious from 'hooks/usePrevious'
import PhoneFrame from 'components/atoms/PhoneFrame'
import CircleBackground from 'components/atoms/CircleBackground'

import features from './features'

const FeaturesDesktop = () => {
  let [changeCount, setChangeCount] = useState(0)
  let [selectedIndex, setSelectedIndex] = useState(0)
  let prevIndex = usePrevious(selectedIndex)
  let isForwards = prevIndex === undefined ? true : selectedIndex > prevIndex

  let onChange = useDebouncedCallback(
    selectedIndex => {
      setSelectedIndex(selectedIndex)
      setChangeCount(changeCount => changeCount + 1)
    },
    100,
    { leading: true }
  )

  const { t } = useTranslation('marketing')

  return (
    <Tab.Group
      as="div"
      className="grid grid-cols-12 items-center gap-8 lg:gap-16 xl:gap-24"
      selectedIndex={selectedIndex}
      onChange={onChange}
      vertical
    >
      <Tab.List className="relative z-10 order-last col-span-6 space-y-6">
        {features.map((feature, featureIndex) => (
          <div
            key={feature.name}
            className="relative rounded-2xl transition-colors hover:bg-gray-800/40"
          >
            {featureIndex === selectedIndex && (
              <motion.div
                layoutId="activeBackground"
                className="absolute inset-0 bg-gray-800/70"
                initial={{ borderRadius: 16 }}
              />
            )}
            <div className="relative z-10 p-8">
              <feature.icon className="h-8 w-8" />
              <h3 className="mt-8 text-lg font-semibold text-white">
                <Tab className="text-left outline-none">
                  <span className="absolute inset-0 rounded-2xl" />
                  <>{t(feature.name)}</>
                </Tab>
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                {t(feature.description)}
              </p>
            </div>
          </div>
        ))}
      </Tab.List>
      <div className="relative col-span-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <CircleBackground color="white" className="animate-spin-slower" />
        </div>
        <PhoneFrame className="z-10 mx-auto w-full max-w-[366px]">
          <Tab.Panels as={Fragment}>
            <AnimatePresence
              initial={false}
              custom={{ isForwards, changeCount }}
            >
              {features.map((feature, featureIndex) =>
                selectedIndex === featureIndex ? (
                  <Tab.Panel
                    static
                    key={feature.name + changeCount}
                    className="col-start-1 row-start-1 flex focus:outline-offset-[32px] [&:not(:focus-visible)]:focus:outline-none"
                  >
                    <feature.screen
                    // animated
                    // custom={{ isForwards, changeCount }}
                    />
                  </Tab.Panel>
                ) : null
              )}
            </AnimatePresence>
          </Tab.Panels>
        </PhoneFrame>
      </div>
    </Tab.Group>
  )
}

export default FeaturesDesktop
