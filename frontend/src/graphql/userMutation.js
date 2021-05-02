import { gql } from '@apollo/client'

export const UPDATE_PROFILE = gql`
mutation updateCustomerProfile(
    $id: MongoID!
    $telephone: String
    $street: String
    $district: String
    $province: String
    $postal: String
    ){
    updateCustomerById(_id: $id, record:{
      telephone: $telephone
      streetAddr: $street
      district: $district
      province: $province
      postal: $postal
    })
    {
      __typename
    }
  }
`