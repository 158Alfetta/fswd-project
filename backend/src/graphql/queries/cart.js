import { CartTC, productInCartTC } from '../../models'
import { authQueryMiddleware } from './middleware'

export const productInCart = productInCartTC.getResolver('findMany')
export const cart = CartTC.getResolver('findMany', [authQueryMiddleware])
