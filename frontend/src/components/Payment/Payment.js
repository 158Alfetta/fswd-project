import { React, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ORDER_BY_ID } from "../../graphql/OrderQuery";
import { useParams } from "react-router-dom";
import PaymentCard from "./PaymentCard"
import { PROCEED_PAYMENT_MUTATION } from "../../graphql/OrderMutation";
import { useHistory } from "react-router-dom";



const Payment = () => {
  let { orderId } = useParams();
  let history = useHistory();

  const { error, loading, data } = useQuery(QUERY_ORDER_BY_ID, {
    variables: {_id: orderId},
  });

  const [proceedPayment] = useMutation(PROCEED_PAYMENT_MUTATION);

  const [pmChoice, setPmChoice] = useState('unspecify')

  const handlePmChoice = (e) => {
    setPmChoice(e.target.value)
  }

  console.log(pmChoice)
 
  async function proceedPaymentBtn(PaymentMethod){
    let result = await proceedPayment({
      variables: {
        _id: orderId,
        statusOrder: "success",
        paymentDetail: PaymentMethod,
      },
    });

    console.log(result)
    history.push('/order')
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
          <div className="col-span-2 flex justify-center m-3 mt-5">
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
