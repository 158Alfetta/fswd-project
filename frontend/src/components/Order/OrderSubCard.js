
const OrderSubCard = (props) => {
    const product = props?.product
    const totalPrice = parseInt(product?.quantity)*parseInt(product?.productInfo?.price)

    return (

            <tr className="text-center font-normal text-gray-600">
                <td className="border-r-2 border-gray-100 border-opacity-50" >{product?.productInfo?.name}</td>
                <td className="border-r-2 border-gray-100 border-opacity-50" >{product?.productInfo?.price}</td>
                <td className="border-r-2 border-gray-100 border-opacity-50" >{product?.quantity}</td>
                <td className="border-r-2 border-gray-100 border-opacity-50" >{totalPrice}</td>
            </tr>

      );
}

export default OrderSubCard