import { gql } from '@apollo/client'

export const CREATE_ORDER = gql`
    mutation createOrder(
        $statusOrder: String!,
        $payment: String!,
        $product: [OrderProductInput]!,
        $address: String,
        $userId: String!,
        $shippingCost: Float!
    ){
        createOrder(record:{
        status: $statusOrder,
        paymentDetail: $payment,
        product: $product,
        address: $address,
        createdById: $userId,
        shippingCost: $shippingCost,
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

export const ORDER_STATUS_MUTATION = gql`
  mutation UpdateOrderById($id: MongoID!, $record: UpdateByIdOrderInput!) {
    updateOrderById(_id: $id, record: $record) {
      record {
        status
      }
    }
  }
`
