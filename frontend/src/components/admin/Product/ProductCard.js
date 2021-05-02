import { useQuery } from '@apollo/client'
import { PRODUCT_QUERY } from '../../../graphql/productsQuery'
import Product from './Card/Product'
import PromotionProduct from './Card/PromotionProduct'
import React, { useEffect } from 'react'

const ProductCard = () => {
  const { loading, error, data, refetch } = useQuery(PRODUCT_QUERY)

  useEffect(() => {
    refetch()
  }, [refetch])

  if (loading) {
    return 'loading'
  }
  if (error) {
    return 'Error'
  }
  // console.log(data)
  return (
    <div className="my-4 grid grid-cols-1 md:grid-cols-4">
      {data?.Products?.map((product) => {
        if (product?.type === 'PromotionProduct') {
          return (
            <PromotionProduct
              className="m-2"
              key={product?._id}
              product={product}
            />
          )
        }
        return null
      })}
    </div>
  )
}
export default ProductCard
