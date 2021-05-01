const CheckoutCard = (props) => {

    const product = props?.product
    
    return(
        <>
            <div key={product} className="m-1 p-2 bg-green-200">
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
        </>
    )
}

export default CheckoutCard