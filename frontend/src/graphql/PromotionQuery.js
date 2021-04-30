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
