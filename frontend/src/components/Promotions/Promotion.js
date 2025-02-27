import { useQuery } from '@apollo/client'
import { useSession } from '../../contexts/SessionContext'
import { PROMOTION_QUERY } from '../../graphql/PromotionQuery'
import {Link} from 'react-router-dom'

const PromotionCard = () => {
    const {user} = useSession()
    const {loading, error, data} = useQuery(PROMOTION_QUERY)
    if (loading) { return ('loading...')}
    if (error) { console.log(JSON.stringify(error))}
    console.log(data?.DiscountPromotions)
    return(
        <>
            {data?.DiscountPromotions?.map((promotion) => { 
                return (
                    <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 m-2 max-w-sm rounded overflow-hidden shadow-2xl justify-center p-20 mt-10">
                        <div className="px-6 py-4 text-white">
                            <div className="font-bold text-2xl mb-2">Promotion</div>
                            <div className="text-xl mb-2">{promotion?.name}</div>
                            <div className="text-xl mb-2">{promotion?.discount} percent off !</div>
                        </div>
                    </div>
                    )
            })}
        </>
    )
}

export default PromotionCard