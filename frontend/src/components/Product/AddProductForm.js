import { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { useMutation, useQuery } from '@apollo/client'
import { useSession } from '../../contexts/SessionContext'
import { CREATE_PRODUCT_MUTATION } from '../../graphql/createProduct'
import { CREATE_PROMOTION_PRODUCT_MUTATION } from '../../graphql/createPromotionProduct'
import { PROMOTION_QUERY } from '../../graphql/PromotionQuery'
import { PRODUCT_QUERY } from '../../graphql/productsQuery'

import AddImage from './AddImage/AddImage'
import PromotionOptions from './PromotionOptions'

const AddProductForm = (props) => {
  const { user } = useSession()
  const history = useHistory()

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    image: [],
    price: 0,
    count: 0,
    createdByUser: user?._id,
  })
  const [type, setType] = useState('PromotionProduct')
  const [PromotionProduct, setPromotionProduct] = useState({
    discount: 0,
    limit: 0,
  })
  const refetchQuery = {
    refetchQueries: [
      {
        query: PRODUCT_QUERY,
      },
    ],
  }

  const [err, setErr] = useState('')
  const [[createProduct], [createPromotionProduct]] = [
    useMutation(CREATE_PRODUCT_MUTATION, refetchQuery),
    useMutation(CREATE_PROMOTION_PRODUCT_MUTATION, refetchQuery),
  ]

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

  const handlePromotionChange = useCallback((e) => {
    let { name, value } = e.target
    console.log(name, value)
    setPromotionProduct((prev) => ({ ...prev, [name]: value }))
  }, [])
  const handleAddProduct = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        if (type === 'Product')
          await createProduct({ variables: { record: newProduct } })
        else
          await createPromotionProduct({
            variables: { record: { ...newProduct, ...PromotionProduct } },
          })
        setErr('')
        history.push('/products')
      } catch (err) {
        console.log(JSON.stringify(err))
      }
    },
    [createProduct, createPromotionProduct, newProduct, PromotionProduct, type]
  )

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
          Add Product
        </h1>
      </div>

      <AddImage urlsCallback={handleUrlsChange} />

      <form onSubmit={handleAddProduct}>
        <input
          className="h-10 rounded w-full border px-3 focus:text-black focus:border-blue-100 my-3"
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
          Submit
        </button>
      </form>
    </div>
  )
}
export default AddProductForm
