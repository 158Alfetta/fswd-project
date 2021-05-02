import { useQuery } from '@apollo/client'
import { PROMOTION_QUERY } from '../../../../graphql/PromotionQuery'

const PromotionOptions = (props) => {
  const { loading, err, data } = useQuery(PROMOTION_QUERY)
  if (loading) {
    return 'loading'
  }
  if (err) {
    console.log(JSON.stringify(err))
  }
  return data?.DiscountPromotions?.map((promotion) => (
    <option
      value={promotion?._id}
      key={promotion?._id}
      selected={props.promotionId === promotion?._id ? true : false}
    >
      {promotion?.name}
    </option>
  ))
}

export default PromotionOptions
