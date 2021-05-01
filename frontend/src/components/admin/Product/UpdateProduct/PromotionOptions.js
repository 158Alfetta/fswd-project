import { useQuery } from '@apollo/client'
import { PROMOTION_QUERY } from '../../../../graphql/PromotionQuery'

const PromotionOptions = () => {
  const { loading, err, data } = useQuery(PROMOTION_QUERY)
  console.log(data)
  if (loading) {
    return 'loading'
  }
  if (err) {
    console.log(JSON.stringify(err))
  }
  return data?.DiscountPromotions?.map((promotion) => (
    <option value={promotion?._id} key={promotion?._id}>
      {promotion?.name}
    </option>
  ))
}

export default PromotionOptions
