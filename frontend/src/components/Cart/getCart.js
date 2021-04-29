import { React, useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_CART } from '../../graphql/CartQuery'
import { UPDATE_CART } from '../../graphql/CartMutation'
import { useSession } from '../../contexts/SessionContext'

const GetCart = () => {

    const { user } = useSession()
    const { data, refetch } = useQuery(QUERY_CART, { fetchPolicy: "no-cache" })
    // console.log(data)
    const [CartData, setCartData] = useState({ "cart": [] })

    useEffect(() => {
        if (data?.cart) {
            setCartData(data)
        }
    }, [data])

    // console.log(CartData)
    refetch()
    const refetchQuery = {
        refetchQueries: () => [
            {
                query: QUERY_CART,
                awaitRefetchQueries: true
            },
        ],
    }

    const [updateCart] = useMutation(UPDATE_CART, refetchQuery)
    var sum = 0

    function removeProduct(productId) {
        var temp = JSON.stringify(CartData?.cart[0]?.product)
        var inCart = JSON.parse(temp)
        var productIndex = inCart.findIndex((item) => item.productId === productId)

        inCart.splice(productIndex, 1)
        inCart.map((obj) => delete obj.__typename)
        inCart.map((obj) => delete obj.productInfo)
        return updateCart({ variables: { userId: user?._id, product: inCart } })
    }

    function Increase(productId) {
        var temp = JSON.stringify(CartData?.cart[0]?.product)
        var inCart = JSON.parse(temp)

        var productIndex = inCart.findIndex((item) => item.productId === productId)
        inCart[productIndex].quantity = Math.min(
            inCart[productIndex].quantity + 1,
            inCart[productIndex].productInfo.count
        )
        inCart.map((obj) => delete obj.__typename)
        inCart.map((obj) => delete obj.productInfo)
        return updateCart({ variables: { userId: user?._id, product: inCart } })
    }

    function Decrease(productId) {
        var temp = JSON.stringify(CartData?.cart[0]?.product)
        var inCart = JSON.parse(temp)

        var productIndex = inCart.findIndex((item) => item.productId === productId)
        if (inCart[productIndex].quantity === 1) {
            inCart.splice(productIndex, 1)
        } else {
            inCart[productIndex].quantity = Math.max(
                inCart[productIndex].quantity - 1,
                1
            )
        }
        inCart.map((obj) => delete obj.productInfo)
        inCart.map((obj) => delete obj.__typename)
        return updateCart({ variables: { userId: user?._id, product: inCart } })
    }

    function summary(a, b) {
        sum += a * b
        return a * b
    }
    // return (
    //     <div>{CartData.cart}</div>
    // )
    return (
        <div>
            {
                CartData?.cart?.map((item) => {
                    return (
                        <div key={item}>
                            {item?.product?.map((product) => {
                                return (
                                    <div key={product?.productId}>
                                        <span>
                                            Product Name: {product?.productInfo?.name} (
                      {product?.productInfo?.count} Remaining)
                      <br />
                                            <button
                                                className="m-2 p-1 bg-gray-200 py-2 px-4 shadow-md hover:shadow-xl"
                                                onClick={() => Decrease(product?.productId)}
                                            >
                                                {' '}
                        -{' '}
                                            </button>
                      Quantity: {product?.quantity}
                                            <button
                                                className="m-2 p-1 bg-gray-200 py-2 px-4 shadow-md hover:shadow-xl"
                                                onClick={() => Increase(product?.productId)}
                                            >
                                                {' '}
                        +{' '}
                                            </button>
                                            <div>
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => removeProduct(product?.productId)}
                                                >
                                                    {' '}
                          remove{' '}
                                                </button>{' '}
                                            </div>
                      Unitprice: {product?.productInfo?.price}
                                            <br />
                                            <b>
                                                Total:{' '}
                                                {summary(
                                                    product?.productInfo?.price,
                                                    product?.quantity
                                                )}
                                            </b>
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            <b> Summary: {sum} </b> <br />
            <a href="/checkout">
                {' '}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {' '}
          Proceed to checkout{' '}
                </button>
            </a>
        </div>
    )
}

export default GetCart
