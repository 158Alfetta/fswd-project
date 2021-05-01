import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ADMIN_QUERY_ORDER } from '../../../graphql/OrderQuery'
import { ORDER_STATUS_MUTATION } from '../../../graphql/OrderMutation'

import Pagination from '../../UI/Pagination/Pagination'

const ProductCard = () => {
  const [modifiedData, setModifiedData] = useState()
  const { loading, error, data, refetch } = useQuery(ADMIN_QUERY_ORDER)
  const [updateOrderStatus] = useMutation(ORDER_STATUS_MUTATION)
  const [page, setPage] = useState({
    pageNum: 1,
    skip: 0,
    limit: 5,
    orders_count: 0,
  })

  useEffect(() => {
    refetch({
      skip: page.skip,
      limit: page.limit,
    })
  }, [page, refetch])

  const handleStatusSelect = useCallback(
    async (e, id) => {
      const val = e.target.value
      const index = modifiedData.findIndex((el) => el._id === id)
      let copyModified = [...modifiedData]
      copyModified[index] = {
        ...copyModified[index],
        status: val,
      }
      setModifiedData(copyModified)
      await updateOrderStatus({
        variables: {
          id: id,
          record: {
            status: val,
          },
        },
      })
      await refetch({
        skip: page.skip,
        limit: page.limit,
      })
      alert(`Update status to ${val}!`)
    },
    [modifiedData, refetch, updateOrderStatus]
  )

  useEffect(() => {
    if (data) {
      const dataCopy = [...data.orderByAdmin]
      setModifiedData(dataCopy)

      setPage((prev) => ({
        ...prev,
        orders_count: data.orderByAdmin[0].orders_count,
      }))
    }
  }, [data])

  const handleNextPage = useCallback(() => {
    if (page.pageNum * page.limit >= page.orders_count) {
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
        skip: prev.pageNum - 2 * prev.limit,
        pageNum: prev.pageNum - 1,
      }))
    }
  }, [page])

  if (loading) {
    return 'loading'
  }
  if (error) {
    return 'Error'
  }

  return (
    <div className="my-4">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Address
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Bought Products
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {modifiedData?.map((order) => {
              return (
                <tr key={order?._id} className="">
                  <td valign="top" className="px-6 py-4 whitespace-nowrap">
                    <div className="">
                      <div className="">
                        {order.createdByUser?.firstName || 'FirstName'}{' '}
                        {order.createdByUser?.lastName || 'LastName'}
                      </div>
                    </div>
                  </td>
                  <td valign="top" className="p-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-500">
                        {order.address || 'default address'}
                      </div>
                    </div>
                  </td>
                  <td valign="top" className="pl-5 py-4 whitespace-nowrap">
                    <div className="">
                      <div className="relative inline-flex">
                        <svg
                          className="w-2 absolute top-0 right-0 m-8 mt-2.5 pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 412 232"
                        >
                          <path
                            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                            fill="#648299"
                            fillRule="nonzero"
                          />
                        </svg>
                        <select
                          className="border border-gray-300 rounded-full text-gray-600 h-6 pl-3 pr-8 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                          onChange={(e) => handleStatusSelect(e, order?._id)}
                          defaultValue={order?.status}
                        >
                          <option value="waiting">waiting</option>
                          <option value="success">success</option>
                          <option value="cancel">cancel</option>
                        </select>
                        {/* order?.status === 'waiting' */}
                        <div
                          className={`rounded-full h-3 w-3 ml-2 mt-1.5 ${
                            order?.status === 'waiting'
                              ? 'bg-yellow-400'
                              : order?.status === 'success'
                              ? 'bg-green-400'
                              : order?.status === 'cancel'
                              ? 'bg-red-400'
                              : ''
                          }`}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td
                    valign="top"
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    <div>
                      {order?.product?.map((product) => (
                        <div>
                          <div className="text-sm text-gray-900">
                            {product?.productInfo?.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product?.quantity} piece
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        clickBefore={handleBeforePage}
        pageData={page}
        clickNext={handleNextPage}
      />
    </div>
  )
}
export default ProductCard
