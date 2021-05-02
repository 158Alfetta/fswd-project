import { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { useMutation } from '@apollo/client'
import { useSession } from '../../contexts/SessionContext'

import { PRODUCT_QUERY } from '../../graphql/productsQuery'

import { CREATE_PROMOTION_MUTATION } from '../../graphql/createPromotion'

const AddPromotionForm = (props) => {
  const { user } = useSession()
  const history = useHistory()

  const [newPromotion, setNewPromotion] = useState({
    name: '',
    discount: 0,
  })

  const refetchQuery = {
    refetchQueries: [
      {
        query: PRODUCT_QUERY,
      },
    ],
  }

  const [err, setErr] = useState('')
  const [[createDiscountPromotion]] = [
    useMutation(CREATE_PROMOTION_MUTATION, refetchQuery),
  ]

  const handleInputChange = useCallback((e) => {
    let { name, value } = e.target
    if (name === 'discount') {
      value = parseFloat(value)
    }
    setNewPromotion((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleAddPromotion = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        await createDiscountPromotion({ variables: { record: newPromotion } })
        setErr('')
        history.push('/')
      } catch (err) {
        console.log(JSON.stringify(err))
      }
    },
    [createDiscountPromotion, newPromotion]
  )

  return (
    <div className="p-8 mt-20 bg-white rounded-lg max-w-md pb-10 m-4">
      <div className="text-center">
        <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
          Add Promotion
        </h1>
      </div>

      <form onSubmit={handleAddPromotion}>
        <input
          className="h-10 rounded border w-full px-3 focus:text-black focus:border-blue-100 mb-3"
          type="text"
          name="name"
          value={newPromotion.name}
          onChange={handleInputChange}
          placeholder="Promotion Name"
          autoComplete="off"
          required
        />
        <input
          className="h-10 rounded border w-full px-3 focus:text-black focus:border-blue-100 mb-3"
          type="number"
          name="discount"
          value={newPromotion.discount == 0 ? null : newPromotion?.discount}
          onChange={handleInputChange}
          min="0.000"
          max="100.000"
          placeholder="Your discount percent"
          autoComplete="off"
          required
        />
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
export default AddPromotionForm
