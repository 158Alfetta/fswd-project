import { gql } from '@apollo/client'

export const PROMOTION_QUERY = gql`
  query {
    DiscountPromotions {
        _id
        name
        discount
    }
  }
`
export const PROMOTION_ID_QUERY = gql`
  query DiscountPromotionById($id: MongoID!){
    DiscountPromotionById (_id:$id) {
      _id
      name
      discount
    }
  }
`