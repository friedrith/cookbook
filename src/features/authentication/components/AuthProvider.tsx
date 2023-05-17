import { ClerkProvider } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate()

  console.log(
    'process.env.REACT_APP_CLERK_PUBLISHABLE_KEY',
    process.env.REACT_APP_CLERK_PUBLISHABLE_KEY,
    process.env.REACT_APP_API_URL,
  )

  return (
    <ClerkProvider
      publishableKey={process.env.REACT_APP_CLERK_PUBLISHABLE_KEY ?? ''}
      navigate={to => navigate(to)}
    >
      {children}
    </ClerkProvider>
  )
}

export default AuthProvider
