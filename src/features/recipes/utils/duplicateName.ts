const duplicateName = (name: string) => {
  const match = name.match(/(.*?)([0-9]+)/)

  return match ? `${match[1]}${parseInt(match[2], 10) + 1}` : `${name} 2`
}

export default duplicateName
