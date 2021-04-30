import { gql } from '@apollo/client'
export const PRODUCT_ID_QUERY = gql`
query ProductById($id: String!){
    ProductId (_id: $id) {
        _id
        type
        name
        price
    }
}
`