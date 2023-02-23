import AuthContext from './AuthContext'

export interface RecipesLayoutProps {
  children: React.ReactNode
}

// async function getSession(cookie: string): Promise<Session> {
//   const response = await fetch('http://localhost:3000/api/auth/session', {
//     headers: {
//       cookie,
//     },
//   })

//   const session = await response.json()

//   return Object.keys(session).length > 0 ? session : null
// }

const RecipesLayout = ({ children }: RecipesLayoutProps) => {
  return <AuthContext>{children}</AuthContext>
}

export default RecipesLayout
