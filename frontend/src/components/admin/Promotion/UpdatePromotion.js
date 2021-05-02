import { useCallback, useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useQuery, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { PROMOTION_ID_QUERY, PROMOTION_QUERY } from '../../../graphql/PromotionQuery'
import { UPDATE_PROMOTION_BY_ID } from '../../../graphql/promotionMutation'


const UpdatePromotionForm = () => {
  const [modifiedData, setModifiedData] = useState()
  const history = useHistory()
  const { promotionId } = useParams()

  const { loading, error, data, refetch } = useQuery(
    PROMOTION_ID_QUERY,
    {
      variables: { id: promotionId },
    }
  )
  const [updatePromotion] = useMutation(UPDATE_PROMOTION_BY_ID)

  const [err, setErr] = useState('')

  const handleInputChange = useCallback((e) => {
    let { name, value } = e.target
    if (name === 'discount' && value) {
      value = parseFloat(value)
    }
    setModifiedData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleUpdatePromotion = useCallback(
    async (e) => {
      try {
        e.preventDefault()
        if (modifiedData) {
          const val = {
            name: modifiedData?.name,
            discount: modifiedData?.discount,
          }
          console.log(JSON.stringify(modifiedData))
          await updatePromotion({
            variables: {
              id: modifiedData._id,
              record: val,
            },
          })
          setErr('')
          console.log('success')
          history.push('/dashboard')
        }
      } catch (err) {
        console.log(JSON.stringify(err))
      }
    },
    [modifiedData, updatePromotion]
  )

  useEffect(() => {
    if (data) {
      const dataCopy = { ...data.DiscountPromotionById }
      setModifiedData(dataCopy)
    }
    return () => {
      setModifiedData()
    }
  }, [data])

  useEffect(() => {
    refetch({ variables: { id: promotionId } })
  }, [refetch, promotionId])


  return (
    <div className="p-8 mt-20 bg-white rounded-lg max-w-md pb-10 m-4">
      <div className="text-center">
        <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
          Update Promotion
        </h1>
      </div>

      <input
        className="h-10 rounded w-full border px-3 focus:text-black focus:border-blue-100 my-3"
        type="text"
        name="name"
        value={modifiedData?.name}
        onChange={handleInputChange}
        placeholder="Product Name"
        autoComplete="off"
        required
      />
      <input
        className="h-10 rounded border w-full px-3 focus:text-black focus:border-blue-100 mb-3"
        type="number"
        name="discount"
        value={modifiedData?.discount == 0 ? null : modifiedData?.discount}
        onChange={handleInputChange}
        min="0"
        placeholder="Price of your product"
        autoComplete="off"
        required
      />
      <p className="text-center mt-3 text-red-600 text-xs">{err}</p>
      <button
        className="uppercase h-10 mt-3 text-white w-full rounded bg-green-500 hover:bg-green-600"
        onClick={handleUpdatePromotion}
      >
        Update
      </button>
    </div>
  )
}
export default UpdatePromotionForm
