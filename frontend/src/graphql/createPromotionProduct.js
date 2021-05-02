import {gql} from "@apollo/client"

export const CREATE_PROMOTION_PRODUCT_MUTATION = gql`
mutation createPromotionProduct($record: CreateOnePromotionProductInput!){
    createPromotionProduct(record: $record){
        record{
            name
            description
            image
            price
            count
            category
            createdByUser
            promotionId
        }
    }
}
`