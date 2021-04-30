import { gql } from '@apollo/client'

export const PRODUCT_ID_QUERY = gql`
query ProductById($id: MongoID!){
    ProductId (_id: $id) {
        _id
        type
        name
        price
        image
        description
        ... on PromotionProduct {promotionDetail{
            name
            discount
            }
        }
    }
}
`