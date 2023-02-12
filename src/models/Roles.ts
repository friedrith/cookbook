import User from '@/models/User'

enum Roles {
  Admin,
  User,
}

export const hasOneOfRoles = (user: User | null, roles: Roles[]) =>
  roles.length === 0 || roles.find(r => r === user?.role)

export default Roles
