
import './App.css';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products/Products';
import Search from './components/Product/Search/Search';

import LoginSign from './components/User/loginSignUp/LoginSign';
import { useEffect } from 'react';
import store from './redux/store/store'
import { loadUser } from './redux/action/userAction';

import Order from './components/order/Order';
import Account from './components/Header/Account';
import Profile from './components/User/userProfile/Profile';
import { useSelector } from "react-redux";
import UpdateProfiles from './components/User/updatesProfiles/UpdateProfiles';
import UpdatePassword from './components/User/updatePassword/UpdatePassword';
import ForgotPassword from './components/User/forgotPassword/ForgotPassword';
import ResetPassword from './components/User/resetPassword/ResetPassword';
// import CartItems from './components/Product/cart/CartItems';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/shipping/Shipping';
import ConfirmOrder from './components/cart/order/ConfirmOrder';
import { useState } from 'react';
//payment method k lia import files
import axios from 'axios';
import Payment from './components/cart/payment/Payment';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from './components/cart/orderSuccess/OrderSuccess';
import OrderDetails from './components/order/OrderDetails';
import Dashboard from './components/admin/dashboard/Dashboard';






// import Loader from './components/Loader/Loader';


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  //---------------------------------------------------------
  //backend sy stripe Api key ko get kia ha

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  console.log("-------------------");
  console.log("stripeApiKey:>", stripeApiKey);
  console.log("-------------------");


  //---------------------------------------------------------


  // const async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");
  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey()
  }, [])



return (
  <>
    <BrowserRouter>
      <Header />



      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products/' element={<Products />} />
        <Route path='/products/:id' element={<Products />} />
        <Route path='/search' element={<Search />} />
        <Route path='/loginSignup' element={<LoginSign />} />
    

        <Route path='/account' element={<Account />} />
        {isAuthenticated && <Route path='/profile' element={<Profile />} />}
        {isAuthenticated && <Route path='/me/update' element={<UpdateProfiles />} />}
        {isAuthenticated && <Route path='/password/update' element={<UpdatePassword />} />}
        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<ResetPassword />} />
        {/* <Route path='/cartItems' element={<CartItems />} /> */}
        <Route path='/cart' element={<Cart />} />
        {isAuthenticated && <Route path='/shipping' element={<Shipping />} />}
        {isAuthenticated && <Route path='/order/confirm' element={<ConfirmOrder />} />}

        {
          stripeApiKey && (
            <Route
              path="/process/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              }
            />
          )
        }


        {isAuthenticated && <Route path='/success' element={<OrderSuccess />} />}
        {isAuthenticated && <Route path='/orders' element={<Order />} />}
        {isAuthenticated && <Route path='/order/:id' element={<OrderDetails />} />}
        {isAuthenticated && <Route path='/admin/dashboard' element={<Dashboard />} />}


        {/* is ko comment kr dna ha bad me  */}
        {/* <Route path='/shippingss' element={<Shipping />} /> */}










        {/* {isAuthenticated ? <Route path='/profile' element={<Profile />}  /> : <Route path='/loginSignup' element={<LoginSign />} />} */}

        {/* <Route path="/login" element={user ? <Navigate replace  to="/profile" /> : <LoginSign />}/> */}


      </Routes>
      <Footer />
    </BrowserRouter>


  </>
);
}

export default App;
