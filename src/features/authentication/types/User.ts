import Roles from '~/src/models/Roles'

type User = {
  id: string
  email: string
  role: Roles
}

export default User
