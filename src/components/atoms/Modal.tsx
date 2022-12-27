import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export enum PopupType {
  Warning,
  Info,
  Success,
  Black,
}

type Props = {
  open: boolean
  iconNode?: React.ReactNode
  icon?:
    | ((props: React.SVGProps<SVGSVGElement>) => JSX.Element)
    | React.ExoticComponent<{
        children?: React.ReactNode
      }>
  onClose: () => void
  children: React.ReactNode
  type?: PopupType
  title?: string | React.ReactNode
  description?: string | React.ReactNode
}

const colors = {
  [PopupType.Warning]: 'red',
  [PopupType.Black]: 'black',
  [PopupType.Info]: 'primary',
  [PopupType.Success]: 'green',
}

const Modal = ({
  open,
  iconNode,
  icon: Icon,
  onClose,
  children,
  type = PopupType.Info,
  title = '',
  description = '',
}: Props) => {
  const color = colors[type]

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center md:p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-sm sm:p-6">
                <div>
                  {iconNode && (
                    <div className={`mx-auto flex items-center justify-center`}>
                      {iconNode}
                    </div>
                  )}
                  {Icon && (
                    <div
                      className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-${color}-100`}
                    >
                      <Icon
                        className={`h-6 w-6 text-${color}-600`}
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  <div className="mt-1 text-center">
                    {title && (
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                    )}
                  </div>
                  {description && (
                    <div className="mt-3 text-center sm:mt-5">
                      {description && (
                        <div className="mt-2">
                          <div className="text-sm text-gray-500">
                            {description}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="mt-5 sm:mt-6">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
