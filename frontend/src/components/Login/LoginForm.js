import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

import { useSession } from '../../contexts/SessionContext'

const LoginForm = () => {
  const { login } = useSession()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [err, serErr] = useState('')
  const handleUsernameChange = useCallback((e) => {
    setUsername(e.target.value)
  }, [])
  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value)
  }, [])
  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        await login(username, password)
        serErr('')
      } catch (e) {
        serErr(e.message)
      }
    },
    [login, password, username]
  )
  return (
    <div className="p-8 mt-20 bg-white rounded-lg max-w-6xl pb-10 m-4">
      <div className="flex justify-center mb-8">
        <img src="shop.png" width="50" alt="logo" />
      </div>
      <form onSubmit={handleLogin}>
        <input
          className="h-10 rounded w-full border px-3 focus:text-black focus:border-blue-100 mb-3"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
          required
        />
        <input
          className="h-10 rounded w-full border px-3 focus:text-black focus:border-blue-100"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          required
        />
        <p className="text-center mt-5 text-red-600 text-xs">{err}</p>
        <button
          className="uppercase h-10 mt-3 text-white w-full rounded bg-red-500 hover:bg-red-600"
          type="submit"
        >
          Login
        </button>
        <div className="flex justify-center items-center mt-2">
          No account yet?
          <Link
            to="register"
            className=" ml-2 text-gray-400 hover:text-gray-600"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
