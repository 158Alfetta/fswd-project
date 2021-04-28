import { gql } from '@apollo/client'

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