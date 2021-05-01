import { schemaComposer } from 'graphql-compose'
import { CartModel, CartTC, productInCartTC } from '../../models'
import { authQueryMiddlewareWithFilter } from './middleware'

export const productInCart = productInCartTC.getResolver('findMany')
// export const cart = CartTC.getResolver('findMany', [authQueryMiddlewareWithFilter])

export const cart = schemaComposer.createResolver({
  name: 'cart',
  type: [CartTC.getType()],
  resolve: async ({ context }) => {
    return await CartModel.find({ createdById: context.user?._id })
  },
})
