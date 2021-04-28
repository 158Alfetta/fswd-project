import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const productInCartSchema = new Schema({
  productId: {type:String, required: true},
  quantity: {type: Number, required: true},
})

const CartSchema = new Schema({
  product: {type:[productInCartSchema], required: true},
  createdById : {type: String, required: true},
})

export const CartModel = mongoose.model('Cart', CartSchema)
export const InCartModel = mongoose.model('InCart', productInCartSchema)

export const CartTC = composeWithMongoose(CartModel)
export const productInCartTC = composeWithMongoose(InCartModel)

export default CartModel