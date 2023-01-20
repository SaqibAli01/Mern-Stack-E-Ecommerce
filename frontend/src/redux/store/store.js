//step 1 > store ....step 2 > Reducer .... step 3 Action


import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// Ye extension shat connect krty hai
import { composeWithDevTools } from "redux-devtools-extension";

//------------All Import ProductReducer.js --------------------
import {  newReviewReducer, productDetailsReducer, ProductReducer } from "../reducers/ProductReducer";
import { userReducer } from "../reducers/userReducer";
import { forgotPasswordReducer, profileReducer } from "../reducers/profileReducer";
import { cartReducer } from "../reducers/cartReducers";
import { myOrdersReducer, newOrderReducer, OrdersDetailsReducer } from "../reducers/orderReducer";


//----------------ProductReducer.js ko import kia ha yaHa Reducer me---------------------
const reducer = combineReducers({
  products:ProductReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: OrdersDetailsReducer,
  newReview: newReviewReducer,
});

//ye initialState ko cart ki local storage k lia used kia ha
//agr local storage me cart itm ha yo wo string me show is ko cartAction me used kia ha
//shippingInfo ko be localStorge me add kr dia h .. agr na ho to empty object

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [], 
    shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
  }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;