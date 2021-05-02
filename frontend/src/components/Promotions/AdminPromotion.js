import { useQuery } from '@apollo/client'
import { PROMOTION_QUERY } from '../../graphql/PromotionQuery'
import AdminPromotionCard from './AdminPromotionCard'
import React, { useCallback } from 'react'
const AdminPromotion = () => {
  const { loading, error, data, refetch } = useQuery(PROMOTION_QUERY)

  const handleClickedRemove = useCallback(() => {
    refetch()
  }, [refetch])

  if (loading) {
    return 'loading...'
  }
  if (error) {
    console.log(JSON.stringify(error))
  }
  console.log(data?.DiscountPromotions)
  return (
    <div className="my-4 grid grid-cols-1 md:grid-cols-4">
      {data?.DiscountPromotions?.map((promotion) => {
        return (
          <AdminPromotionCard
            key={promotion?._id}
            clicked={handleClickedRemove}
            promotion={promotion}
          />
        )
      })}
    </div>
  )
}

export default AdminPromotion
