import { CartTC, productInCartTC } from '../../models'
import { authQueryMiddleware } from './middleware'

export const cart = CartTC.getResolver('findMany')
export const productInCart = productInCartTC.getResolver('findMany')
export const cartByUser = CartTC.getResolver('findMany', [authQueryMiddleware])
