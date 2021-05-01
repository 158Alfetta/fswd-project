const Product = (props) => {
  const { product } = props

  return (
    <div className="m-4">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        {/* {product?.image?.[0]} */}
        <img
          className="w-full"
          src={
            product?.image?.[0] ||
            'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png'
          }
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{product?.name}</div>
          <p className="text-gray-700 text-base">Price: {product?.price}</p>
          <p className="text-gray-700 text-base">Quantity: {product?.count}</p>
        </div>
      </div>
    </div>
  )
}
export default Product
