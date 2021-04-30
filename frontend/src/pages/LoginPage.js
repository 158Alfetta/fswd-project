import { Fragment, useMemo } from 'react'

import LoginForm from '../components/Login/LoginForm'
import { useSession } from '../contexts/SessionContext'

const LoginPage = () => {
  const { loading, user, logout: handleLogout } = useSession()

  const userBox = useMemo(() => {
    if (loading) {
      return <span className="Navbar-user">Loading ...</span>
    }
    if (user) {
      return (
        <Fragment>
          <span className="Navbar-user">
            username : {user?.username} type: {user?.type}
          </span>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 py-1 px-4 border border-gray-400 rounded-full ml-5"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </Fragment>
      )
    }
    return <LoginForm />
  }, [handleLogout, loading, user])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center items-center p-4">{userBox}</div>
    </div>
  )
}

export default LoginPage
