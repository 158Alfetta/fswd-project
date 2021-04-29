import { React } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ORDER } from "../../graphql/OrderQuery";
import { useSession } from "../../contexts/SessionContext";
import OrderCard from "./OrderCard"

const Order = () => {
  const { user } = useSession();
  const { error, loading, data } = useQuery(QUERY_ORDER);


  let numberOrder = 0;
  if (user) {
    return(
      <>
      <div className="flex-row font-light bg-gray-200">
        {data && data.order.map((order) => {
          numberOrder += 1;
          return(
            <OrderCard order={order} numberOrder={numberOrder} />
          )
        })}
        </div>
      </>
    )
    
  
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

export default Order;
