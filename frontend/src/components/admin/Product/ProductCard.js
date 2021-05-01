import { useQuery } from '@apollo/client'
import { PRODUCT_QUERY } from '../../../graphql/productsQuery'
import Product from './Product'
import React from 'react'

const ProductCard = () => {
  const { loading, error, data } = useQuery(PRODUCT_QUERY)
  if (loading) {
    return 'loading'
  }
  if (error) {
    return 'Error'
  }
  const Products = data?.Products?.map((product) => {
    return (
      <div key={product._id}>
        <Product product={product} />
      </div>
    )
  })
  return (
    <div key={1} className="my-4 grid grid-cols-1 md:grid-cols-4">
      {Products}
    </div>
  )
}
export default ProductCard
