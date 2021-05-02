import { gql } from '@apollo/client'

export const PRODUCT_QUERY = gql`
  query Products($skip: Int!, $limit: Int!) {
    Products(skip: $skip, limit: $limit) {
      _id
      type
      name
      price
      count
      image
      product_count
      ... on PromotionProduct {
        promotionDetail {
          name
          discount
        }
      }
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
      ... on PromotionProduct {
        promotionDetail {
          name
          discount
        }
      }
    }
  }
`
