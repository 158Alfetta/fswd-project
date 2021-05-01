import { useParams } from "react-router"
import { PRODUCT_ID_QUERY } from '../graphql/productIdQuery'
import { useQuery } from "@apollo/client"
import DetailProduct from '../components/Product/DetailProduct'
import { useState } from 'react'

const ProductDetail = () => {
    const { productId } = useParams()
    const [itemCount, setItemCount] = useState(1)

    const { loading, error, data } = useQuery(PRODUCT_ID_QUERY, { variables: { id: productId } })
    if (loading) {
        return 'loading'
    }
    if (error) {
        return 'Error'
    }
    const product = data?.ProductId
    return (
        <div className="flex flex-row h-screen">
            <div className="flex flex-grow w-2/5 justify-center">
                <div className="pt-10">
                    <img className="object-contain h-4/5 w-4/5 rounded-xl" src={product?.image?.[0] || "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"}></img>
                </div>
            </div>
            <div className="flex-grow flex-col w-2/5 justify-center ">
                <div className="grid grid-rows-2 gap-20 pt-60 ">
                    <h2 className="text-4xl text-center">{product?.name}</h2>
                    <h2 className="text-2xl text-center">{product?.description}</h2>
                    <div className="border-t-2">
                        {product?.type === "PromotionProduct" ? <h2 className="text-2xl text-center pt-10"><del className="pr-3">{product?.price}</del>{parseInt(product?.price) *
                        (1 - parseFloat(product?.promotionDetail?.discount) / 100)} บาท</h2> 
                        : <h2 className="text-2xl text-center pt-10">{product?.price}</h2>}
                    </div>
                    <div className="flex justify-center ">
                        <span className="font-light text-2xl"><button className="pr-2 pl-4" onClick={() => setItemCount(itemCount > 0 ? itemCount - 1 : 0)}> - </button>{itemCount}<button className="pl-2" onClick={() => setItemCount(itemCount + 1)}> + </button>
                        </span>
                        <div className="inline-block pl-10">
                            <span className="text-2xl pr-10">{product?.count} left</span>
                            <button type="button" class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-green-800 hover:bg-green-600 hover:shadow-lg">Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductDetail