import PaymentCard from "../Payment/PaymentCard"
import OrderSubCard from "./OrderSubCard"
import PaymentBtn from "./PaymentBtn"

const OrderCard = (props) => {

  const order = props?.order
  let numberOrder = props?.numberOrder

  function processPaymentBtn(log){
      console.log(log)
  }

  let totalPrice = 0;
  const handleTotalPrice = (price) => {
    totalPrice += price;
  };

  return (
    <>
    <div className="flex justify-between m-5">
      {/* START A CREATION OF ORDER CART (1 ORDER) */}
      <div className="flex flex-col mx-auto p-4 bg-yellow-700 bg-opacity-30 w-full md:w-9/12 shadow-lg rounded-xl">
        
        <div className="grid grid-cols-5 text-center border-opacity-60 bg-gray-100 shadow-md text-blue-900">
          {/* Order Information */}
          <div className="text-center p-3 border-r-2 border-grey-800 font-bold">
            {"Order Number"} <p className="text-xs md:text-xl">{numberOrder}</p>
          </div>
          <div className="text-center p-3 border-r-2 border-grey-800 font-bold">
            {"Status"} <p className="text-xs md:text-xl capitalize">{order?.status}</p>
          </div>
          <div className="text-center p-3 border-r-2 border-grey-800 font-bold">
          {"Payment"} <p className="text-xs md:text-xl">{order?.paymentDetail}</p>
          </div>
          <div className="text-center p-3 border-r-2 border-grey-800 font-bold col-span-2">
          {"Address "} <p className="text-xs font-normal p-2">{order?.address}</p>
          </div>
        </div>
        


        {/* {START A CREATION OF PRODUCT CART (1 ORDER HAVE MULTIPLE PRODUCTS)} */}


        <div className="grid grid-cols-6 bg-gray-300 shadow-lg">
        <table className="table-auto border-2 border-gray-100 col-span-4">
            <thead>
            <tr>
                <th className="border-2 border-gray-100 border-opacity-50 font-semibold uppercase">Name</th>
                <th className="border-2 border-gray-100 border-opacity-50 font-semibold uppercase">Unit Price</th>
                <th className="border-2 border-gray-100 border-opacity-50 font-semibold uppercase">Quantity</th>
                <th className="border-2 border-gray-100 border-opacity-50 font-semibold uppercase">Price</th>
            </tr>
            </thead>
            <tbody>
        {order?.product.map((product) => {
          handleTotalPrice(product?.productInfo?.price * product?.quantity);
          return (
              <OrderSubCard product={product} />
          );
        })}
        </tbody>
        </table>
        {/* END OF PRODUCT CREATION */}
        <div className="mt-2 flex flex-row col-span-2 justify-around self-center">
          <div className="font-semibold text-xl">{"Grand Total"}</div>
          <p className="text-xl font-semibold">{totalPrice.toLocaleString()}{" Baht"}</p>
        </div>
        {/* <button
          onClick={() => processPaymentBtn(order?._id)}
          className="m-2 p-1 bg-gray-200 shadow-md hover:shadow-xl"
          >
          Process Payment
        </button> */}
        </div>

        <div className="mt-2 w-full flex justify-end">
          <PaymentBtn status={order?.status} orderId={order?._id} />
        </div>

      </div>
    </div>

    </>
    
  );
};

export default OrderCard;
