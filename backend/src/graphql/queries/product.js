import { BaseProductTC, PromotionProductTC } from '../../models'
import { authQueryMiddlewareWithFilterCreatedBy } from './middleware'

export const Products = BaseProductTC.getResolver('findMany')
export const ProductsByUser = BaseProductTC.getResolver('findMany', [
  authQueryMiddlewareWithFilterCreatedBy,
])
export const ProductId = BaseProductTC.getResolver('findById')

export const PromotionProductId = PromotionProductTC.getResolver('findById')
