import { PROMOTION_PRODUCT_QUERY } from '../../../../graphql/promoProductIdQuery'
import { DELETE_PRODUCT_MUTATION } from '../../../../graphql/deleteProductById'
import { useMutation, useQuery } from '@apollo/client'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'

const PromotionProduct = (props) => {
  const { product } = props
  const productId = product._id
  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION)
  const { loading, error, data } = useQuery(PROMOTION_PRODUCT_QUERY, {
    variables: { id: productId },
  })

  const handleButtonClick = useCallback(async (e) => {
    try {
      await deleteProduct({ variables: { id: product?._id } })
    } catch (err) {
      console.log(JSON.stringify(err))
    }
  }, [])

  const callTwoFunctions = () => {
    handleButtonClick()
    props.clicked()
  }

  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return 'Error'
  }

  let finalPrice =
    parseInt(data?.PromotionProductId?.price) *
    (1 - parseFloat(data?.PromotionProductId?.promotionDetail?.discount) / 100)
  return (
    <div>
      <div className="max-w-sm m-2 rounded overflow-hidden shadow-lg">
        <img
          className="w-full h-80"
          src={
            data?.PromotionProductId?.image?.[0] ||
            'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png'
          }
          alt=""
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            {data?.PromotionProductId?.name}
          </div>
          <p className="text-gray-700 text-base">
            {parseFloat(finalPrice) ? (
              <span>
                <del>
                  {parseFloat(data?.PromotionProductId?.price).toLocaleString()}
                </del>{' '}
                {finalPrice.toLocaleString()}
              </span>
            ) : (
              <span>
                {parseFloat(data?.PromotionProductId?.price).toLocaleString()}
              </span>
            )}
          </p>
          <div className="whitespace-nowrap text-right text-sm font-medium">
            <span
              className="cursor-pointer text-red-600 hover:text-red-900 mr-5"
              onClick={callTwoFunctions}
            >
              Remove
            </span>
            <Link
              to={'/dashboard/update-product/' + data?.PromotionProductId?._id}
            >
              <span className="cursor-pointer	 text-indigo-600 hover:text-indigo-900">
                Edit
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PromotionProduct
