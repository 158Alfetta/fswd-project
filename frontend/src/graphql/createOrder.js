import { gql } from '@apollo/client'

export const CREATE_ORDER = gql`
    mutation createOrder(
        $statusOrder: String!,
        $userId: String!,
        $payment: String!,
        $product: [OrderProductInput]!
    ){
        createOrder(record:{
        status: $statusOrder,
        createdById: $userId,
        paymentDetail: $payment,
        product:$product
    }){
        record{
        _id
        }
    }
}
`
