import React, { Fragment, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import classes from "./App.module.css";
import Layout from "./components/Layout/Layout";
import { useSession } from "./contexts/SessionContext";
import PrivateRoute from "./route/PrivateRoute";
import PrivateRouteAllUser from "./route/PrivateRouteAllUser";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const OrderPage = React.lazy(() => import("./pages/OrderPage"));
const ProductPage = React.lazy(() => import("./pages/ProductPage"));
const AddProductPage = React.lazy(() => import("./pages/AddProductPage"));
const CheckoutPage = React.lazy(() => import("./pages/CheckoutPage"));
const CartPage = React.lazy(() => import("./pages/CartPage"));
const AdminDahsboardPage = React.lazy(() =>
  import("./pages/AdminDashboardPage")
);
const PaymentPage = React.lazy(() => import("./pages/PaymentPage"));
const ProductDetailPage = React.lazy(() => import("./pages/ProductDetailPage"));
const AddPromotionPage = React.lazy(() => import("./pages/AddPromotionPage"));
const UpdateProductPage = React.lazy(() => import("./pages/UpdateProductPage"));
const PromotionPage = React.lazy(() => import("./pages/PromotionPage"));
const UpdatePromotionPage = React.lazy(() =>
  import("./pages/UpdatePromotionPage")
);
const OrderDetailPage = React.lazy(() => import("./pages/OrderDetailPage"));

const App = () => {
  const { user } = useSession();
  return (
    <Fragment>
      <div>
        <Layout />
        <Suspense
          fallback={
            <div className={`${classes.fullPageLoader} ${classes.Logo}`}>
              <img width="50" src={"/shop.png"} alt="shop" />
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
            {/* <Route path="/order/:orderId">
              <OrderDetailPage />
            </Route>
            <Route path="/order">
              <OrderPage />
            </Route>
            <Route path="/checkout">
              <CheckoutPage />
            </Route> */}
            <Route path="/products">
              <ProductPage />
            </Route>
            {/* <Route path="/cart">
              <CartPage />
            </Route> */}
            {/* <Route path="/payment/:orderId">
              <PaymentPage />
            </Route> */}
            <Route path="/promotions">
              <PromotionPage />
            </Route>
            <Route path="/product/:productId">
              <ProductDetailPage />
            </Route>
            <PrivateRoute
              component={AdminDahsboardPage}
              path="/dashboard"
              user={user}
              exact
            />
            <PrivateRoute
              component={UpdateProductPage}
              user={user}
              path="/dashboard/update-product/:productId"
            />
            <PrivateRoute
              component={UpdatePromotionPage}
              user={user}
              path="/dashboard/update-promotion/:promotionId"
            />

            <PrivateRouteAllUser
              user={user}
              component={CheckoutPage}
              path="/checkout"
              exact
            />
            <PrivateRouteAllUser
              user={user}
              component={CartPage}
              path="/cart"
            />

            <PrivateRouteAllUser
              user={user}
              component={PaymentPage}
              path="/payment/:orderId"
            />

            <PrivateRouteAllUser
              user={user}
              component={PaymentPage}
              path="/payment"
              exact
            />

            <PrivateRouteAllUser
              user={user}
              component={OrderDetailPage}
              path="/order/:orderId"
              exact
            />

            <PrivateRouteAllUser
              user={user}
              component={OrderPage}
              path="/order"
              exact
            />

            <PrivateRoute user={user} component={AddProductPage} path="/addProduct" exact />
            <PrivateRoute user={user} component={AddPromotionPage} path="/addPromotion" />
          </Switch>
        </Suspense>
      </div>
    </Fragment>
  );
};

export default App;
