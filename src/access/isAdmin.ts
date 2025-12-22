import { Access, FieldAccess } from 'payload'
import { User } from '@/payload-types'

export const isAdmin: Access<any, User> = ({ req: { user } }) => {
  return Boolean(user?.role?.includes('admin'))
}
export const isAdminField: FieldAccess<{ id: string }, User> = ({ req: { user } }) => {
  return Boolean(user?.role?.includes('admin'))
}
