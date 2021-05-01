import { useQuery } from "@apollo/client"
import { PRODUCT_QUERY } from '../../graphql/productsQuery'
import { useSession } from '../../contexts/SessionContext'
import React, { Fragment} from 'react'
import Product from './Product'
import {Link} from 'react-router-dom'
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
    // console.log(data)
    return (
        <Fragment>
            {data?.Products?.map((product) => {
                if (product?.type === 'PromotionProduct') {
                    return (
                        <Link to={"/product/" + product?._id}>
                            <PromotionProduct key={product?._id} product={product} />
                        </Link>
                    )
                }
                if (product?.type === 'Product') {
                    return (
                        <Link to={"/product/" + product?._id}>
                            <Product key={product?._id} product={product} />
                        </Link>
                        
                    )
                }
                return null
            }
            )}
        </Fragment>
    )
}
export default ProductCard