import OrderSubCard from "./OrderSubCard"

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
      <div className="flex flex-col mx-auto p-3 bg-yellow-800 bg-opacity-50 w-full md:w-9/12 shadow-lg">
        
        <div className="grid grid-cols-5 text-center border-opacity-60 bg-gray-100 shadow-md text-blue-900">
          {/* Order Information */}
          <div className="text-center p-3 border-r-2 border-grey-800 font-bold">
            {"Order Number"} <p className="text-xs md:text-xl">{numberOrder}</p>
          </div>
          <div className="text-center p-3 border-r-2 border-grey-800 font-bold">
            {"Status"} <p className="text-xs md:text-xl">{order?.status}</p>
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
                <th className="border-2 border-gray-100">Name</th>
                <th className="border-2 border-gray-100">Unit Price</th>
                <th className="border-2 border-gray-100">Quantity</th>
                <th className="border-2 border-gray-100">Price</th>
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
          <p className="text-xl">{totalPrice}{" Baht"}</p>
        </div>
        {/* <button
          onClick={() => processPaymentBtn(order?._id)}
          className="m-2 p-1 bg-gray-200 shadow-md hover:shadow-xl"
          >
          Process Payment
        </button> */}
        </div>
      </div>
    </div>

    </>
    
  );
};

export default OrderCard;
