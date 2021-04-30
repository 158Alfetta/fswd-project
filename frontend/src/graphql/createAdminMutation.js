import { gql } from '@apollo/client'

export const CREATE_ADMIN_MUTATION = gql`
  mutation CreateAdmin($record: CreateOneAdminInput!) {
    createAdmin(record: $record) {
      recordId
      record {
        _id
        companyName
      }
    }
  }
`
