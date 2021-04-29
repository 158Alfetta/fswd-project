import { gql } from '@apollo/client'

export const CREATE_ORDER = gql`
    mutation createOrder(
        $statusOrder: String!,
        $payment: String!,
        $product: [OrderProductInput]!
    ){
        createOrder(record:{
        status: $statusOrder,
        paymentDetail: $payment,
        product:$product
    }){
        record{
        _id
        }
    }
}
`

export const PROCEED_PAYMENT_MUTATION = gql`
    mutation updateOrderById(
        $_id: MongoID!,
        $statusOrder: String!,
        $paymentDetail: String!,
    ){
        updateOrderById(_id: $_id,
        record:{
        status: $statusOrder,
        paymentDetail: $paymentDetail,
        }){
        record{
            createdByUser{
                username
            }
        }
        }
    }
`
