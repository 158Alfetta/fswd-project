import { gql } from '@apollo/client'

export const QUERY_ORDER = gql`
query order($userId: String!){
    order(filter:{
      createdById: $userId
    }, sort:_ID_DESC){
        _id
      product {
        productId
        productInfo {
          name
          price
          timestamp
          count
          ... on PromotionProduct {promotionDetail{
            name
            discount
            }
        }
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
    shippingCost
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
<<<<<<< HEAD
          ... on PromotionProduct {promotionDetail{
            name
            discount
            }
        }
=======
          image
>>>>>>> 6823003c82bee43b59671577deecb23681b7e672
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
      shippingCost
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
          ... on PromotionProduct {promotionDetail{
            name
            discount
            }
        }
        }
      }
    }
  }
`
