import { React, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ORDER } from "../../graphql/queryOrder";
import { useSession } from "../../contexts/SessionContext";

const Payment = () => {
  const { user } = useSession();
  const { error, loading, data } = useQuery(QUERY_ORDER, {
    variables: { userId: user?._id },
  });
  let total = 0;

  function processPaymentBtn() {
    console.log("processPaymentBtn");
  }

  const handleTotal = (price) => {
    total += price;
  };

  if (user) {
    return (
      <>
        {data &&
          data.order.map((order) => {
            return (
              <div className="flex">
                <div className="m-3 p-2 bg-green-200 ">
                  {order?.createdByUser?.firstName}{" "}
                  {order?.createdByUser?.lastName}
                  <br />
                  <b>{"Status of Order: "}</b>
                  {order?.status}
                  <br />
                  {order?.product.map((product) => {
                    handleTotal(
                      product?.productInfo?.price * product?.quantity
                    );

                    return (
                      <div className="m-1 p-2 bg-blue-200">
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
                  })}
                </div>
              </div>
            );
          })}
        <div className="m-3 p-2 bg-blue-200 border-gray-400 flex">
          {"Grand Total: "}
          {total}
          {" Baht."}
        </div>

        <button
          onClick={processPaymentBtn}
          className="m-2 p-1 bg-gray-200 shadow-md hover:shadow-xl"
        >
          Process Payment
        </button>
      </>
    );
  } else {
    return (
      <>
        <div className="w-screen h-screen  text-2xl align-middle p-3">
          {"Invalid Session, Please Login First!"}
        </div>
      </>
    );
  }
};

export default Payment;
