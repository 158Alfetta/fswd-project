import { gql } from '@apollo/client'

export const QUERY_CART = gql`
  query { 
    cart{
      product {
        productId
        productInfo {
          name
          price
          image
          timestamp
          count
        }
        quantity
      }
      createdByUser {
        firstName
        lastName
      }
    }
  }
`

export const QUERY_CART_ORDER = gql`
  query{
    cart{
      product {
        productId
        quantity
      }
      createdByUser {
        firstName
        lastName
      }
    }
  }
`