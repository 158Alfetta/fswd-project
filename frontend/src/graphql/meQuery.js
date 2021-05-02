import { gql } from '@apollo/client'

export const ME_QUERY = gql`
  query {
    me {
      _id
      type
      username
      firstName
      lastName
    }
  }
`
export const CUSTOMER_QUERY = gql`
query{
  customerInfo{
    _id
    username
    firstName
    lastName
    telephone
    streetAddr
    district
    province
    postal
  }
}
`
export const ADMIN_QUERY = gql`
query{
  adminInfo{
    username
    firstName
    lastName
    companyName
  }
}
`