import { DiscountPromotionTC, BasePromotionTC} from '../../models/'

export const Promotions = BasePromotionTC.getResolver('findMany')
export const DiscountPromotions = DiscountPromotionTC.getResolver('findMany')
export const DiscountPromotionById = DiscountPromotionTC.getResolver('findById')