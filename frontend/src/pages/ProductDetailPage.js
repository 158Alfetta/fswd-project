import { useParams } from "react-router"
import { PRODUCT_ID_QUERY } from '../graphql/productIdQuery'
import { useQuery } from "@apollo/client"
import { useState, useEffect } from 'react'

const ProductDetail = () => {
    const { productId } = useParams()
    const [itemCount, setItemCount] = useState(1)
    const [images, setImages] = useState([])
    const [imageIndex, setImageIndex] = useState(0)



    const { loading, error, data } = useQuery(PRODUCT_ID_QUERY, { variables: { id: productId } })

    useEffect(() => {
        const imagesList = data?.ProductId?.image || []
        setImages(imagesList)
      }, []);
    if (loading) {
        return 'loading'
    }
    if (error) {
        return 'Error'
    }
    const product = data?.ProductId
    var imageCount = product?.image?.length

    const addImageIndex = () => {
        setImageIndex((imageIndex+1)%imageCount)
    }
    const decreseImageIndex = () => {
        setImageIndex((((imageIndex-1)%imageCount)+imageCount)%imageCount)
    }
    return (
        <div className="flex flex-row h-screen">
            <div className="flex flex-grow w-2/5 justify-center">
                <div className="pt-10">
                    <img className="object-contain h-4/5 w-96 rounded-xl" src={ product?.image?.[imageIndex] || "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"}></img>
                    <div>
                        <button onClick={decreseImageIndex} type="button" className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-green-800 hover:bg-green-600 hover:shadow-lg">
                            back
                        </button>
                        <button onClick={addImageIndex} type="button" className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-green-800 hover:bg-green-600 hover:shadow-lg">
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-grow flex-col w-2/5 justify-center ">
                <div className="grid grid-rows-2 gap-20 pt-60 ">
                    <h2 className="text-4xl text-center">{product?.name}</h2>
                    <h2 className="text-2xl text-center">{product?.description}</h2>
                    <div className="border-t-2">
                        {product?.type === "PromotionProduct" ? <h2 className="text-2xl text-center pt-10"><del className="pr-3">{product?.price}</del>{parseInt(product?.price) *
                        (1 - parseFloat(product?.promotionDetail?.discount) / 100)} THB</h2> 
                        : <h2 className="text-2xl text-center pt-10">{product?.price} THB</h2>}
                    </div>
                    <div className="flex justify-center ">
                        <span className="font-light text-2xl"><button className="pr-2 pl-4" onClick={() => setItemCount(itemCount > 0 ? itemCount - 1 : 0)}> - </button>{itemCount}<button className="pl-2" onClick={() => setItemCount(itemCount + 1)}> + </button>
                        </span>
                        <div className="pl-10">
                            <span className="text-red-500 text-2xl pr-10">{product?.count} left</span>
                            <button type="button" className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-green-800 hover:bg-green-600 hover:shadow-lg">Add to cart</button>
                        </div>
                        <div className="text-3xl text-center">{product?.category}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductDetail