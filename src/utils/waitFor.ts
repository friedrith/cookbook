const waitFor = (milliseconds: number) =>
  new Promise(resolve => setTimeout(resolve, milliseconds))

export default waitFor
