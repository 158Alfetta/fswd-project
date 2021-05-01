import { Link } from 'react-router-dom'
const AdminDashboard = () => {
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <Link to="addProduct">
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
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