import { useQuery } from "@apollo/client";
import { QUERY_ORDER_BY_ID } from "../../graphql/OrderQuery";
import { useSession } from "../../contexts/SessionContext";
import { useHistory, useParams } from "react-router-dom";
import PaymentBtn from "./PaymentBtn"

const OrderDetail = () => {
    const { user } = useSession();
    let { orderId } = useParams();
    let history = useHistory();
    let summary = 0;

    const { error, loading, data } = useQuery(QUERY_ORDER_BY_ID, {
        variables: {_id: orderId},
      });

    console.log(data)
    
      return(
     <>
      <div className="h-screen w-screen">
        <div className="grid grid-cols-10 w-full h-20 mb-7">
          <div className="col-span-4 border-b-2 border-yellow-800">
            <h2 className="font-sans text-left py-6 px-10 font-semibold text-2xl">
              Order ID {data?.findOrderbyId._id}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-5 rounded-xl w-full md:w-8/12 mx-auto text-center border-opacity-60 bg-gray-100 shadow-md text-blue-900">
          {/* Order Information */}
          <div className="flex flex-col justify-center p-3 border-r-2 border-grey-800 font-bold">
            {"Timestamp"} <p className="text-xs md:text-lg">{data?.findOrderbyId?.timestamp}</p>
          </div>
          <div className="flex flex-col justify-center p-3 border-r-2 border-grey-800 font-bold ">
            <div className="pb-1">{"Status"}</div>
            <p className={`self-center text-xs md:text-lg capitalize w-full md:w-1/2 text-gray-100 rounded-lg md:rounded-xl ${
                data?.findOrderbyId?.status === 'waiting'
                  ? 'bg-yellow-400'
                  : data?.findOrderbyId?.status === 'success'
                  ? 'bg-green-400'
                  : data?.findOrderbyId?.status === 'cancel'
                  ? 'bg-red-400'
                  : ''}`}>{data?.findOrderbyId?.status}</p>
          </div>
          <div className="flex flex-col justify-center p-3 border-r-2 border-grey-800 font-bold">
          {"Payment"} <p className="text-xs md:text-lg">{data?.findOrderbyId?.paymentDetail}</p>
          </div>
          <div className="flex flex-col justify-center p-3 border-grey-800 font-bold col-span-2">
          {"Address "} <p className="text-xs font-normal p-2">{data?.findOrderbyId?.address}</p>
          </div>
        </div>

        <div className="m-3 p-2 bg-yellow-900 bg-opacity-10 rounded-xl w-full md:w-8/12 mx-auto grid grid-cols-10">
          <h3 class="mt-2 p-1 pb-3 col-span-4 font-semibold text-gray-600 uppercase text-center border-gray-300 border-b-2">
            Product Details
          </h3>
          <h3 class="mt-2 p-1 pb-3 col-span-2 font-semibold text-gray-600 uppercase text-center border-gray-300 border-b-2 ">
            Quantity
          </h3>
          <h3 class="mt-2 p-1 pb-3 col-span-2 font-semibold text-gray-600 uppercase text-center border-gray-300 border-b-2 ">
            Price
          </h3>
          <h3 class="mt-2 p-1 pb-3 col-span-2 font-semibold text-gray-600 uppercase text-center border-gray-300 border-b-2 ">
            Total
          </h3>
          {data?.findOrderbyId?.product.map((product) => {
            const totalPrice =
              parseFloat(product?.quantity) *
              parseFloat(product?.productInfo?.price);
            summary += parseFloat(totalPrice)
            return (
              <>
                <div className="col-span-4 h-34 border-gray-300 border-b grid grid-cols-2">
                <div className="">

                  <div className="w-full h-32 m-2" style={{backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundImage: `url(${product?.productInfo?.image[0] || "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"})` }}>
                  </div>

                  </div>
                  <p className="text-center pt-10 text-lg">
                    {product?.productInfo?.name}
                  </p>
                </div>
                <div className="col-span-2 h-34 border-gray-300 border-b text-lg">
                  <p className="text-center pt-10">{parseFloat(product?.quantity).toLocaleString()}</p>
                </div>
                <div className="col-span-2 h-34 border-gray-300 border-b text-lg">
                  <p className="text-center pt-10">
                    {parseFloat(product?.productInfo?.price).toLocaleString()}
                  </p>
                </div>
                <div className="col-span-2 h-34 border-gray-300 border-b text-lg">
                  <p className="text-center pt-10">{totalPrice.toLocaleString()}</p>
                </div>
              </>
            );
          })}

          <div className="col-span-10 flex justify-end bg-yellow-800 bg-opacity-30 rounded-bl-xl rounded-br-xl">
            <div className="py-1 px-4 font-extrabold text-lg">
              Total: {summary.toLocaleString()} THB <br /> <span className="font-light">TAX Included</span>
            </div>
            <PaymentBtn status={data?.findOrderbyId.status} orderId={data?.findOrderbyId._id} />
          </div>

        </div>
    </div>
    </>
    )
}

export default OrderDetail