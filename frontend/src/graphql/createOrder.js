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
