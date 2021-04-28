import { gql } from '@apollo/client'

export const PROMOTION_PRODUCT_QUERY = gql`
query Product($id: MongoID!){
    PromotionProductId(_id: $id) {
        _id
        name
        price
        discount
        image
    }
}
`
