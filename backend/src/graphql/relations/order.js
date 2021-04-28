import moment from 'moment'
import { OrderTC, UserTC, BaseProductTC} from '../../models'

OrderTC.addRelation(
    'createdByUser',{
        resolver: () => UserTC.getResolver('findById'),
        prepareArgs: {
            _id: (source) => source.createdById,
        },
        projection: {createdById: true},
    }
)

OrderTC.getFieldTC('product').addRelation(
    'productInfo',{
        resolver: () => BaseProductTC.getResolver('findById'),
        prepareArgs: {
            _id: (source) => source.productId,
        },
        projection: {productId: true},
    }
)

OrderTC.addFields({
    timestamp:{
        type: "String",
        resolve: (source) => moment(source.timestamp).fromNow(),
        projection: {timestamp: true},
    },
})