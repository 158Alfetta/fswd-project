import { gql } from '@apollo/client'

export const UPDATE_PROMOTION_PRODUCT_BY_ID = gql`
  mutation updatePromotionProductById(
    $id: MongoID!
    $record: UpdateByIdPromotionProductInput!
  ) {
    updatePromotionProductById(_id: $id, record: $record) {
      record {
        name
        description
        image
        price
        count
        createdByUser
        promotionId
      }
    }
  }
`
export const UPDATE_STOCK_BY_ID = gql`
mutation updateStockById($id: MongoID!, $stock: Float){
  updateBaseproductById(_id :$id, record:{
    count: $stock
  }){
    __typename
  }
}
`