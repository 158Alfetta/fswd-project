import React, { useMemo, Fragment } from 'react'
import { Link } from 'react-router-dom'

import { useSession } from '../../../contexts/SessionContext'
import { QUERY_CART } from '../../../graphql/CartQuery'
import { useQuery } from '@apollo/client'


import classes from './NavigationItems.module.css'

const NavigationItem = React.lazy(() =>
  import('./NavigationItem/NavigationItem')
)

const NavigationItems = (props) => {
  const { loading, user } = useSession()
  const { data } = useQuery(QUERY_CART)

  const userBox = useMemo(() => {
    if (loading) {
      return <span className="Navbar-user">Loading ...</span>
    }
    if (user) {
      return (
        <Fragment>
          <Link
            to="/Login"
            className="bg-white hover:bg-gray-100 text-gray-800 py-1 px-4 border border-gray-400 rounded-full"
          >
            {user?.username}
          </Link>
        </Fragment>
      )
    }
    return (
      <Fragment>
        <Link
          to="/Login"
          className="bg-white hover:bg-gray-100 text-gray-800 py-1 px-4 border border-gray-400 rounded-full"
        >
          Login
        </Link>
      </Fragment>
    )
  }, [loading, user])

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" clickedFromNav={props.clicked} exact>
        Home
      </NavigationItem>
      <NavigationItem link="/products" clickedFromNav={props.cliked} exact>
        Product
      </NavigationItem>
      <NavigationItem link="/cart" clickedFromNav={props.clicked} exact>
        <span className="relative inline-block">
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {data?.cart[0]?.product?.length ?? 0}
          </span>
          Cart
          {/* <img src="https://www.flaticon.com/svg/vstatic/svg/1170/1170627.svg?token=exp=1618931046~hmac=c087b263d3990714eac48cd42396667f" height="25" width="25"/> */}
        </span>
      </NavigationItem>
      <NavigationItem link="/order" clickedFromNav={props.clicked} exact>
        Order
      </NavigationItem>
      <NavigationItem link="/checkout" clickedFromNav={props.clicked} exact>
        checkout(test)
      </NavigationItem>
      <NavigationItem link="/payment" clickedFromNav={props.clicked} exact>
        payment(test)
      </NavigationItem>
      {userBox}
    </ul>
  )
}

export default NavigationItems
