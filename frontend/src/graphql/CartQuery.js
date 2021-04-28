import { gql } from '@apollo/client'

export const QUERY_CART = gql`
  query Cart($userId: String!) {
    cart(filter: { createdById: $userId }) {
      product {
        productId
        productInfo {
          name
          price
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
  query Cart($userId: String!) {
    cart(filter: { createdById: $userId }) {
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

export const QUERY_CART_BY_USER = gql`
  query CartByUser {
    cartByUser {
      product {
        productId
        productInfo {
          name
          price
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
