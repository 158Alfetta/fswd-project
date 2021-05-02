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
        category
        createdByUser
        promotionId
      }
    }
  }
`
