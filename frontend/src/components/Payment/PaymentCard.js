const PaymentCard = (props) => {

  console.log(props)

  let order = props?.order?.findOrderbyId

  
    let totalPrice = 0;
    const handleTotalPrice = (price) => {
      totalPrice += price;
    };
  
    return (
      <>

        {/* START A CREATION OF ORDER CART (1 ORDER) */}
        <div className="m-2 bg-purple-400 bg-opacity-20 grid grid-cols-2 rounded-xl ">
          {/* {START A CREATION OF PRODUCT CART (1 ORDER HAVE MULTIPLE PRODUCTS)} */}
          
          <h3 className="pl-4 font-semibold  uppercase pb-2 pt-4">Product</h3>
          <h3 className="pr-4 font-semibold  text-right uppercase pb-2 pt-4">Quantity</h3>

          {order?.product.map((product) => {
            //call this function for calculating a price.
            handleTotalPrice(product?.productInfo?.price * product?.quantity);
            return (
              <>
              <div className="p-4 pb-2 border-b-2 border-gray-300">
                {product?.productInfo?.name}
              </div>
              <div className="p-4 pb-2 border-b-2 border-gray-300 text-right">
                x{product?.quantity}
              </div>
              </>
            );
          })}
          {/* END OF PRODUCT CREATION */}
            <p className="p-3 mt-5 text-left text-lg font-semibold uppercase bg-purple-700 bg-opacity-30  rounded-bl-xl">{"Grand Total"}</p>
            <p className="p-3 mt-5 text-right text-lg font-semibold uppercase bg-purple-700 bg-opacity-30 rounded-br-xl">{totalPrice}{" Baht"}</p>
        </div>
  
      </>
      
    );
  };
  
  export default PaymentCard;
  