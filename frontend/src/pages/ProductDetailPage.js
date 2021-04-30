import { useParams } from "react-router"
import { PRODUCT_ID_QUERY } from '../graphql/productIdQuery'
import { useQuery } from "@apollo/client"
import DetailProduct from '../components/Product/DetailProduct'
import { useState } from 'react'

const ProductDetail = () => {
    const { productId } = useParams()
    const [itemCount, setItemCount] = useState(0)

    const handleItemCountChange  = (prev) => {

    }

    const { loading, error, data } = useQuery(PRODUCT_ID_QUERY, { variables: { id: productId } })
    if (loading) {
        return 'loading'
    }
    if (error) {
        return 'Error'
    }
    const product = data?.ProductId
    return (
        <div className="flex flex-row h-screen divide-x">
            <div className="flex flex-grow w-2/5 justify-center">
                <div className="pt-10">
                    <img className="object-contain h-4/5 w-4/5 rounded-xl" src={product?.image?.[0]}></img>
                </div>
            </div>
            <div className="flex-grow flex-col w-2/5 justify-center ">
                <div className="grid grid-rows-2 gap-20 pt-80 divide-y-2">
                    <h2 className="text-4xl text-center m">{product?.name}</h2>
                    <h2 className="text-2xl text-center">{product?.description}</h2>
                    {product?.type === "PromotionProduct" ? <h2 className="text-2xl text-center">{parseInt(product?.price) *
                    (1 - parseFloat(product?.promotionDetail?.discount) / 100)} from {product?.price}</h2> 
                    : <h2 className="text-2xl text-center">{product?.price}</h2>}
                    <div className="flex text-center">
                        <button className="flex-1">1</button>
                        <input
                            className="flex-8 w-3/5 h-10 rounded border px-3 focus:text-black focus:border-blue-100"
                            type="number"
                            name="count"
                            // value={newProduct.count}
                            // onChange={handleInputChange}
                            min="0"
                            placeholder="Your current product quantity"
                            autoComplete="off"
                            required
                        />
                        <div className="flex-1">1</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductDetail