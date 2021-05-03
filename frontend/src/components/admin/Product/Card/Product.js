import { Link } from 'react-router-dom'

const Product = (props) => {
  const { product } = props

  return (
    <div className="m-2">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
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
          <p className="text-gray-700 text-base">
            {parseFloat(product?.price).toLocaleString()}
          </p>
          <div className="whitespace-nowrap text-right text-sm font-medium">
            <Link to={'/dashboard/update-product/' + product?._id}>
              <span className="cursor-pointer	 text-indigo-600 hover:text-indigo-900">
                Edit
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Product
