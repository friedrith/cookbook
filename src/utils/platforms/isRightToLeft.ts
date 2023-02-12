import { isDocumentDefined } from './window'

const isRightToLeft = () =>
  isDocumentDefined() &&
  document.querySelector('body')?.getAttribute('dir') === 'rtl'

export default isRightToLeft
