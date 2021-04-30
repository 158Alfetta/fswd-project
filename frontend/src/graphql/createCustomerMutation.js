import { gql } from '@apollo/client'

export const CREATE_CUSTOMER_MUTATION = gql`
  mutation createCustomer($record: CreateOneCustomerInput!) {
    createCustomer(record: $record) {
      recordId
      record {
        _id
        username
        firstName
        lastName
      }
    }
  }
`
