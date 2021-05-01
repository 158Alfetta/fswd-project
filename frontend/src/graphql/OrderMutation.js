import { gql } from '@apollo/client'

export const CREATE_ORDER = gql`
    mutation createOrder(
        $statusOrder: String!,
        $payment: String!,
        $product: [OrderProductInput]!
        $address: String,
        $userId: String!,
    ){
        createOrder(record:{
        status: $statusOrder,
        paymentDetail: $payment,
        product: $product,
        address: $address,
        createdById: $userId,
    }){
        record{
        _id
      }
    }
  }
`

export const PROCEED_PAYMENT_MUTATION = gql`
  mutation updateOrderById(
    $_id: MongoID!
    $statusOrder: String!
    $paymentDetail: String!
  ) {
    updateOrderById(
      _id: $_id
      record: { status: $statusOrder, paymentDetail: $paymentDetail }
    ) {
      record {
        createdByUser {
          username
        }
      }
    }
  }
`

export const CANCEL_ORDER = gql`
    mutation updateOrderById(
        $_id: MongoID!,
        $statusOrder: String!
    ){
        updateOrderById(_id: $_id,
        record:{
        status: $statusOrder,
        }){
        record{
            createdByUser{
                username
            }
        }
        }
    }
`
