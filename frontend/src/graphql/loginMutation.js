import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
  mutation Login($record: LoginInput) {
    login(record: $record) {
      token
      user {
        _id
        username
        type
      }
    }
  }
`
