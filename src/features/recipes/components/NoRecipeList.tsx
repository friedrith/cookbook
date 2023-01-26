interface Props {
  children: React.ReactNode
}

const NoRecipeList = ({ children }: Props) => {
  return (
    <div className="flex justify-center p-5">
      <div className="text-base text-gray-500 text-center">{children}</div>
    </div>
  )
}

export default NoRecipeList
