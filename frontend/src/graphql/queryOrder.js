import { gql } from '@apollo/client'

export const QUERY_ORDER = gql`
    query order($userId: String!){
        order(filter:{createdById:$userId}){
            _id
            product{
            productId
            productInfo{
                name
                price
                timestamp
                count
            }
            quantity
            }
            createdByUser{
            firstName
            lastName
            }
        paymentDetail
        timestamp
        status
        }
    }
  
`
