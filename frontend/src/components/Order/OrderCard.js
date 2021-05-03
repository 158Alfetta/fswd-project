import OrderSubCard from "./OrderSubCard"
import PaymentBtn from "./PaymentBtn"

const OrderCard = (props) => {

  const order = props?.order
  const shipping = parseFloat(order.shippingCost || 0)
  const discount = 1-parseFloat(order?.product?.[0].productInfo?.promotionDetail?.discount)/100 || 1

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
          <div className="flex flex-col justify-center p-3 border-r-2 border-grey-800 font-bold">
            {"Timestamp"} <p className="text-xs md:text-lg">{order?.timestamp}</p>
          </div>
          <div className="flex flex-col justify-center p-3 border-r-2 border-grey-800 font-bold ">
            <div className="pb-1">{"Status"}</div>
            <p className={`self-center text-xs md:text-lg capitalize w-full md:w-1/2 text-gray-100 rounded-lg md:rounded-xl ${
                order?.status === 'waiting'
                  ? 'bg-yellow-400'
                  : order?.status === 'success'
                  ? 'bg-green-400'
                  : order?.status === 'cancel'
                  ? 'bg-red-400'
                  : ''}`}>{order?.status}</p>
          </div>
          <div className="flex flex-col justify-center p-3 border-r-2 border-grey-800 font-bold">
          {"Payment"} <p className="text-xs md:text-lg">{order?.paymentDetail}</p>
          </div>
          <div className="flex flex-col justify-center p-3border-grey-800 font-bold col-span-2">
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
          handleTotalPrice((product?.productInfo?.price*discount) * product?.quantity);
          return (
              <OrderSubCard product={product} />
          );
        })}
        </tbody>
        </table>
        {/* END OF PRODUCT CREATION */}
        <div className="mt-2 flex flex-row col-span-2 justify-around self-center">
          <div className="font-semibold text-md md:text-lg">{"Grand Total"}</div>
          <p className="text-md md:text-lg font-semibold">{(parseFloat(totalPrice)+shipping).toLocaleString()}{" Baht"}</p>
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
