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
    <div className="flex">
      {/* START A CREATION OF ORDER CART (1 ORDER) */}
      <div className="m-3 p-2 bg-yellow-200 ">
        <b>{"Order Number: "}</b>
        {numberOrder}
        <br />
        {order?.createdByUser?.firstName} {order?.createdByUser?.lastName}
        <br />
        <b>{"Status of Order: "}</b>
        {order?.status}
        <br />
        <b>{"Payment: "}</b>
        {order?.paymentDetail}
        <br />
        {/* {START A CREATION OF PRODUCT CART (1 ORDER HAVE MULTIPLE PRODUCTS)} */}
        {order?.product.map((product) => {
          //call this function for calculating a price.
          handleTotalPrice(product?.productInfo?.price * product?.quantity);
          <div className="flex">
          return (
            <div className="m-1 p-2 bg-purple-200">
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
          );
          </div>
        })}
        {/* END OF PRODUCT CREATION */}
        <div className="m-3 p-2 bg-blue-200 border-gray-400 flex">
          {"Grand Total: "}
          {totalPrice}
          {" Baht."}
        </div>
        <button
          onClick={() => processPaymentBtn(order?._id)}
          className="m-2 p-1 bg-gray-200 shadow-md hover:shadow-xl"
          >
          Process Payment
        </button>
      </div>
    </div>

    </>
    
  );
};

export default OrderCard;
