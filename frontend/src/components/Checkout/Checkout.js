import { react, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { CREATE_ORDER } from '../../graphql/OrderMutation'
import { QUERY_CART, QUERY_CART_ORDER} from "../../graphql/CartQuery";
import { CLEAR_CART } from '../../graphql/CartMutation'
import { useHistory } from 'react-router-dom'
import { useSession } from '../../contexts/SessionContext'

const Checkout = () => {
  const { user } = useSession();
  const { error, loading, data } = useQuery(QUERY_CART)
  const { data: dataOrder } = useQuery(QUERY_CART_ORDER)

  const [createOrder] = useMutation(CREATE_ORDER);
  const [clearCart] = useMutation(CLEAR_CART);
  let history = useHistory();

  async function ProcessPaymentBtn() {
    let dataOrderString = JSON.stringify(dataOrder)
    let dataOrderJSON = JSON.parse(dataOrderString)

    let productInfo = [...dataOrderJSON.cart[0].product]
    productInfo.map((obj) => delete obj.__typename)

    let dataCreateOrder = await createOrder({
      variables: {
        statusOrder: "Waiting",
        payment: "unspecify",
        product: productInfo,
        address: "addressline1 addressline2 city state/province postcode telephone"
      },
    });

    clearCart({
      variables:{
        userId: user?._id
      }
    })

    let orderId = dataCreateOrder?.data?.createOrder?.record?._id
    history.push('payment/' + orderId)
  }

  return (
    <>
      <div className="h-screen w-screen">
        <div className="grid grid-cols-10 w-full h-20 mb-7">
          <div className="col-span-3 border-b-2 border-yellow-800">
            <h2 className="font-sans text-left py-6 px-10 font-semibold text-3xl">Checkout</h2>
          </div>
        </div>


        
        <div className="m-3 p-2 bg-green-200 bg-opacity-30 rounded-xl w-full md:w-8/12 mx-auto grid grid-cols-10">
                  <h3 class="mt-2 p-1 pb-3 col-span-4  font-semibold text-gray-600 uppercase text-center border-gray-300 border-b-2">Product Details</h3>
                  <h3 class="mt-2 p-1 pb-3 col-span-2 font-semibold text-gray-600 uppercase text-center border-gray-300 border-b-2 ">Quantity</h3>
                  <h3 class="mt-2 p-1 pb-3 col-span-2 font-semibold text-gray-600 uppercase text-center border-gray-300 border-b-2 ">Price</h3>
                  <h3 class="mt-2 p-1 pb-3 col-span-2 font-semibold text-gray-600 uppercase text-center border-gray-300 border-b-2 ">Total</h3>
            {data?.cart[0]?.product.map((product) => {
              return (
                <>
                <div className="col-span-4 h-36 border-r border-gray-300 border-b grid grid-cols-2">
                    <div className="">
                      <img className="p-2" src={product?.productInfo?.image[0] || 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png'} />
                    </div>
                  <p className="text-center pt-10">{product?.productInfo?.name}</p>
                </div>
                <div className="col-span-2 h-36 border-r border-gray-300 border-b">
                    <p className="text-center pt-10">{product?.quantity}</p>
                </div>
                <div className="col-span-2 h-36 border-r border-gray-300 border-b">
                    <p className="text-center pt-10" >{product?.productInfo?.price}</p>
                </div>
                </>
              )
            })}
        </div>
      </div>

      <button
        onClick={() => ProcessPaymentBtn()}
        className="m-2 p-1 bg-gray-200 shadow-md hover:shadow-xl"
      >
        Go to Payment
      </button>
    </>
  )
}

export default Checkout
