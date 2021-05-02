import { useHistory } from "react-router-dom";
import { CANCEL_ORDER } from "../../graphql/OrderMutation";
import { useMutation } from "@apollo/client";

const PaymentBtn = (props) => {
    const status = props?.status
    const orderId = props?.orderId
    const [cancelOrder] = useMutation(CANCEL_ORDER);

    let history = useHistory();

    function handlePaymentBtn(orderId) {
        history.push("/payment/" + orderId);
    }

    function handleCancelBtn(orderId){
        cancelOrder({
        variables: {
            _id: orderId,
            statusOrder: "cancel",
            }
        })
        alert("Cancel Order Success")
        history.push("/");
    }


    if(status === "waiting"){
        return(
            <>
            <button
                onClick={() => handlePaymentBtn(orderId)}
                className="flex-row justify-center py-2 px-3 m-1 w-2/12 border border-transparent shadow-sm text-sm md:text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Payment
            </button>
            <button
                onClick={() => handleCancelBtn(orderId)}
                className="flex-row justify-center py-2 px-3 m-1 w-2/12 border border-transparent shadow-sm text-sm md:text-lg font-medium rounded-md text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Cancel 
            </button>
            </>
        )
    }else{
        return(
            <>
            </>
        )
    }

}

export default PaymentBtn