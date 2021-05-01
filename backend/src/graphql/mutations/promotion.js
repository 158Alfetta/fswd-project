import { DiscountPromotionTC, BasePromotionTC } from '../../models/promotion'

export const createDiscountPromotion = DiscountPromotionTC.getResolver('createOne')
export const updateDiscountPromotion = DiscountPromotionTC.getResolver('updateById')
export const removeDiscountPromotion = DiscountPromotionTC.getResolver('removeById')