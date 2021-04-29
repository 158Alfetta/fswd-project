import { mongoose } from 'mongoose'
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
    product:{type:[BaseProductSchema]}
})

const DiscountPromotionSchema = new Schema({
    discount: {type: mongoose.Decimal128, required: true}
})

const BoGoPromotionSchema = new Schema({
    buy:{type: Number, required: true},
    get:{type: Number, required: true}
})
discriminatorOptions = {
    inputType: {
        removeFields:['timestamp'],
    }
}

BasePromotionSchema.set('discriminatorKey', discriminatorKey)

export const BasePromotionModel = mongoose.model("Promotions", BasePromotionSchema)
export const DiscountPromotionModel = BasePromotionModel.discriminator(enumPromotionType.DISCOUNT, DiscountPromotionSchema)
export const BoGoPromotionModel = BasePromotionModel.discriminator(enumPromotionType.BOGO, BoGoPromotionSchema)

export const BasePromotionTC = composeWithMongooseDiscriminators(BasePromotionModel)
export const DiscountPromotionTC = composeWithMongooseDiscriminators(DiscountPromotionModel, {name:enumPromotionType.DISCOUNT, ...discriminatorOptions})
export const BoGoPromotionTC = composeWithMongooseDiscriminators(BoGoPromotionModel, {name:enumPromotionType.BOGO, ...discriminatorOptions})