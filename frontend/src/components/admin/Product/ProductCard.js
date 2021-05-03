import { useQuery } from '@apollo/client'
import { PRODUCT_QUERY } from '../../../graphql/productsQuery'
import PromotionProduct from './Card/PromotionProduct'
import React, { useEffect, useState, useCallback } from 'react'
import Pagination from '../../UI/Pagination/Pagination'

const ProductCard = () => {
  const [page, setPage] = useState({
    pageNum: 1,
    skip: 0,
    limit: 8,
    items_count: 0,
  })

  const { loading, error, data, refetch } = useQuery(PRODUCT_QUERY, {
    variables: { skip: page.skip, limit: page.limit },
  })

  useEffect(() => {
    refetch({
      skip: page.skip,
      limit: page.limit,
    })
  }, [page, refetch])

  const handleClickedRemove = useCallback(() => {
    refetch({
      skip: page.skip,
      limit: page.limit,
    })
  }, [page, refetch])

  const handleNextPage = useCallback(() => {
    if (page.pageNum * page.limit >= page.items_count) {
    } else {
      setPage((prev) => ({
        ...prev,
        skip: prev.pageNum * prev.limit,
        pageNum: prev.pageNum + 1,
      }))
    }
  }, [page])

  const handleBeforePage = useCallback(() => {
    if (page.pageNum === 1) {
    } else {
      setPage((prev) => ({
        ...prev,
        skip: (prev.pageNum - 2) * prev.limit,
        pageNum: prev.pageNum - 1,
      }))
    }
  }, [page])

  useEffect(() => {
    if (data) {
      setPage((prev) => ({
        ...prev,
        items_count: data?.Products[0]?.product_count,
      }))
    }
  }, [data])

  if (loading) {
    return 'loading'
  }
  if (error) {
    return 'Error'
  }
  return (
    <div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-4">
        {data?.Products?.map((product) => {
          if (product?.type === 'PromotionProduct') {
            return (
              <PromotionProduct
                clicked={handleClickedRemove}
                className="m-2"
                key={product?._id}
                product={product}
              />
            )
          }
          return null
        })}
      </div>
      <div className="flex justify-end">
        <Pagination
          clickBefore={handleBeforePage}
          pageData={page}
          clickNext={handleNextPage}
        />
      </div>
    </div>
  )
}
export default ProductCard
