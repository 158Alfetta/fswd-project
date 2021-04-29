import { OrderTC } from '../../models'
import { authQueryMiddleware } from './middleware'


export const createOrder = OrderTC.getResolver('createOne', [authQueryMiddleware])
export const updateOrderById = OrderTC.getResolver('updateById')
export const removeOrderById = OrderTC.getResolver('removeById')
