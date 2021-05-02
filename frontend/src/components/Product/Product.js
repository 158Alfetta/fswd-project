import { DELETE_PRODUCT_MUTATION } from '../../graphql/deleteProductById'
import { useCallback } from 'react'
import { QUERY_CART } from '../../graphql/CartQuery'
import { UPDATE_CART } from '../../graphql/CartMutation'
import { useSession } from '../../contexts/SessionContext'
import { useMutation, useQuery } from '@apollo/client'
import {Link} from 'react-router-dom'
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
  console.log(product)
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
    <>

      <div className="bg-yellow-800 bg-opacity-10 rounded-lg shadow-lg h-full w-full">
      <Link to={"/product/" + product?._id}>

        {/* IMAGE PANEL */}
        <div className="rounded-tl-lg rounded-tr-lg w-50 h-64">
          <img
            className="w-full h-full rounded-tl-lg rounded-tr-lg"
            src={
              product?.image?.[0] || 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png'
            }
            alt="Sunset in the mountains"
          />
        </div>

        {/* PRICEING AND NAME PANEL */}

        <div className="grid grid-cols-2 p-3">
          <div className="font-semibold text-lg">{product?.name}</div>
          <p className="text-gray-700 text-right">{parseFloat(product?.price).toLocaleString()}</p>
        </div>

        </Link>

        <div className="bg-yellow-800 bg-opacity-30 rounded-bl-lg rounded-br-lg flex justify-end">
          <button
              className="bg-yellow-700 hover:bg-yellow-900 text-white font-bold m-2 py-2 px-4 rounded-lg"
              onClick={() => addtoCart(product?._id)}
            >
              {' '}
              Add to cart
            </button>
        </div>
    </div>


    </>
  )
}
export default Product
