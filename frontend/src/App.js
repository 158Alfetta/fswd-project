import React, { Fragment, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

import classes from './App.module.css'
import Layout from './components/Layout/Layout'
import PrivateRoute from './route/PrivateRoute'

const HomePage = React.lazy(() => import('./pages/HomePage'))
const LoginPage = React.lazy(() => import('./pages/LoginPage'))
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'))
const OrderPage = React.lazy(() => import('./pages/OrderPage'))
const ProductPage = React.lazy(() => import('./pages/ProductPage'))
const AddProductPage = React.lazy(() => import('./pages/AddProductPage'))
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'))
const CartPage = React.lazy(() => import('./pages/CartPage'))
const AdminDahsboardPage = React.lazy(() => import('./pages/AdminDashboardPage'))
const PaymentPage = React.lazy(() => import('./pages/PaymentPage'))
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage'))
const App = () => {
  return (
    <Fragment>
      <div>
        <Layout />
        <Suspense
          fallback={
            <div className={`${classes.fullPageLoader} ${classes.Logo}`}>
              <img width="50" src={'/shop.png'} alt="shop" />
            </div>
          }
        >
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/order">
              <OrderPage />
            </Route>
            <Route path="/checkout">
              <CheckoutPage />
            </Route>
            <Route path="/products">
              <ProductPage />
            </Route>
            <Route path="/cart">
              <CartPage />
            </Route>
            <Route path="/payment/:orderId">
              <PaymentPage />
            </Route>
            <Route path="/payment">
              <PaymentPage />
            </Route>
            {/* <Route>

            </Route> */}
            <PrivateRoute component={AdminDahsboardPage} path="/dashboard" exact />
            <PrivateRoute component={AddProductPage} path="/addProduct" exact />
          </Switch>
        </Suspense>
      </div>
    </Fragment>
  )
}

export default App
