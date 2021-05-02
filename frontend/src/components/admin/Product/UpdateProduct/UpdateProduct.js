import { useCallback, useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useQuery, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { PROMOTION_PRODUCT_ID_QUERY } from '../../../../graphql/productIdQuery'
import { UPDATE_PROMOTION_PRODUCT_BY_ID } from '../../../../graphql/ProductMutation'

import AddImage from '../../../Product/AddImage/AddImage'
import PromotionOptions from './PromotionOptions'

const UpdateProductForm = () => {
  const [modifiedData, setModifiedData] = useState()
  const history = useHistory()
  const { productId } = useParams()
  const { loading, error, data, refetch } = useQuery(
    PROMOTION_PRODUCT_ID_QUERY,
    {
      variables: { id: productId },
    }
  )
  const [updatePromotionProduct] = useMutation(UPDATE_PROMOTION_PRODUCT_BY_ID)

  const [err, setErr] = useState('')

  const handleUrlsChange = useCallback((data) => {
    setModifiedData((prev) => ({ ...prev, image: data }))
  }, [])

  const handleInputChange = useCallback((e) => {
    let { name, value } = e.target
    if (name === 'count' && value) {
      value = parseInt(value)
    }
    if (name === 'price' && value) {
      value = parseFloat(value)
    }
    setModifiedData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleTypeChange = useCallback((e) => {
    setModifiedData((prev) => ({ ...prev, type: e.target.value }))
  }, [])

  const handlePromotionChange = useCallback((e) => {
    setModifiedData((prev) => ({ ...prev, promotionId: e.target.value }))
  }, [])

  const handleUpdateProduct = useCallback(
    async (e) => {
      try {
        e.preventDefault()
        if (modifiedData) {
          const val = {
            name: modifiedData?.name,
            price: modifiedData?.price,
            image: modifiedData?.image,
            count: modifiedData?.count,
            category: modifiedData?.category,
            description: modifiedData?.description,
            promotionId: modifiedData?.promotionId,
          }
          console.log(JSON.stringify(modifiedData))
          await updatePromotionProduct({
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
    [modifiedData, updatePromotionProduct]
  )

  useEffect(() => {
    if (data) {
      const dataCopy = { ...data.PromotionProductId }
      setModifiedData(dataCopy)
    }
    return () => {
      setModifiedData()
    }
  }, [data])

  useEffect(() => {
    refetch({ variables: { id: productId } })
  }, [refetch, productId])

  let PromotionProductForm =
    modifiedData?.type === 'PromotionProduct' ? (
      <>
        <label>
          <select name="promotionId" onChange={handlePromotionChange}>
            <option value="">--Select Promotion--</option>
            <PromotionOptions promotionId={modifiedData?.promotionId ?? ''} />
          </select>
        </label>
      </>
    ) : null

  return (
    <div className="p-8 mt-20 bg-white rounded-lg max-w-md pb-10 m-4">
      <div className="text-center">
        <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
          Update Product
        </h1>
      </div>

      <AddImage
        imagesFromUpdate={modifiedData?.image ?? ''}
        urlsCallback={handleUrlsChange}
      />

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
        className="h-10 rounded w-full border px-3 focus:text-black focus:border-blue-100 mb-3"
        type="text"
        name="description"
        value={modifiedData?.description}
        onChange={handleInputChange}
        placeholder="Describe your product"
        required
      />
      <input
        className="h-10 rounded border w-full px-3 focus:text-black focus:border-blue-100 mb-3"
        type="number"
        name="price"
        value={modifiedData?.price == 0 ? null : modifiedData?.price}
        onChange={handleInputChange}
        min="0"
        placeholder="Price of your product"
        autoComplete="off"
        required
      />
      <input
        className="h-10 rounded border w-full px-3 focus:text-black focus:border-blue-100 mb-3"
        type="number"
        name="count"
        value={modifiedData?.count == 0 ? null : modifiedData?.count}
        onChange={handleInputChange}
        min="0"
        placeholder="Your current product quantity"
        autoComplete="off"
        required
      />

      {PromotionProductForm}

      <label className="ml-8">
        <select
          name="category"
          defaultChecked={modifiedData?.category ?? ''}
          onChange={handleInputChange}
        >
          <option
            selected={modifiedData?.category === '' ? true : false}
            value=""
          >
            --Select Catagory--
          </option>
          <option
            selected={modifiedData?.category === 'Plants' ? true : false}
            value="Plants"
          >
            Plants
          </option>
          <option
            selected={modifiedData?.category === 'Flowers' ? true : false}
            value="Flowers"
          >
            Flowers
          </option>
          <option
            selected={
              modifiedData?.category === 'Gardening Equipment' ? true : false
            }
            value="Gardening Equipment"
          >
            Gardening Equipment
          </option>
          <option
            selected={modifiedData?.category === 'Fertilizer' ? true : false}
            value="Fertilizer"
          >
            Fertilizer
          </option>
          <option
            selected={modifiedData?.category === 'Other' ? true : false}
            value="Other"
          >
            Other
          </option>
        </select>
      </label>

      <p className="text-center mt-3 text-red-600 text-xs">{err}</p>
      <button
        className="uppercase h-10 mt-3 text-white w-full rounded bg-green-500 hover:bg-green-600"
        onClick={handleUpdateProduct}
      >
        Update
      </button>
    </div>
  )
}
export default UpdateProductForm
