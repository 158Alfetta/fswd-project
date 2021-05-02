import { React, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ORDER_BY_ID } from "../../graphql/OrderQuery";
import PaymentCard from "./PaymentCard"
import { PROCEED_PAYMENT_MUTATION } from "../../graphql/OrderMutation";
import { useHistory, useParams } from "react-router-dom";
import { UPDATE_STOCK_BY_ID } from "../../graphql/ProductMutation"



const Payment = () => {
  let { orderId } = useParams();
  let history = useHistory();

  const { error, loading, data } = useQuery(QUERY_ORDER_BY_ID, {
    variables: {_id: orderId},
  });

  const [proceedPayment] = useMutation(PROCEED_PAYMENT_MUTATION);
  const [updateStock] = useMutation(UPDATE_STOCK_BY_ID)

  const [pmChoice, setPmChoice] = useState('unspecify')

  const handlePmChoice = (e) => {
    setPmChoice(e.target.value)
  }

  // console.log(pmChoice)
 
  async function proceedPaymentBtn(PaymentMethod){

    if (PaymentMethod === "unspecify"){
      alert("Please Specify Your Payment!")
    }

    else{
      var productDetail = data?.findOrderbyId?.product
      for (var index=0; index < productDetail.length ;index++){
        var productId = (productDetail?.[index]?.productId)
        var productStock = (productDetail?.[index]?.productInfo?.count)
        var buy = (productDetail?.[index]?.quantity)
        var newStock = productStock-buy
        await updateStock({ variables: { id: productId, stock: newStock } })
      }
      let result = await proceedPayment({
        variables: {
          _id: orderId,
          statusOrder: "success",
          paymentDetail: PaymentMethod,
        },
      });
      history.push('/order')
    }
  }

  return(
    <>

    <div className="h-screen w-screen">
      {/* HEADER */}
      <div className="grid grid-cols-10 w-full h-20 mb-7">
          <div className="col-span-3 border-b-2 border-indigo-900">
            <h2 className="font-sans text-left py-6 px-10 font-semibold text-2xl">
              Payment
            </h2>
          </div>
      </div>

      {/* PAYMENT CARD */}
      <div className="m-3 p-2 bg-indigo-200 bg-opacity-30 rounded-xl w-full md:w-8/12 mx-auto grid grid-cols-2">
        <div className="m-2 bg-blue-200 bg-opacity-70 rounded-xl h-28">
          <h3 className="text-gray-700 uppercase font-bold text-lg text-center p-3">Payment Method</h3>
          <div onChange={handlePmChoice} className="flex justify-around mt-2">
            <p><input type="radio" value="Debit" name="paymentMethod" /> Debit</p>
            <p><input type="radio" value="Credit" name="paymentMethod" /> Credit</p>
            <p><input type="radio" value="Cash On Delivery" name="paymentMethod" /> Cash On Delivery</p>
          </div> 


        </div>
        <PaymentCard order={data}/>
          <div className="col-span-2 flex justify-between m-3 mt-5">

          <a href="/cart" class="flex font-semibold text-indigo-600 text-sm my-auto ">
            <svg class="fill-current mr-2 mt-0.5 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
            Back to Cart
          </a>

            <button
              onClick={() => proceedPaymentBtn(pmChoice)}
              className="w-3/12 m-2 p-1 bg-indigo-500 rounded-lg text-lg font-semibold text-white shadow-md hover:shadow-xl hover:bg-indigo-800"
              >
              Proceed Payment
            </button>
          </div>
      </div>
    </div>
    </>
  ) 
};

export default Payment;
