import validator from 'validator'
import { mapValues } from 'lodash'

const escapeEntry = (obj: any): Object => {
  return mapValues(obj, (value: any) => {
    if (typeof value === 'string') {
      return validator.escape(value)
    } else if (Array.isArray(value)) {
      return value.map(v => escapeEntry(v))
    }

    return value
  })
}

export default escapeEntry
