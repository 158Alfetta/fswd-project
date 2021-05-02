import { Link } from 'react-router-dom'
import Orders from '../components/admin/Orders/Orders'
import AdminProductCard from '../components/admin/Product/ProductCard'
import AdminPromotionCard from '../components/Promotions/AdminPromotion'
const AdminDashboard = () => {
  return (
    <div className="m-10">
      <h2 className="mt-20">User Orders</h2>
      <Orders />
      <h2 className="mt-10">My Products</h2>
      <AdminProductCard />
      <h2 className="mt-10">My Promotion</h2>
      <AdminPromotionCard />
      <Link to="addProduct">
        <button className="mt-4 ml-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          Add Product
        </button>
      </Link>
      <Link to="addPromotion">
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          Add Promotion
                </button>
      </Link>
    </div>
  )
}
export default AdminDashboard
