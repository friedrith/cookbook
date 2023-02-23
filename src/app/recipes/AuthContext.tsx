'use client'

import { SessionProvider } from 'next-auth/react'

/**
 * @see https://github.com/nextauthjs/next-auth/issues/5647
 */
export interface AuthContextProps {
  children: React.ReactNode
}

const AuthContext = ({ children }: AuthContextProps) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthContext
