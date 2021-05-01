import { react, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { CREATE_ORDER } from '../../graphql/OrderMutation'
import { QUERY_CART, QUERY_CART_ORDER} from "../../graphql/CartQuery";
import { CLEAR_CART } from '../../graphql/CartMutation'
import { useHistory } from 'react-router-dom'
import { useSession } from '../../contexts/SessionContext'
import CheckoutCard from './CheckoutCard'

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
        <div className="grid grid-cols-12 md:h-1/6 h-full pl-1 bg-red-200">
          CheckoutPage
        </div>


        
        <div className="m-3 p-2 bg-red-200 ">
          {data?.cart[0]?.product.map((product) => {
            return (
              <CheckoutCard product={product} />
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
