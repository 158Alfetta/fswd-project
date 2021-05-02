import {gql} from "@apollo/client"

export const CREATE_PRODUCT_MUTATION = gql`
mutation createProduct($record: CreateOneProductInput!){
    createProduct(record: $record){
        record{
            name
            description
            image
            price
            count
            category
            createdByUser
        }
    }
}
`