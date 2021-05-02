import { React } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_CART } from '../../graphql/CartQuery'
import { UPDATE_CART } from '../../graphql/CartMutation'
import { useSession } from '../../contexts/SessionContext'

const GetCart = () => {
    const { user } = useSession()
    const { data: CartData, refetch } = useQuery(QUERY_CART, { fetchPolicy: "no-cache" })
    refetch()

    const refetchQuery = {
        refetchQueries: () => [
            {
                query: QUERY_CART,
                awaitRefetchQueries: true
            },
        ],
    }

    const [updateCart] = useMutation(UPDATE_CART)
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
    inCart.map((obj) => delete obj.productInfo)
    inCart.map((obj) => delete obj.__typename)
    return updateCart({ variables: { userId: user?._id, product: inCart } })
  }

  function summary(a, b) {
    sum += a * b
    return a * b
  }
  return (
    <>
      <div className="grid grid-cols-10 w-full h-20 mb-7">
        <div className="col-span-3 border-b-2 border-green-800">
          <h2 className="font-sans text-left py-6 px-10 font-semibold text-2xl">
            {user?.username}'s Shopping Cart
          </h2>
        </div>

        <div className="col-span-5"></div>

        <div className="col-span-2 flex flex-col justify-around">
          <h2 className="font-semibold text-xl text-center">
            {CartData?.cart[0]?.product?.length} Item(s)
          </h2>
        </div>
      </div>

      <div className=" mx-8 my-5">
        <div class="flex mt-10 mb-5">
          <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">
            Product Details
          </h3>
          <h3 class="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
            Quantity
          </h3>
          <h3 class="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
            Price
          </h3>
          <h3 class="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
            Total
          </h3>
        </div>
      </div>

      {CartData?.cart?.map((item) => {
        return (
          <div key={item}>
            {item?.product?.map((product) => {
              return (
                <div class="flex items-center hover:bg-gray-100 mx-8 px-6 py-5 border-b">
                  <div class="flex w-2/5">
                    <div class="w-20">
                      <img
                        style={{ width: '10vw' }}
                        class="h-24"
                        src={
                          product?.productInfo?.image[0] ||
                          'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png'
                        }
                      />
                    </div>
                    <div class="flex flex-col justify-between ml-4 flex-grow">
                      <span class="font-bold text-sm">
                        {product?.productInfo?.name}
                      </span>
                      <span class="text-red-500 text-xs">
                        {product?.productInfo?.count.toLocaleString()} Remaining
                      </span>
                      <a
                        href="#"
                        class="font-semibold hover:text-red-500 text-gray-500 text-xs"
                      >
                        {' '}
                        <button
                          onClick={() => removeProduct(product?.productId)}
                        >
                          {' '}
                          Remove{' '}
                        </button>
                      </a>
                    </div>
                  </div>

                  <div class="flex justify-center w-1/5">
                    <span className="font-light">
                      <button onClick={() => Decrease(product?.productId)}>
                        -
                      </button>
                    </span>

                    <input
                      class="disabled:opacity-50 mx-2 border text-center w-8"
                      type="text"
                      value={product?.quantity.toLocaleString()}
                    />

                    <span className="font-light">
                      <button onClick={() => Increase(product?.productId)}>
                        +
                      </button>
                    </span>
                  </div>

                  <span class="text-center w-1/5 font-semibold text-sm">
                    {parseFloat(product?.productInfo?.price).toLocaleString()}
                  </span>
                  <span class="text-center w-1/5 font-semibold text-sm">
                    {summary(
                      product?.productInfo?.price,
                      product?.quantity
                    ).toLocaleString()}
                  </span>
                </div>
              )
            })}

            <div className="flex justify-center">
              <div
                id="summary"
                class="w-full md:w-3/5 m-5 px-8 py-10 bg-opacity-10 bg-gray-500 rounded-xl"
                style={{ float: 'left' }}
              >
                <h1 class="font-semibold text-2xl pb-8">Order Summary</h1>
                <div class="flex justify-between mt-10 mb-5">
                  <span class="font-semibold text-sm uppercase">
                    Item(s): {CartData?.cart[0]?.product?.length}
                  </span>
                  <span class="font-semibold text-sm">
                    {sum.toLocaleString()}
                  </span>
                </div>

                <div class="border-t mt-8">
                  <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Total cost</span>
                    <span>{(sum + 50).toLocaleString()} Baht</span>
                  </div>
                  <a href="checkout">
                    <button class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                      Checkout
                    </button>
                  </a>
                </div>
            </div>

            {
                CartData?.cart?.map((item) => {
                    return (
                        <div key={item}>
                            {item?.product?.map((product) => {
                                const discount = 1-parseFloat(product?.productInfo?.promotionDetail?.discount)/100 || 1
                                // console.log(discount)
                                return (
                                    <div class="flex items-center hover:bg-gray-100 mx-8 px-6 py-5 border-b">
                                        <div class="flex w-2/5">
                                            <div class="w-20">
                                                <a href={"/product/" + product?.productId}><img style={{ width: '10vw' }} class="h-24" src={product?.productInfo?.image[0] || 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png'} /></a>
                                            </div>
                                            <div class="flex flex-col justify-between ml-4 flex-grow">
                                                <span class="font-bold text-sm">{product?.productInfo?.name}</span>
                                                <span class="text-red-500 text-xs">{product?.productInfo?.count.toLocaleString()} Remaining</span>
                                                <a href="#" class="font-semibold hover:text-red-500 text-gray-500 text-xs"> <button onClick={() => removeProduct(product?.productId)}> Remove </button></a>
                                            </div>
                                        </div>

                                        <div class="flex justify-center w-1/5">
                                            <span className="font-light"><button onClick={() => Decrease(product?.productId)}>-</button></span>

                                            <input class="disabled:opacity-50 mx-2 border text-center w-8" type="text" value={product?.quantity.toLocaleString()} />

                                            <span className="font-light"><button onClick={() => Increase(product?.productId)}>+</button></span>

                                        </div>

                                        <span class="text-center w-1/5 font-semibold text-sm">{(parseFloat(product?.productInfo?.price)*discount).toLocaleString()}</span>
                                        <span class="text-center w-1/5 font-semibold text-sm">{summary(product?.productInfo?.price*discount, product?.quantity).toLocaleString()}</span>




                                    </div>

                                )
                            })}

                            <div className="flex justify-center">
                                <div id="summary" class="w-full md:w-3/5 m-5 px-8 py-10 bg-opacity-10 bg-gray-500 rounded-xl" style={{float:"left"}}>
                                    <h1 class="font-semibold text-2xl pb-8">Order Summary</h1>
                                    <div class="flex justify-between mt-10 mb-5">
                                        <span class="font-semibold text-sm uppercase">Item(s): {CartData?.cart[0]?.product?.length}</span>
                                        <span class="font-semibold text-sm">{sum.toLocaleString()}</span>
                                    </div>

                                    <div class="border-t mt-8">
                                        <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                                            <span>Total cost</span>
                                            <span>{sum.toLocaleString()} Baht</span>
                                        </div>
                                        <div className="flex justify-center">
                                        <a href="checkout"><button class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-48">Proceed to Checkout</button></a>
                                        </div>
                                    </div>
                                    
                                    <a href="/products" class="flex font-semibold text-indigo-600 text-sm mt-10">
                                        <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                                        Continue Shopping
                                    </a>
                                </div>

                            </div>

                        </div>
                    )
                })}

        </>
    )
}

export default GetCart
