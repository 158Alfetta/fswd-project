import { React } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_CART } from '../../graphql/CartQuery'
import { RESET_CART, CLEAR_CART, UPDATE_CART } from '../../graphql/CartMutation'
import { useSession } from '../../contexts/SessionContext'
import DiscountBox from './DiscountBox'

const GetCart = () => {
  const { user } = useSession()
  const { data } = useQuery(QUERY_CART)

  const refetchQuery = {
    refetchQueries: [
      {
        query: QUERY_CART
      },
    ],
  }
  const [resetCart] = useMutation(RESET_CART, refetchQuery)
  const [clearCart] = useMutation(CLEAR_CART, refetchQuery)
  const [updateCart] = useMutation(UPDATE_CART, refetchQuery)

  var sum = 0

  function reset_Cart() {
    return resetCart({ variables: { userId: user?._id } })
  }

  function clear_Cart() {
    return clearCart({ variables: { userId: user?._id } })
  }

  function addProduct(productId) {
    var temp = JSON.stringify(data?.cart[0]?.product)
    var inCart = JSON.parse(temp)

    var newProduct = {
      productId: productId,
      quantity: 1,
    }
    var productIndex = inCart.findIndex((item) => item.productId === productId)

    if (productIndex === -1) {
      inCart = [...inCart, newProduct]
    } else {
      inCart[productIndex].quantity = Math.min(
        inCart[productIndex].quantity + 1,
        inCart[productIndex].productInfo.count
      )
    }
    inCart.map((obj) => delete obj.productInfo)
    inCart.map((obj) => delete obj.__typename)
    return updateCart({ variables: { userId: user?._id, product: inCart } })
  }

  function removeProduct(productId) {
    var temp = JSON.stringify(data?.cart[0]?.product)
    var inCart = JSON.parse(temp)
    var productIndex = inCart.findIndex((item) => item.productId === productId)

    inCart.splice(productIndex, 1)
    inCart.map((obj) => delete obj.__typename)
    inCart.map((obj) => delete obj.productInfo)
    return updateCart({ variables: { userId: user?._id, product: inCart } })
  }

  function Increase(productId) {
    var temp = JSON.stringify(data?.cart[0]?.product)
    var inCart = JSON.parse(temp)

    var productIndex = inCart.findIndex((item) => item.productId === productId)
      inCart[productIndex].quantity = Math.min(
      inCart[productIndex].quantity + 1,
      inCart[productIndex].productInfo.count
    )

    // for (var index=0;index<inCart.length;index++){
    //     if (inCart[index].productId === productId){
    //         if (inCart[index].quantity < inCart[index].productInfo.count){
    //             inCart[index].quantity += 1
    //         }else{
    //             console.log("Limit")
    //         }
    //         break;
    //     }
    // }
    inCart.map((obj) => delete obj.__typename)
    inCart.map((obj) => delete obj.productInfo)
    return updateCart({ variables: { userId: user?._id, product: inCart } })
  }

  function Decrease(productId) {
    var temp = JSON.stringify(data?.cart[0]?.product)
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

    // for (var index=0;index<inCart.length;index++){
    //     if (inCart[index].productId === productId){
    //         if (inCart[index].quantity > 1){
    //             inCart[index].quantity -= 1
    //         }
    //         else if(inCart[index].quantity === 1){
    //             console.log("remove")
    //         }
    //         break;
    //     }
    // }
    inCart.map((obj) => delete obj.productInfo)
    inCart.map((obj) => delete obj.__typename)
    return updateCart({ variables: { userId: user?._id, product: inCart } })
  }

  function summary(a, b) {
    sum += a * b
    return a * b
  }

  return (
    <div>
      {data &&
        data.cart.map((item) => {
          return (
            <div key={item}>
              {item.product.map((product) => {
                return (
                  <div key={product.productId}>
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
      {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={clear_Cart} > CLEARCART (for test only) </button> <br/> */}
      {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={reset_Cart} > RESET TO 2 ITEMS (for test only) </button> <br/> */}
      {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => addProduct("6076ba3bd238cb0bde017e1e")}> ADD FFF3 </button> <br/> */}
      {/* <DiscountBox/> */}
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
