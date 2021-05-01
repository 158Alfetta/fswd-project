import {useState} from 'react'

const AddressForm = () => {

  const [address, setAddress] = useState({name:'', telephone:'', street:'', district:'', postal:'',})


  function handleChangeOnName(event) {
    event.preventDefault()
    setAddress({
      name: event.target.value
    })
  }

  function handleChangeOnTelephone(event) {
    event.preventDefault()
    setAddress({
      telephone: event.target.value
    })
  }

  function handleChangeOnStreet(event) {
    event.preventDefault()
    setAddress({
      street: event.target.value
    })
  }

  function handleChangeOnDistrict(event) {
    event.preventDefault()
    setAddress({
      district: event.target.value
    })
  }

  function handleChangeOnProvince(event) {
    event.preventDefault()
    setAddress({
      province: event.target.value
    })
  }
  
  function handleChangeOnPostal(event) {
    event.preventDefault()
    setAddress({
      postal: event.target.value
    })
  }



    return(
        <div className="mt-10 sm:mt-0">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={address.name}
                        onChange={handleChangeOnName}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md"
                      />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      Telephone
                      </label>
                      <input
                        type="text"
                        name="telephone"
                        id="telephone"
                        value={address.telephone}
                        onChange={handleChangeOnTelephone}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                  </div>


  
                  <div className="col-span-6">
                    <label htmlFor="street_address" className="block text-sm font-medium text-gray-700">
                      Street address
                    </label>
                    <input
                      type="text"
                      name="street_address"
                      id="street_address"
                      value={address.street}
                      onChange={handleChangeOnStreet}
                      autoComplete="street-address"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
  
                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label htmlFor="disctrict" className="block text-sm font-medium text-gray-700">
                      District
                    </label>
                    <input
                      type="text"
                      name="disctrict"
                      id="disctrict"
                      value={address.District}
                      onChange={handleChangeOnDistrict}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
  
                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                      Province
                    </label>
                    <input
                      type="text"
                      name="province"
                      id="province"
                      value={address.province}
                      onChange={handleChangeOnProvince}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
  
                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">
                      Postal
                    </label>
                    <input
                      type="text"
                      name="postal_code"
                      id="postal_code"
                      autoComplete="postal-code"
                      value={address.postal}
                      onChange={handleChangeOnPostal}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-smrounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
                <button
                  type="Submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
}

export default AddressForm