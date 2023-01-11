const isRightToLeft = () =>
  document.querySelector('body')?.getAttribute('dir') === 'rtl'

export default isRightToLeft
