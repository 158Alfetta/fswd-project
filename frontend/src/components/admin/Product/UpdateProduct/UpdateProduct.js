import { useCallback, useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useQuery, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { useSession } from '../../../../contexts/SessionContext'
import { PRODUCT_ID_QUERY } from '../../../../graphql/productIdQuery'

import AddImage from '../../../Product/AddImage/AddImage'
import PromotionOptions from './PromotionOptions'

const AddProductForm = (props) => {
  const [modifiedData, setModifiedData] = useState()
  const { user } = useSession()
  const history = useHistory()
  const { productId } = useParams()
  const { loading, error, data } = useQuery(PRODUCT_ID_QUERY, {
    variables: { id: productId },
  })

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    image: [],
    price: 0,
    count: 0,
    createdByUser: user?._id,
  })
  const [type, setType] = useState('Product')
  const [PromotionProduct, setPromotionProduct] = useState({
    discount: 0,
    limit: 0,
  })
  const [err, setErr] = useState('')

  const handleUrlsChange = useCallback((data) => {
    setNewProduct((prev) => ({ ...prev, image: data }))
  }, [])

  const handleInputChange = useCallback((e) => {
    let { name, value } = e.target
    if (name === 'count' && value) {
      value = parseInt(value)
    }
    if (name === 'price' && value) {
      value = parseFloat(value)
    }
    setNewProduct((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleTypeChange = useCallback((e) => {
    setType(e.target.value)
  }, [])
  const handlePromotionChange = useCallback((e) => {
    let { name, value } = e.target
    console.log(name, value)
    setPromotionProduct((prev) => ({ ...prev, [name]: value }))
  }, [])
  const handleAddProduct = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        // if (type === 'Product')
        //   await createProduct({ variables: { record: newProduct } })
        // else
        //   await createPromotionProduct({
        //     variables: { record: { ...newProduct, ...PromotionProduct } },
        //   })
        // setErr('')
        history.push('/products')
      } catch (err) {
        console.log(JSON.stringify(err))
      }
    },
    [newProduct, PromotionProduct, type]
  )

  useEffect(() => {
    if (data) {
      const dataCopy = { ...data.ProductId }
      console.log(JSON.stringify(dataCopy))
      setModifiedData(dataCopy)
    }
  }, [data])

  let PromotionProductForm =
    type === 'PromotionProduct' ? (
      <>
        <label>
          <select name="promotionId" onChange={handlePromotionChange}>
            <option value="">--Select Promotion--</option>
            <PromotionOptions />
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
        imagesFromUpdate={modifiedData?.image}
        urlsCallback={handleUrlsChange}
      />

      <form onSubmit={handleAddProduct}>
        <div className="mt-4">
          <span className="text-gray-700">Please select product type:</span>
          <div className="mt-1 mb-3">
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="type"
                value="Product"
                onChange={handleTypeChange}
                checked={type === 'Product'}
              />
              <span className="ml-1">Product</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="type"
                value="PromotionProduct"
                onChange={handleTypeChange}
                checked={type === 'PromotionProduct'}
              />
              <span className="ml-1">Promotion Product</span>
            </label>
          </div>
        </div>

        <input
          className="h-10 rounded w-full border px-3 focus:text-black focus:border-blue-100 mb-3"
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          autoComplete="off"
          required
        />
        <input
          className="h-10 rounded w-full border px-3 focus:text-black focus:border-blue-100 mb-3"
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          placeholder="Describe your product"
          required
        />
        <input
          className="h-10 rounded border w-full px-3 focus:text-black focus:border-blue-100 mb-3"
          type="number"
          name="price"
          value={newProduct.price == 0 ? null : newProduct?.price}
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
          value={newProduct.count == 0 ? null : newProduct?.count}
          onChange={handleInputChange}
          min="0"
          placeholder="Your current product quantity"
          autoComplete="off"
          required
        />

        {PromotionProductForm}
        <p className="text-center mt-3 text-red-600 text-xs">{err}</p>
        <button
          className="uppercase h-10 mt-3 text-white w-full rounded bg-green-500 hover:bg-green-600"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  )
}
export default AddProductForm
