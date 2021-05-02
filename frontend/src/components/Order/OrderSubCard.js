
const OrderSubCard = (props) => {
    const product = props?.product
    const discount = 1-parseFloat(product?.productInfo?.promotionDetail?.discount)/100 || 1
    const totalPrice = parseFloat(product?.quantity)*parseFloat(product?.productInfo?.price*discount)

    return (

            <tr className="text-center font-normal text-gray-600">
                <td className="border-r-2 border-gray-100 border-opacity-50" >{product?.productInfo?.name}</td>
                <td className="border-r-2 border-gray-100 border-opacity-50" >{parseFloat(product?.productInfo?.price*discount).toLocaleString()}</td>
                <td className="border-r-2 border-gray-100 border-opacity-50" >{product?.quantity}</td>
                <td className="border-r-2 border-gray-100 border-opacity-50" >{totalPrice.toLocaleString()}</td>
            </tr>

      );
}

export default OrderSubCard