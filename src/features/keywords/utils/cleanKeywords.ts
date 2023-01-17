import { uniq } from 'lodash'

const cleanKeywords = (keywords: string[]) => uniq(keywords.filter(Boolean))

export default cleanKeywords
