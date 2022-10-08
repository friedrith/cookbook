const cleanLine = (line: string) => line.trim().replace(/^-/, '').trim()

const cleanLines = (ingredients: string) =>
  ingredients
    .split(/\n|\r\n/)
    .map(cleanLine)
    .filter(Boolean)

export default cleanLines
