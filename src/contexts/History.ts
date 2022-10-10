import { createContext } from 'react'

const HistoryContext = createContext({
  previousLocation: null,
})

export default HistoryContext
