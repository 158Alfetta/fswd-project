import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useMutation, useLazyQuery, useQuery } from '@apollo/client'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router'

import { ME_QUERY } from '../graphql/meQuery'
import { LOGIN_MUTATION } from '../graphql/loginMutation'

import { QUERY_CART } from '../graphql/CartQuery'

const SessionContext = createContext()

export const SessionProvider = (props) => {
  const { children } = props
  const history = useHistory()
  const [user, setUser] = useState(null)
  const [cookie, setCookie, removeCookie] = useCookies(['token', 'user'])

  const { data: cartData, refetch: refetchCart } = useQuery(QUERY_CART, {
    fetchPolicy: 'no-cache',
  })

  const [loadMe, { loading, data }] = useLazyQuery(ME_QUERY, {
    fetchPolicy: 'network-only',
  })
  const [login] = useMutation(LOGIN_MUTATION)
  const handleLogin = useCallback(
    async (username, password) => {
      try {
        const variables = {
          record: {
            username,
            password,
          },
        }
        const res = await login({ variables })
        if (res?.data?.login?.token) {
          setCookie('token', res?.data?.login?.token, {
            maxAge: 86400,
            path: '/',
          })
          setCookie('user', res?.data?.login?.user, {
            maxAge: 86400,
            path: '/',
          })
          setUser(res?.data?.login?.user)
          history.push('/')
        }
      } catch (err) {
        removeCookie('token', { maxAge: 86400 })
        removeCookie('user', { maxAge: 86400 })
        throw new Error(`username or password is not correct!`)
      }
    },
    [login, removeCookie, setCookie, history]
  )

  useEffect(() => {
    if (cookie.user) {
      setUser(cookie.user)
    }
    return () => {}
  }, [cookie])

  const handleLogout = useCallback(() => {
    setUser(null)
    removeCookie('token', { maxAge: 86400 })
    removeCookie('user', { maxAge: 86400 })
  }, [removeCookie])

  useEffect(() => {
    const loadData = async () => {
      try {
        await loadMe()
      } catch (err) {
        console.log(err)
        removeCookie('token', { maxAge: 86400 })
        removeCookie('user', { maxAge: 86400 })
      }
    }
    loadData()

    return () => {}
  }, [loadMe, removeCookie])
  useEffect(() => {
    if (data?.me) {
      setUser(data?.me)
    }
    return () => {}
  }, [data])

  return (
    <SessionContext.Provider
      value={{
        loading,
        user,
        login: handleLogin,
        logout: handleLogout,
        cartData,
        refetchCart,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => useContext(SessionContext)

export default SessionContext
