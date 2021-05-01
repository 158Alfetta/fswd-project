import { OrderTC, productInOrderTC } from '../../models'
import { authQueryMiddleware } from './middleware'

export const findOrderbyId = OrderTC.getResolver('findById')
export const productInOrder = productInOrderTC.getResolver('findMany')
export const order = OrderTC.getResolver('findMany', [authQueryMiddleware])
