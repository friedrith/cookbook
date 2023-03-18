import { useState, useRef, useContext } from 'react'

import VerificationCodeContext from './context'

export interface VerificationCodeInputWrapperProps {
  className?: string
  children: React.ReactNode
}

// https://beta.reactjs.org/learn/manipulating-the-dom-with-refs#how-to-manage-a-list-of-refs-using-a-ref-callback
// https://codepen.io/tatthien/pen/LYZxEmv
const VerificationCodeInputWrapper: React.FC<
  VerificationCodeInputWrapperProps
> = ({ className, children }) => {
  return (
    <VerificationCodeContext.Provider value={className || ''}>
      {children}
    </VerificationCodeContext.Provider>
  )
}

export default VerificationCodeInputWrapper
