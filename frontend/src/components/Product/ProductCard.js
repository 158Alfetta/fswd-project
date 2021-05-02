import { useQuery } from "@apollo/client"
import { PRODUCT_QUERY } from '../../graphql/productsQuery'
import { useSession } from '../../contexts/SessionContext'
import React, { Fragment} from 'react'
import Product from './Product'
import PromotionProduct from './PromotionProduct'

const ProductCard = () => {
    const { user } = useSession()
    const { loading, error, data } = useQuery(PRODUCT_QUERY)
    if (loading) {
        return 'loading'
    }
    if (error) {
        return 'Error'
    }


    return (
        <>
        <div className="h-screen w-screen grid grid-cols-5 ">

            <div className="col-span-2 border-b-2 border-yellow-800 mb-5">
              
              <h2 className="font-sans text-left py-6 px-10 font-semibold text-2xl">N E T T Y's Products</h2>

            </div>

            {/* Blank Space for other additional */}
            <div className="col-span-3"></div>

            {/* For menu bar */}
            <div className="bg-yellow-800 bg-opacity-10 mr-10">
                for Menuoption
            </div>

            <div className="m-5 px-auto py-auto md:m-2 col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 ">

                    {data?.Products?.map((product) => {
                        if (product?.type === 'PromotionProduct') {
                            return (
                                <PromotionProduct key={product?._id} product={product} />
                            )
                        }
                        if (product?.type === 'Product') {
                            return (
                                <Product key={product?._id} product={product} />
                                
                            )
                        }
                        return null
                    }
                    )}             
            </div>
        </div>
  
        </>
    )
}
export default ProductCard