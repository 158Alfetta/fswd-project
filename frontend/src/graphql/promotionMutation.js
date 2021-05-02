import { gql } from '@apollo/client'

export const UPDATE_PROMOTION_BY_ID = gql`
  mutation UpdateDiscountPromotion(
    $id: MongoID!
    $record: UpdateByIdDISCOUNTInput!
  ) {
    updateDiscountPromotion(_id: $id, record: $record) {
      record {
        name
        discount
      }
    }
  }
`
