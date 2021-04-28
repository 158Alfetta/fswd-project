import ProductCard from '../components/Product/ProductCard'
import { Link } from 'react-router-dom'
const ProductPage = () => {
  return (
    <>
      <div className="grid grid-cols-3">
        <ProductCard />
      </div>
      <Link to="addProduct">
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          Add Product
        </button>
      </Link>
    </>
  )
}

export default ProductPage
