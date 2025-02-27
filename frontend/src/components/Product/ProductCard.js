import { useQuery } from '@apollo/client'
import {
  PRODUCT_QUERY,
  PRODUCT_QUERY_WITH_FILTER,
} from '../../graphql/productsQuery'
import React, { useState, useEffect, useCallback } from 'react'
import Product from './Product'
import PromotionProduct from './PromotionProduct'
import Pagination from '../UI/Pagination/Pagination'

const ProductCard = () => {
  const [page, setPage] = useState({
    pageNum: 1,
    skip: 0,
    limit: 8,
    items_count: 0,
  })
  const [categorySelect, setCategorySelect] = useState('')

  const { loading, error, data, refetch } = useQuery(PRODUCT_QUERY, {
    variables: { skip: page.skip, limit: page.limit },
  })

  const { data: dataByFilter, refetch: refetchByFilter } = useQuery(
    PRODUCT_QUERY_WITH_FILTER,
    {
      variables: {
        skip: page.skip,
        limit: page.limit,
        category: categorySelect,
      },
    }
  )

  useEffect(() => {
    if (categorySelect) {
      refetchByFilter({
        skip: page.skip,
        limit: page.limit,
        category: categorySelect,
      })
    } else {
      refetch({
        skip: page.skip,
        limit: page.limit,
      })
    }
  }, [page, refetch, categorySelect, refetchByFilter])

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

  const handleFilterChange = useCallback((e) => {
    setCategorySelect(e.target.value)
  }, [])

  useEffect(() => {
    if (categorySelect) {
      if (dataByFilter) {
        setPage((prev) => ({
          ...prev,
          items_count: dataByFilter?.Products?.[0]?.product_count,
        }))
      }
    } else {
      if (data) {
        setPage((prev) => ({
          ...prev,
          items_count: data?.Products?.[0]?.product_count,
        }))
      }
    }
  }, [data, dataByFilter, categorySelect])

  if (loading) {
    return 'loading'
  }
  if (error) {
    return 'Error'
  }

  return (
    <div>
      <div>
        <div className="p-5">
          <label>
            <select name="category" onChange={handleFilterChange}>
              <option value="">--Select Catagory--</option>
              <option value="Plants">Plants</option>
              <option value="Flowers">Flowers</option>
              <option value="Gardening Equipment">Gardening Equipment</option>
              <option value="Fertilizer">Fertilizer</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>

        <div className="m-5 px-auto py-auto md:m-2 col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 ">
          {categorySelect
            ? dataByFilter?.Products?.map((product) => {
                if (product?.type === 'PromotionProduct') {
                  return (
                    <PromotionProduct key={product?._id} product={product} />
                  )
                }
                if (product?.type === 'Product') {
                  return <Product key={product?._id} product={product} />
                }
                return null
              })
            : data?.Products?.map((product) => {
                if (product?.type === 'PromotionProduct') {
                  return (
                    <PromotionProduct key={product?._id} product={product} />
                  )
                }
                if (product?.type === 'Product') {
                  return <Product key={product?._id} product={product} />
                }
                return null
              })}
        </div>
        <div className="flex justify-center m-5 mb-6">
          {page?.items_count > 0 ? (
            <Pagination
              clickBefore={handleBeforePage}
              pageData={page}
              clickNext={handleNextPage}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
export default ProductCard
