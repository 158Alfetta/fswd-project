
const OrderSubCard = (props) => {
    const product = props?.product

    return (
        <div className="px-2 py-6">
            <div className="p-4 border border border-gray-500 rounded-xl">
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
        </div>
      );
}

export default OrderSubCard