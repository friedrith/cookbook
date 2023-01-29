import { uniq } from 'lodash'

const cleanKeywords = (keywords: string[]) =>
  uniq(keywords.filter(Boolean).map(s => s.toLowerCase()))

export default cleanKeywords
