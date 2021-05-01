import { gql } from '@apollo/client'

export const PRODUCT_QUERY = gql`
  query {
    Products {
      _id
      type
      name
      price
      count
      image
    }
  }
`

export const PRODUCT_QUERY_BY_USER = gql`
  query {
    ProductsByUser {
        _id
        type
        name
        price
        image
        ... on PromotionProduct {promotionDetail{
            name
            discount
          }
        }
    }
  }
`
