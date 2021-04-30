import { gql } from '@apollo/client'

export const PRODUCT_QUERY = gql`
  query {
    Products {
        _id
        type
        name
        price
        image
    }
  }
`
