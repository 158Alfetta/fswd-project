import { PROMOTION_PRODUCT_QUERY } from '../../graphql/promoProductIdQuery'
import { DELETE_PRODUCT_MUTATION } from '../../graphql/deleteProductById'
import { useQuery, useMutation } from '@apollo/client'
import { Fragment, useCallback } from 'react'
import { useSession } from '../../contexts/SessionContext'
import { QUERY_CART } from '../../graphql/CartQuery'
import { UPDATE_CART } from '../../graphql/CartMutation'
import { Link } from 'react-router-dom'
const PromotionProduct = (props) => {
  const { product } = props
  const productId = product._id
  const { user } = useSession()
  const { data: dataCart, refetch } = useQuery(QUERY_CART, {
    variables: { userId: user?._id },
  })
  const [[deleteProduct]] = [useMutation(DELETE_PRODUCT_MUTATION)]
  const handleButtonClick = useCallback((e) => {
    try {
      console.log(product?._id)
      deleteProduct({ variables: { id: product?._id } })
    } catch (err) {
      console.log(JSON.stringify(err))
    }
  }, [])

  const refetchQuery = {
    refetchQueries: [
      {
        query: QUERY_CART,
      },
    ],
  }
  const { loading, error, data } = useQuery(PROMOTION_PRODUCT_QUERY, {
    variables: { id: productId },
  })
  const [updateCart] = useMutation(UPDATE_CART, refetchQuery)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return 'Error'
  }
  // console.log(data?.PromotionProductId)
  function addtoCart(productId) {
    var temp = JSON.stringify(dataCart?.cart[0]?.product)
    var inCart = JSON.parse(temp)

    var newProduct = {
      productId: productId,
      quantity: 1,
    }
    var productIndex = inCart.findIndex((item) => item.productId === productId)

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

  let finalPrice =
    parseInt(data?.PromotionProductId?.price) *
    (1 - parseFloat(data?.PromotionProductId?.promotionDetail?.discount) / 100)
  return (
    <>
      <div className="bg-yellow-800 bg-opacity-10 rounded-lg shadow-lg h-full w-full">
        <Link to={'/product/' + data?.PromotionProductId?._id}>
          <div className="rounded-tl-lg rounded-tr-lg w-50 h-64">
            <img
              className="w-full h-full rounded-tl-lg rounded-tr-lg"
              src={
                product?.image?.[0] ||
                'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png'
              }
              alt="Sunset in the mountains"
            />
          </div>

          <div className="grid grid-cols-2 p-3">
            <div className="font-semibold text-lg">
              {data?.PromotionProductId?.name}
            </div>
            <p className="text-gray-700 text-right">
              <del>
                {parseFloat(data?.PromotionProductId?.price).toLocaleString()}
              </del>{' '}
              {finalPrice.toLocaleString()}
            </p>
          </div>
        </Link>

        {/* Button and discount panel */}
        <div className="bg-yellow-500 bg-opacity-100 rounded-bl-lg rounded-br-lg flex justify-between">
          <span className="bg-purple-600 animate-pulse text-white font-extrabold m-2 py-2 px-4 rounded-full">
            {data?.PromotionProductId?.promotionDetail?.discount} % off
          </span>

          <button
            className="bg-green-600 hover:bg-green-800 text-white font-bold m-2 py-2 px-4 rounded-lg"
            onClick={() => addtoCart(product?._id)}
          >
            {' '}
            Add to cart
          </button>
        </div>

        {/* <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {data?.PromotionProductId?.promotionDetail?.discount} % off
        </span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => addtoCart(product?._id)}
        >
          {' '}
          Add to cart
        </button>
      </div> */}
      </div>
    </>
  )
}
export default PromotionProduct
