import { useSession } from "../../contexts/SessionContext"
import { Link } from 'react-router-dom'
import { useCallback } from 'react'
import { useMutation } from "@apollo/client"
import { DELETE_PROMOTION } from '../../graphql/promotionMutation'

const AdminPromotionCard = (props) => {
    const {user} = useSession()
    const { promotion } = props
    const [deletePromotion] = useMutation(DELETE_PROMOTION)
    const handleButtonClick = useCallback((e) => {
        try {
          console.log(promotion?._id)
          deletePromotion({ variables: { id: promotion?._id } })
        } catch (err) {
          console.log(JSON.stringify(err))
        }
      }, [])
    
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg justify-center p-20 mt-10">
            <div className="px-6 py-4 ">
                <div className="font-bold text-xl mb-2">Promotion</div>
                <div className="text-xl mb-2">{promotion?.name}</div>
                <div className="text-xl mb-2">{promotion?.discount} percent off</div>
                {/* <button
                    className="cursor-pointer text-indigo-600 hover:text-indigo-900"
                    onClick={handleButtonClick} value={promotion?._id}
                >
                    Remove
                </button> */}
                <span>{" "}</span>
                <div className="whitespace-nowrap text-right text-sm font-medium">
                    <span
                        className="cursor-pointer text-indigo-600 hover:text-indigo-900"
                        onClick={handleButtonClick}
                    >
                        Remove
                    </span>
                    {" "}
                    {user?.type === "Admin" ? <Link
                    to={'/dashboard/update-promotion/' + promotion?._id}
                    >
                    <span className="cursor-pointer	 text-indigo-600 hover:text-indigo-900">
                        Edit
                    </span>
                    </Link> 
                    : null}
                </div>
            </div>
        </div>
    )
}

export default AdminPromotionCard