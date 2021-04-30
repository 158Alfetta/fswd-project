
const OrderSubCard = (props) => {
    const product = props?.product
    const totalPrice = parseInt(product?.quantity)*parseInt(product?.productInfo?.price)

    return (
        // <div className="px-2 py-6">
        //     <div className="p-4 border-gray-500 rounded-xl">
        //     <ul>
        //         <li key="productID">
        //         <b>Productid</b>
        //         <br />
        //         {product?.productId}
        //         </li>
        //         <li>
        //         <b>name</b>
        //         <br />
        //         {product?.productInfo?.name}
        //         </li>
        //         <li>
        //         <b>Price</b>
        //         <br />
        //         {product?.productInfo?.price}
        //         </li>
        //         <li>
        //         <b>Stock</b>
        //         <br />
        //         {product?.productInfo?.count}
        //         </li>
        //         <li>
        //         <b>Quantity</b>
        //         <br />
        //         {product?.quantity}
        //         </li>
        //     </ul>
        //     </di
            <tr className="text-center">
                <td className="border-r-2 border-gray-100" >{product?.productInfo?.name}</td>
                <td className="border-r-2 border-gray-100" >{product?.productInfo?.price}</td>
                <td className="border-r-2 border-gray-100" >{product?.quantity}</td>
                <td className="border-r-2 border-gray-100" >{totalPrice}</td>
            </tr>

      );
}

export default OrderSubCard