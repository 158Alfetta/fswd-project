import { React } from 'react'

const DiscountBox = () => {
  function validateCoupon(event) {
    console.log(event.target.value)
  }

  return (
    <div>
      <form onSubmit={validateCoupon}>
        <div className="max-w-sm mx-auto p-1 pr-0 flex items-center">
          <label>
            Coupon:
            <input
              type="text"
              placeholder="ABC"
              className="flex-1 appearance-none rounded shadow p-3 text-grey-dark mr-2 focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-600 text-white text-base font-semibold rounded-md shadow-md hover:bg-indigo-600 p-3"
          >
            OK
          </button>
        </div>
      </form>
    </div>
  )
}
export default DiscountBox
