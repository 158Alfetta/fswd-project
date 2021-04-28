import { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { useMutation } from '@apollo/client'

import { CREATE_CUSTOMER_MUTATION } from '../../graphql/createCustomerMutation'
import { CREATE_ADMIN_MUTATION } from '../../graphql/createAdminMutation'
import { CREATE_CART } from '../../graphql/CartMutation'
import { Link } from 'react-router-dom'
import { useSession } from '../../contexts/SessionContext'

const RegisterForm = () => {
  const history = useHistory()
  const { login } = useSession()
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  })
  const [type, setType] = useState('customer')
  const [admin, setAdmin] = useState({
    companyName: '',
  })
  const [err, serErr] = useState('')
  const [[createCustomer], [createAdmin]] = [
    useMutation(CREATE_CUSTOMER_MUTATION),
    useMutation(CREATE_ADMIN_MUTATION),
  ]
  const [createEmptyCart] = useMutation(CREATE_CART)
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setNewUser((prev) => ({ ...prev, [name]: value }))
  }, [])
  const handleTypeChange = useCallback((e) => {
    setType(e.target.value)
  }, [])
  const handleAdminChange = useCallback((e) => {
    setAdmin({ companyName: e.target.value })
  }, [])
  const handleRegister = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        console.log(JSON.stringify(newUser))
        if (type === 'customer') {
          let userData = await createCustomer({
            variables: { record: newUser },
          })
          let newUserId = userData?.data?.createCustomer?.record?._id
          // console.log(newUserId)
          await createEmptyCart({ variables: { userId: newUserId } })
        } else
          await createAdmin({ variables: { record: { ...newUser, ...admin } } })
          // await createEmptyCart({ variables: { userId: newUserId } })
        await login(newUser.username, newUser.password)
        history.push('/')
      } catch (err) {
        console.log(err)
        if (err.message.split(' ')[0] === 'E11000') {
          serErr('This username is already used!')
        } else serErr('Register failed!')
      }
    },
    [
      createCustomer,
      createAdmin,
      createEmptyCart,
      history,
      newUser,
      admin,
      type,
      login,
    ]
  )
  let AdminForm =
    type === 'admin' ? (
      <input
        className="h-10 rounded w-full border px-3 focus:text-black focus:border-blue-100 mb-3"
        type="text"
        name="companyName"
        value={admin.companyName}
        onChange={handleAdminChange}
        placeholder="companyName"
        autoComplete="off"
      />
    ) : null

  return (
    <div className="p-8 mt-20 bg-white rounded-lg max-w-md pb-10 m-4">
      <div className="text-center">
        <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
          Register
        </h1>
      </div>
      <form onSubmit={handleRegister}>
        <div className="mt-4">
          <span className="text-gray-700">Please select role:</span>
          <div className="mt-1 mb-3">
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="type"
                value="customer"
                onChange={handleTypeChange}
                checked={type === 'customer'}
              />
              <span className="ml-1">customer</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="type"
                value="admin"
                onChange={handleTypeChange}
                checked={type === 'admin'}
              />
              <span className="ml-1">admin</span>
            </label>
          </div>
        </div>

        <input
          className="h-10 rounded w-full border px-3 focus:text-black focus:border-blue-100 mb-3"
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleInputChange}
          placeholder="Username"
          autoComplete="off"
          required
        />
        <input
          className="h-10 rounded w-full border px-3 focus:text-black focus:border-blue-100 mb-3"
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
        />

        <input
          className="h-10 rounded border w-full px-3 focus:text-black focus:border-blue-100 mb-3"
          type="text"
          name="firstName"
          value={newUser.firstName}
          onChange={handleInputChange}
          placeholder="firstName"
          autoComplete="off"
          required
        />
        <input
          className="h-10 rounded border w-full px-3 focus:text-black focus:border-blue-100 mb-3"
          type="text"
          name="lastName"
          value={newUser.lastName}
          onChange={handleInputChange}
          placeholder="lastName"
          autoComplete="off"
          required
        />

        {AdminForm}
        <p className="text-center mt-3 text-red-600 text-xs">{err}</p>
        <button
          className="uppercase h-10 mt-3 text-white w-full rounded bg-green-500 hover:bg-green-600"
          type="submit"
        >
          Register
        </button>
        <div className="flex justify-center items-center mt-2">
          go back to
          <Link to="/login" className=" ml-2 text-gray-400 hover:text-gray-600">
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
