import { React } from "react";
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
    <PaymentCard order={data}/>
    <button
        onClick={() => proceedPaymentBtn("Debit/Credit")}
        className="m-2 p-1 bg-gray-200 shadow-md hover:shadow-xl"
        >
        Proceed Payment
    </button>
    </>
  ) 
};

export default Payment;
