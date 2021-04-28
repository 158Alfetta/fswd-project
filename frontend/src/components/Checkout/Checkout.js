import { react, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { CREATE_ORDER } from '../../graphql/createOrder'
import { QUERY_CART, QUERY_CART_ORDER} from "../../graphql/CartQuery";
import { CLEAR_CART } from '../../graphql/CartMutation'
import { useHistory } from 'react-router-dom'
import { useSession } from '../../contexts/SessionContext'

const Checkout = () => {
  const { user } = useSession();
  const { error, loading, data } = useQuery(QUERY_CART, {
    variables: { userId: user?._id },
  });
  const { data: dataOrder } = useQuery(QUERY_CART_ORDER, {
    variables: { userId: user?._id },
  });

  const [createOrder] = useMutation(CREATE_ORDER);
  const [clearCart] = useMutation(CLEAR_CART);
  let history = useHistory();

  async function ProcessPaymentBtn() {
    let dataOrderString = JSON.stringify(dataOrder)
    let dataOrderJSON = JSON.parse(dataOrderString)

    let a = [...dataOrderJSON.cart[0].product]
    a.map((obj) => delete obj.__typename)

    let dataCreateOrder = await createOrder({
      variables: {
        userId: user?._id,
        statusOrder: "waiting",
        payment: "unspecify",
        product: a,
      },
    });

    clearCart()

    let orderId = dataCreateOrder?.data?.createOrder?.record?._id
    history.push('payment/' + orderId)
  }

  if (user) {
    return (
      <>
        <div className="flex">
          <div className="m-3 p-2 bg-red-200 ">
            {data?.cart[0]?.createdByUser?.firstName}{' '}
            {data?.cart[0]?.createdByUser?.lastName}
            {data?.cart[0]?.product.map((product) => {
              return (
                <div key={product} className="m-1 p-2 bg-green-200">
                  <ul>
                    <li key="productID">
                      <b>Productid</b>
                      <br />
                      {product?.productId}
                    </li>
                    <li>
                      <b>name</b>
                      <br />
                      {product?.productInfo?.name}
                    </li>
                    <li>
                      <b>Price</b>
                      <br />
                      {product?.productInfo?.price}
                    </li>
                    <li>
                      <b>Stock</b>
                      <br />
                      {product?.productInfo?.count}
                    </li>
                    <li>
                      <b>Quantity</b>
                      <br />
                      {product?.quantity}
                    </li>
                  </ul>
                </div>
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
  } else {
    return (
      <>
        <div className="w-screen h-screen mx-auto my-auto text-2xl align-middle p-3">
          {'Invalid Session, Please Login First!'}
        </div>
      </>
    )
  }
}

export default Checkout
