import { react, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_ORDER } from "../../graphql/OrderMutation";
import { QUERY_CART, QUERY_CART_ORDER } from "../../graphql/CartQuery";
import { CLEAR_CART } from "../../graphql/CartMutation";
import { useHistory } from "react-router-dom";
import { useSession } from "../../contexts/SessionContext";
import AddressForm from "./AddressForm";

const Checkout = () => {
  const { user } = useSession();


  const { error, loading, data } = useQuery(QUERY_CART);
  const { data: dataOrder } = useQuery(QUERY_CART_ORDER);

  const [createOrder] = useMutation(CREATE_ORDER);
  const [clearCart] = useMutation(CLEAR_CART);
  let history = useHistory();

  async function ProcessPaymentBtn() {
    let dataOrderString = JSON.stringify(dataOrder);
    let dataOrderJSON = JSON.parse(dataOrderString);

    let productInfo = [...dataOrderJSON.cart[0].product];
    productInfo.map((obj) => delete obj.__typename);

    let dataCreateOrder = await createOrder({
      variables: {
        statusOrder: "waiting",
        payment: "unspecify",
        product: productInfo,
        address:
          "addressline1 addressline2 city state/province postcode telephone",
        userId: user?._id
      },
    });

    clearCart({
      variables: {
        userId: user?._id,
      },
    });

    let orderId = dataCreateOrder?.data?.createOrder?.record?._id;
    history.push("payment/" + orderId);
  }

  return (
    <>
      <div className="h-screen w-screen">
        <div className="grid grid-cols-10 w-full h-20 mb-7">
          <div className="col-span-3 border-b-2 border-green-800">
            <h2 className="font-sans text-left py-6 px-10 font-semibold text-2xl">
              Checkout
            </h2>
          </div>
        </div>

        <div className="m-3 p-2 bg-green-200 bg-opacity-30 rounded-xl w-full md:w-8/12 mx-auto grid grid-cols-10">
          <h3 class="mt-2 p-1 pb-3 col-span-4  font-semibold text-gray-600 uppercase text-center border-gray-300 border-b-2">
            Product Details
          </h3>
          <h3 class="mt-2 p-1 pb-3 col-span-2 font-semibold text-gray-600 uppercase text-center border-gray-300 border-b-2 ">
            Quantity
          </h3>
          <h3 class="mt-2 p-1 pb-3 col-span-2 font-semibold text-gray-600 uppercase text-center border-gray-300 border-b-2 ">
            Price
          </h3>
          <h3 class="mt-2 p-1 pb-3 col-span-2 font-semibold text-gray-600 uppercase text-center border-gray-300 border-b-2 ">
            Total
          </h3>
          {data?.cart[0]?.product.map((product) => {
            const totalPrice =
              parseFloat(product?.quantity) *
              parseFloat(product?.productInfo?.price);
            return (
              <>
                <div className="col-span-4 h-36 border-gray-300 border-b grid grid-cols-2">
                  <div className="w-32">
                    <img
                      className="p-2"
                      src={
                        product?.productInfo?.image[0] ||
                        "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"
                      }
                    />
                  </div>
                  <p className="text-center pt-10">
                    {product?.productInfo?.name}
                  </p>
                </div>
                <div className="col-span-2 h-36 border-gray-300 border-b">
                  <p className="text-center pt-10">{parseFloat(product?.quantity).toLocaleString()}</p>
                </div>
                <div className="col-span-2 h-36 border-gray-300 border-b">
                  <p className="text-center pt-10">
                    {parseFloat(product?.productInfo?.price).toLocaleString()}
                  </p>
                </div>
                <div className="col-span-2 h-36 border-gray-300 border-b">
                  <p className="text-center pt-10">{totalPrice.toLocaleString()}</p>
                </div>
              </>
            );
          })}
        </div>

        {/* Panel of Address and shipping */}

        <div className="m-3 mb-10 p-2 bg-blue-200 bg-opacity-30 rounded-xl w-full md:w-8/12 mx-auto grid grid-cols-2">
          <div className="col-span-2">
            <h2 className="text-2xl font-semibold text-center text-gray-600 p-3 mb-3 uppercase">Address</h2>
            <AddressForm />
          </div>

          <div className="mt-3 p-2 rounded-xl shadow-md col-span-2 bg-yellow-100 bg-opacity-70 grid grid-cols-2">
            <h2 className="text-2xl font-semibold text-center pt-7 text-gray-600 p-3 mb-3 uppercase">
              shipping
            </h2>
            <div>
              <div className="m-2">
                <label class="block text-sm font-medium text-gray-700 uppercase pb-2">
                  Choose shipping method
                </label>
                <select class="block p-3 text-gray-600 w-full text-sm mb-2">
                  <option>Standard shipping - 50.00 THB </option>
                  <option>EMS - 90.00 THB </option>
                  <option>Door to Door - 200.00 THB </option>
                </select>
              </div>
            </div>

          </div>

          {/* Checkout Button */}

          <div className="mt-5 text-center col-span-2 flex justify-between">

            <a href="/cart" class="ml-5 flex font-semibold text-indigo-600 text-sm my-auto ">
              <svg class="fill-current mr-2 mt-0.5 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
              Back to Cart
            </a>

            <button
              onClick={() => ProcessPaymentBtn()}
              className="text-center mr-5 mb-2 py-2 px-4 w-3/12 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Checkout
            </button>
          </div>
        </div>





      </div>
    </>
  );
};

export default Checkout;
