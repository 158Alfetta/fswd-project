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
export const DELETE_PROMOTION = gql`
    mutation RemoveDiscountPromotion($id: MongoID!){
        removeDiscountPromotion(_id: $id){
            record {
                _id
            }
        }
    }
`