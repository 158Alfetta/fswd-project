import { OrderTC, productInOrderTC } from '../../models'
import { adminPermission, authQueryMiddlewareWithFilter } from './middleware'

export const findOrderbyId = OrderTC.getResolver('findById')
export const productInOrder = productInOrderTC.getResolver('findMany')
export const order = OrderTC.getResolver('findMany', [
  authQueryMiddlewareWithFilter,
])

export const orderByAdmin = OrderTC.getResolver('findMany', [adminPermission])
