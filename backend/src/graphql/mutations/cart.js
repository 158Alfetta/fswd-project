import { CartTC, productInCartTC } from '../../models'
import { authQueryMiddleware } from './middleware'

export const updatePrice = CartTC.getResolver('updateById')
export const createCart = CartTC.getResolver('createOne')
export const delProduct = CartTC.getResolver('removeOne')
export const updateCart = CartTC.getResolver('updateOne')
// export const updateProductInCart = CartTC.getFieldTC('product').getResolver('updateById')