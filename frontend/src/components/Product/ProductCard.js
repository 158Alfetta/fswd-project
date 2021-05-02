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
        <Fragment>
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
        </Fragment>
    )
}
export default ProductCard