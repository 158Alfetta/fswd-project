import {gql} from "@apollo/client"

export const CREATE_PROMOTION_MUTATION = gql`
mutation createPromotionProduct($record: CreateOneDISCOUNTInput!){
    createDiscountPromotion(record: $record){
        record{
            name
            discount
        }
    }
}
`