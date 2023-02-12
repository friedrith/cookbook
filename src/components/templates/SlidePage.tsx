import Box from '@/components/atoms/Box'

type Props = {
  title?: string
  children: React.ReactNode
  id?: string
}

const SlidePage = ({ id, title, children }: Props) => {
  return (
    <div
      className="relative w-full h-screen flex items-center snap-center z-10"
      id={id}
    >
      <div className="flex-1 max-h-screen overflow-y-auto p-4 lg:p-10 py-20">
        <Box className="relative max-w-screen-md m-auto p-5 lg:p-10 z-10">
          {title && (
            <h2 className="mb-10 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </h2>
          )}
          <div className="text-left">{children}</div>
        </Box>
      </div>
    </div>
  )
}

export default SlidePage
