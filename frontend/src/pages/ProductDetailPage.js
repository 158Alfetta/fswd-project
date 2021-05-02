import { useParams } from "react-router"
import { PRODUCT_ID_QUERY } from '../graphql/productIdQuery'
import { useMutation, useQuery } from "@apollo/client"
import { useState, useEffect } from 'react'
import { useSession } from "../contexts/SessionContext"
import { UPDATE_CART } from '../graphql/CartMutation'
import { QUERY_CART } from '../graphql/CartQuery'

const ProductDetail = () => {
    const { productId } = useParams()
    const [itemCount, setItemCount] = useState(1)
    const [images, setImages] = useState([])
    const [imageIndex, setImageIndex] = useState(0)
    const { user } = useSession()
    const { loading, error, data } = useQuery(PRODUCT_ID_QUERY, { variables: { id: productId } })
    const [updateCart] = useMutation(UPDATE_CART)
    const { data: CartData } = useQuery(QUERY_CART, { fetchPolicy: "no-cache" })


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
    const imageCount = product?.image?.length

    function addtoCart(productId) {
        var temp = JSON.stringify(CartData?.cart[0]?.product)
        var inCart = JSON.parse(temp)

        var newProduct = {
            productId: productId,
            quantity: itemCount,
        }
        var productIndex = inCart.findIndex((item) => item?.productId === productId)

        if (productIndex === -1) {
            inCart = [...inCart, newProduct]
        } else {
            inCart[productIndex].quantity = Math.min(
                inCart[productIndex].quantity + itemCount,
                inCart[productIndex].productInfo.count
            )
        }
        inCart.map((obj) => delete obj.productInfo)
        inCart.map((obj) => delete obj.__typename)
        return updateCart({ variables: { userId: user?._id, product: inCart } })
    }

    const nextImage = () => {
        setImageIndex((imageIndex + 1) % imageCount)
    }
    const prevImage = () => {
        setImageIndex((((imageIndex - 1) % imageCount) + imageCount) % imageCount)
    }
    return (
        <div className="flex flex-row h-screen">
            <div className="flex flex-grow w-2/5 justify-center">
            <button onClick={prevImage} type="button" className="my-auto h-10 focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-green-800 hover:bg-green-600 hover:shadow-lg">
                            back
                        </button>
                <div className="pt-10">
                    <img className="object-contain h-3/4 w-96 " src={product?.image?.[imageIndex] || "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"}></img>
                </div>
                <button onClick={nextImage} type="button" className="my-auto h-10 focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-green-800 hover:bg-green-600 hover:shadow-lg">
                            Next
                        </button>
            </div>
            <div className="flex-grow flex-col w-2/5 justify-center ">
                <div className="grid grid-rows-2 gap-20 pt-60 ">
                    <h2 className="text-4xl text-center">{product?.name}</h2>
                    <h2 className="text-2xl text-center">{product?.description}</h2>
                    <div className="border-t-2">
                        {product?.type === "PromotionProduct" ? <h2 className="text-2xl text-center pt-10"><del className="pr-3">{product?.price}</del>{parseFloat(product?.price) *
                            (1 - parseFloat(product?.promotionDetail?.discount) / 100).toLocaleString()} THB</h2>
                            : <h2 className="text-2xl text-center pt-10">{parseFloat(product?.price).toLocaleString()} THB</h2>}
                    </div>
                    <div className="flex justify-center ">
                        <span className="font-light text-2xl"><button className="pr-2 pl-4" onClick={() => setItemCount(itemCount > 1 ? itemCount - 1 : 1)}> - </button>{itemCount}<button className="pl-2" onClick={() => setItemCount(itemCount + 1 <= product?.count ? itemCount + 1 : product?.count)}> + </button>
                        </span>
                        <div className="pl-10">
                            <span className="text-red-500 text-2xl pr-10">{product?.count.toLocaleString()} left</span>
                            <button type="button" className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-green-800 hover:bg-green-600 hover:shadow-lg" onClick={() => addtoCart(product?._id)} >Add to cart</button>
                        </div>
                        <div className="text-3xl text-center">{product?.category}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductDetail