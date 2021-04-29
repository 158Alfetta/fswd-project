import { gql } from '@apollo/client'

export const QUERY_ORDER = gql`
    query {
        order{
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
            address
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

export const QUERY_ORDER_BY_ID = gql`
    query findOrderbyId($_id: MongoID!){
        findOrderbyId(_id:$_id){
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
        address
        }
    }
`
