import { createSourceEventStream } from 'graphql'
import { CartTC, UserTC, productInCartTC, BaseProductTC } from '../../models'
import { productInCart } from '../queries/cart'

CartTC.addRelation(
    'createdByUser',{
        resolver: () => UserTC.getResolver('findById'),
        prepareArgs: {
            _id: (source) => source.createdById,
        },
        projection: {createdById: true},
    }
)

CartTC.getFieldTC('product').addRelation(
    'productInfo',{
        resolver: () => BaseProductTC.getResolver('findById'),
        prepareArgs: {
            _id: (source) => source.productId,
        },
        projection: {productId: true},
    }
)

// productInCartTC.addRelation(
//     'productInfo',{
//         resolver: () => BaseProductTC.getResolver('findById'),
//         prepareArgs: {
//             _id: (source) => source.productId,
//         },
//         projection: {productId: true},
//     }
// )