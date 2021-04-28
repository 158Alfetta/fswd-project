import { OrderTC, productInOrderTC } from '../../models'
import { authQueryMiddleware } from './middleware'

export const order = OrderTC.getResolver('findMany')
export const findOrderbyId = OrderTC.getResolver('findById')
export const productInOrder = productInOrderTC.getResolver('findMany')
export const orderByUser = OrderTC.getResolver('findMany', [authQueryMiddleware])
