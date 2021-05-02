import {BaseProductTC, ProductTC, PromotionProductTC } from '../../models'

export const createProduct = ProductTC.getResolver('createOne')
export const updateProductById = ProductTC.getResolver('updateById')

export const createPromotionProduct = PromotionProductTC.getResolver('createOne')
export const updatePromotionProductById = PromotionProductTC.getResolver('updateById')

export const removeProductById = BaseProductTC.getResolver('removeById')
export const updateBaseproductById = BaseProductTC.getResolver('updateById')