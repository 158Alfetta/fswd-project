import mongoose from 'mongoose'
import { composeWithMongoose, composeWithMongooseDiscriminators } from 'graphql-compose-mongoose'

const { Schema } = mongoose


const ProductInOrderSchema = new Schema({
  quantity: {type: Number, required: true},
  productId: {type:String, required: true},
})

const OrderSchema = new Schema({
  status: {type: String, required: true},
  createdById: {type: String, required: true},
  product: {type: ProductInOrderSchema, required: true}
})



export const OrderModel = mongoose.model('Order', OrderSchema)

export const OrderTC = composeWithMongoose(OrderModel)

export default OrderModel
