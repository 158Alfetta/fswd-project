import { gql } from '@apollo/client'

export const PRODUCT_ID_QUERY = gql`

query ProductById($id: MongoID!){
    ProductId (_id: $id) {
        _id
        type
        name
        price
        image
        count
        category
        description
        ... on PromotionProduct {promotionDetail{
            name
            discount
            }
        }
      }
    }
`

export const PROMOTION_PRODUCT_ID_QUERY = gql`
  query PromotionProductId($id: MongoID!) {
    PromotionProductId(_id: $id) {
      _id
      type
      name
      price
      image
      count
      description
      promotionId
      promotionDetail {
        name
        discount
      }
    }
  }
`
