import ProductCard from './ProductCard'
import {PROMOTION_PRODUCT_QUERY} from '../../graphql/promoProductIdQuery'
import { DELETE_PRODUCT_MUTATION } from '../../graphql/deleteProductById'
import { useQuery, useMutation } from '@apollo/client'
import { Fragment, useCallback} from 'react'
import { useSession } from '../../contexts/SessionContext'
import { QUERY_CART } from '../../graphql/CartQuery'
import { UPDATE_CART } from '../../graphql/CartMutation'


const PromotionProduct = (props) => {
    const {product} = props
    const productId = product._id
    const { user } = useSession()
    const { data:dataCart } = useQuery( QUERY_CART, {variables: {userId: user?._id}} )
    const [[deleteProduct]] = [useMutation(DELETE_PRODUCT_MUTATION)]
    const handleButtonClick = useCallback((e) =>  {
        try {
            console.log(product?._id)
            deleteProduct({variables:{id:product?._id}})
        }
        catch (err){
            console.log(JSON.stringify(err))
        }
    }, [])

    const refetchQuery = {refetchQueries: [{
        query: QUERY_CART,
        variables: {userId: user?._id}
    }]
}
    const { loading, error, data } = useQuery(PROMOTION_PRODUCT_QUERY, {variables: {id: productId}})
    const [updateCart] = useMutation(UPDATE_CART, refetchQuery)

    if (loading){
        return 'Loading...'
    }
    if (error){
        return 'Error'
    }


    function addtoCart(productId){
        var temp = JSON.stringify(dataCart.cart[0].product)
        var inCart = JSON.parse(temp)
        
        var newProduct = {
            productId: productId,
            quantity: 1
          }
        var productIndex = inCart.findIndex((item) => item.productId === productId)

        if (productIndex === -1){
            inCart = [...inCart, newProduct]
        }else{
            inCart[productIndex].quantity = Math.min(inCart[productIndex].quantity + 1, inCart[productIndex].productInfo.count)
        }
        inCart.map((obj) => delete obj.productInfo)
        inCart.map((obj) => delete obj.__typename)
        return updateCart({variables: {userId: user?._id, product: inCart}})
    }

    let finalPrice = parseInt(data?.PromotionProductId?.price)*(1-(parseFloat(data?.PromotionProductId?.discount)/100))
    return (
        <div>
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <img class="w-full" src="https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png" alt="" />
                <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{data?.PromotionProductId?.name}</div>
                <p class="text-gray-700 text-base">
                    <del>{data?.PromotionProductId?.price}       </del>
                    {finalPrice}
                </p>
                </div>
            </div>
            <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data?.PromotionProductId?.discount} % off</span>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => addtoCart(product?._id)}> Add to cart</button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleButtonClick}>
                    Remove Product
                </button>
            </div>
      </div>
    )
}
export default PromotionProduct