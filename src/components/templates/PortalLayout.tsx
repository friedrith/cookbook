type Props = {
  children: React.ReactNode
}

const PortalLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen fixed flex w-full">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96 text-center md:text-left text-left rtl:text-right">
          {children}
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1514986888952-8cd320577b68?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752"
          alt=""
        />
      </div>
    </div>
  )
}

export default PortalLayout
