import { gql } from '@apollo/client'

export const PROMOTION_PRODUCT_QUERY = gql`
  query Product($id: MongoID!) {
    PromotionProductId(_id: $id) {
      _id
      type
      name
      price
      image
      count
      product_count
      description
      promotionId
      ... on PromotionProduct {
        promotionDetail {
          name
          discount
        }
      }
    }
  }
`
