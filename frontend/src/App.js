import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import webfont from "webfontloader";
import React, { useState } from "react";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import store from "./store.js";
import { loadUser } from "./actions/userAction.js";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import Update from "./component/User/Update.js";
import About from "./component/layout/About/About.js";
import Contact from "./component/layout/Contact/Contact.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import OrderList from "./component/Admin/OrderList.js";
import UsersList from "./component/Admin/UserList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState(
    "pk_test_51OzDrkSFLmB0hsu3yiJdtuWF51ghVf67JJRkjoOaQ6mIBIKlMCJRHjHgMJxLF9UZq6SP2XG7POZRaWnsjJlmNGZH00Wq9Wvc4w"
  );
  async function getStripeApiKey() {
    console.log("app1");
    try {
      console.log("app2");
      const response = await axios.get("/api/v1/stripeapikey");

      console.log(response);
      const apiKey = response.data.stripeApiKey;
      console.log(apiKey);
      if (!apiKey) {
        throw new Error("Stripe API key is empty.");
      }

      setStripeApiKey(response.data.stripeApiKey);
      console.log(stripeApiKey);
    } catch (error) {
      console.error("Error fetching Stripe API key:", error);
    }
  }
  console.log(stripeApiKey);

  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    console.log("app");
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/product/:id" Component={ProductDetails} />
        <Route exact path="/products" Component={Products}></Route>
        <Route exact path="/about" Component={About} />
        <Route exact path="/contact" Component={Contact} />
        <Route exact path="/search" Component={Search}></Route>
        <Route path="/products/:keyword" Component={Products} />
        <Route
          path="/account"
          element={
            <ProtectedRoute
              element={<Profile />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/me/update"
          element={
            <ProtectedRoute
              element={<Update />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/shipping"
          element={
            <ProtectedRoute
              element={<Shipping />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute
              element={<ConfirmOrder />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute
              element={<MyOrders />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/order/:id"
          element={
            <ProtectedRoute
              element={<OrderDetails />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute
              element={<Dashboard />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/admin/product"
          element={
            <ProtectedRoute
              element={<NewProduct />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute
              element={<UpdateProduct />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        {/* <Route
          exact
          path="/admin/user/:id"
          element={
            <ProtectedRoute
              element={<UpdateUser />}
              isAuthenticated={isAuthenticated}
            />
          }
        /> */}

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute
              element={<OrderList />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          exact
          path="/admin/order/:id"
          element={
            <ProtectedRoute
              element={<ProcessOrder />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          exact
          path="/admin/reviews"
          element={
            <ProtectedRoute
              element={<ProductReviews />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute
              element={<UsersList />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute
              element={<ProductList />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute
              element={<OrderSuccess />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/process/payment"
          element={
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute
                element={<Payment />}
                isAuthenticated={isAuthenticated}
              />
            </Elements>
          }
        />

        <Route exact path="/login" Component={LoginSignUp} />
        <Route exact path="/cart" Component={Cart} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
