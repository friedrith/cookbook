import { createContext } from 'react'

const HistoryContext = createContext({
  previousLocation: '',
})

export default HistoryContext
