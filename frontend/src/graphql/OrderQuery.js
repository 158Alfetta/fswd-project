import { gql } from '@apollo/client'

export const QUERY_ORDER = gql`
query order($userId: String!){
    order(filter:{
      createdById: $userId
    }){
        _id
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
    paymentDetail
    timestamp
    status
    address
    }
}
  
`

export const QUERY_ORDER_BY_ID = gql`
  query findOrderbyId($_id: MongoID!) {
    findOrderbyId(_id: $_id) {
      _id
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
      paymentDetail
      timestamp
      status
      address
    }
  }
`

export const ADMIN_QUERY_ORDER = gql`
  query orderByAdmin($skip: Int, $limit: Int) {
    orderByAdmin(skip: $skip, limit: $limit, sort: _ID_DESC) {
      _id
      orders_count
      createdByUser {
        firstName
        lastName
      }
      timestamp
      status
      address

      product {
        quantity
        productInfo {
          name
        }
      }
    }
  }
`
