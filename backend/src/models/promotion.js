import mongoose from 'mongoose'
import { composeWithMongoose, composeWithMongooseDiscriminators } from 'graphql-compose-mongoose'
const { Schema } = mongoose

const discriminatorKey = 'type'
const enumPromotionType = {
    BOGO: "BOGO",
    DISCOUNT: "DISCOUNT"
}
const BasePromotionSchema = new Schema({
    type:{type: String, required: true, enum: Object.keys(enumPromotionType)},
    name:{type: String, required: true, index:true},
})

const DiscountPromotionSchema = new Schema({
    discount: {type: mongoose.Decimal128, required: true}
})

const BoGoPromotionSchema = new Schema({
    buy:{ type: Number, required: true },
    getFree:{ type: Number, required: true }
})
const discriminatorOptions = {
    inputType: {
        removeFields:['timestamp'],
    }
}

BasePromotionSchema.set('discriminatorKey', discriminatorKey)

export const BasePromotionModel = mongoose.model("Promotions", BasePromotionSchema)
export const DiscountPromotionModel = BasePromotionModel.discriminator(enumPromotionType.DISCOUNT, DiscountPromotionSchema)

export const BasePromotionTC = composeWithMongooseDiscriminators(BasePromotionModel)
export const DiscountPromotionTC = BasePromotionTC.discriminator(DiscountPromotionModel, {name:enumPromotionType.DISCOUNT, ...discriminatorOptions})
