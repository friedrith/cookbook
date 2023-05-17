/* eslint-disable @typescript-eslint/no-unused-vars */
// import { ClerkProvider } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate()

  console.error(
    'process.env.REACT_APP_CLERK_PUBLISHABLE_KEY',
    process.env.REACT_APP_CLERK_PUBLISHABLE_KEY,
  )

  return <>{children}</>

  // return (
  //   <ClerkProvider
  //     publishableKey={process.env.REACT_APP_CLERK_PUBLISHABLE_KEY ?? ''}
  //     navigate={to => navigate(to)}
  //   ></ClerkProvider>
  // )
}

export default AuthProvider
