import { CartTC } from '../../models'

export const updatePrice = CartTC.getResolver('updateById')
export const addToCart = CartTC.getResolver('createOne')
export const delProduct = CartTC.getResolver('removeById')