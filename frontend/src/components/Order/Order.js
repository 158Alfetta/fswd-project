import { React } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ORDER } from "../../graphql/OrderQuery";
import { useSession } from "../../contexts/SessionContext";
import OrderCard from "./OrderCard"

const Order = () => {
  const { user } = useSession();
  const { error, loading, data } = useQuery(QUERY_ORDER);

  let numberOrder = 0;
    return(
      <>
      <div className="font-light h-screen w-screen">
        <div className="grid grid-cols-10 w-full h-1/6 mb-5">
          <div className="col-span-4 border-b-2 border-yellow-800">
            <h2 className="font-sans text-left py-10 px-10 font-semibold text-4xl">Orders of {user?.username}</h2>
        </div>
        <div className="col-span-6 text-center py-auto">
            Select box for sucess, cancel, paid, waiting
        </div>
        </div>
        {data && data.order.map((order) => {
            numberOrder += 1;
            return(
              <OrderCard order={order} numberOrder={numberOrder} />
            )
          })}
      </div>
      </>
    )
};

export default Order;
