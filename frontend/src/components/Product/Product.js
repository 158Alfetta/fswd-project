import { DELETE_PRODUCT_MUTATION } from '../../graphql/deleteProductById'
import { useCallback } from 'react'
import { QUERY_CART } from '../../graphql/CartQuery'
import { UPDATE_CART } from '../../graphql/CartMutation'
import { useSession } from '../../contexts/SessionContext'
import { useMutation, useQuery } from '@apollo/client'
const Product = (props) => {
  const { product } = props
  const [[deleteProduct]] = [useMutation(DELETE_PRODUCT_MUTATION)]
  const { user } = useSession()
  const { data, refetch } = useQuery(QUERY_CART, { fetchPolicy: "no-cache" })
  const refetchQuery = {
    refetchQueries: [
      {
        query: QUERY_CART
      },
    ],
  }

  refetch()
  const [updateCart] = useMutation(UPDATE_CART, refetchQuery)
  const handleButtonClick = useCallback((e) => {
    try {
      console.log(product?._id)
      deleteProduct({ variables: { id: product?._id } })
    } catch (err) {
      console.log(JSON.stringify(err))
    }
  }, [])

  function addtoCart(productId) {
    var temp = JSON.stringify(data?.cart[0]?.product)
    var inCart = JSON.parse(temp)

    var newProduct = {
      productId: productId,
      quantity: 1,
    }
    var productIndex = inCart.findIndex((item) => item?.productId === productId)

    if (productIndex === -1) {
      inCart = [...inCart, newProduct]
    } else {
      inCart[productIndex].quantity = Math.min(
        inCart[productIndex].quantity + 1,
        inCart[productIndex].productInfo.count
      )
    }
    inCart.map((obj) => delete obj.productInfo)
    inCart.map((obj) => delete obj.__typename)
    return updateCart({ variables: { userId: user?._id, product: inCart } })
  }

  return (
    <div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          className="w-full"
          src={
            product?.image?.[0] || 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png'
          }
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{product?.name}</div>
          <p className="text-gray-700 text-base">{parseFloat(product?.price).toLocaleString()}</p>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => addtoCart(product?._id)}
        >
          {' '}
          Add to cart
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleButtonClick}
        >
          Remove Product
        </button>
      </div>
    </div>
  )
}
export default Product
