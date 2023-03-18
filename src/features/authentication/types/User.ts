import Roles from 'models/Roles'

type User = {
  id: string
  email: string
  role: Roles
}

export default User
