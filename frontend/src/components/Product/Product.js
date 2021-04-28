import ProductCard from './ProductCard'

import { DELETE_PRODUCT_MUTATION } from '../../graphql/deleteProductById'
import { useCallback, useState } from 'react'
import { useMutation } from '@apollo/client'
const Product = (props) => {
    const {product} = props
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
    return (
        <div>
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <img class="w-full" src={product?.image[0]} alt="Sunset in the mountains" />
                <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{product?.name}</div>
                <p class="text-gray-700 text-base">
                    {product?.price}
                </p>
                </div>
            </div>
            <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" >Add to cart</span>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleButtonClick}>
                    Remove Product
                </button>
            </div>
      </div>
    )
}
export default Product