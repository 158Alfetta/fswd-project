import { useSession } from "../../contexts/SessionContext"
import { Link } from 'react-router-dom'
import { useCallback } from 'react'
import { useMutation } from "@apollo/client"
import { DELETE_PROMOTION } from '../../graphql/promotionMutation'

const AdminPromotionCard = (props) => {
    const { user } = useSession()
    const { promotion } = props
    const [deletePromotion] = useMutation(DELETE_PROMOTION)
    const handleButtonClick = useCallback((e) => {
        try {
            deletePromotion({ variables: { id: promotion?._id } })
        } catch (err) {
            console.log(JSON.stringify(err))
        }
    }, [])

    return (
        <div className="grid grid-col2-2 max-w-sm rounded overflow-hidden shadow-2xl text-center pt-5">
            <div className="">
                <div className="mb-10">
                    <div className="font-bold text-xl">Promotion</div>
                    <div className="text-xl">{promotion?.name}</div>
                    <div className="text-xl">{promotion?.discount} percent off</div>
                    <span>{" "}</span>
                </div>
                <div className="whitespace-nowrap text-sm font-medium text-right pb-3 pr-5">
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
                        <span className="cursor-pointer	text-indigo-600 hover:text-indigo-900">
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