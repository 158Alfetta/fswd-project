import moment from 'moment'
import { BaseProductTC, UserTC, DiscountPromotionTC } from '../../models'
// import mongoose from 'mongoose'
BaseProductTC.addRelation('createBy', {
  resolver: () => UserTC.getResolver('findById'),
  prepareArgs: {
    _id: (source) => source.createdByUser,
  },
  projection: { createdByUser: true },
})
BaseProductTC.addRelation('promotionDetail', {
  resolver: () => DiscountPromotionTC.getResolver('findById'),
  prepareArgs: {
    _id: (source) => source.promotionId,
  },
  projection: { promotionId: true },
})
BaseProductTC.addFields({
  timestamp: {
    type: 'String',
    resolve: (source) => moment(source.timestamp).fromNow(),
    projection: { timestamp: true },
  },
})

BaseProductTC.addFields({
  product_count: BaseProductTC.getResolver('count'),
})
