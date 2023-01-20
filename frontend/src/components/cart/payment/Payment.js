
import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../checkOutStage/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../metadata/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
//react stripe k lia ye cheezy import ki ha card k lia
//CardNumberElement use krny k li App.js me kuch cheezy ko import krna ha
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useNavigate } from "react-router-dom";
import { clearErrors, createOrder } from "../../../redux/action/orderAction";




function Payment() {

  //localstorge ki thra browser me save kia ha us ko get kia ha
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));


  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  //store me sy get ki value newOrder ki
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  // ORDER-----------------------------------------
  const order = {
    shippingInfo,
    orderItems: cartItems,
    paymentInfo: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  }


  //---------------------------------------------------------------------------------------------------------------------------

  const submitHandler = async (e) => {
    e.preventDefault();
    //submit ho jy or button disabled ho jy ga
    payBtn.current.disabled = true;

    try {
      //--------------------------------------------------------------------------------------
      //backend sy get kia..... paymentData ka object bania ha
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      //data sy client_secret lia ha
      const client_secret = data.client_secret;

      //ye stripe or elements opr ha or agr kuch na ho to idr sy return ho jy...........
      if (!stripe || !elements) return;
      //--------------------------------------------------------------------------------------

      //client_secret data me sy get kia ha

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          //is sy card no mil jy ga................
          card: elements.getElement(CardNumberElement),

          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });


      //agr result error aia to ye condition chaly gi
      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      }
      else {

        if (result.paymentIntent.status === "succeeded") {



          navigate("/success");
          //userSchema me id or status dia ha
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
        }
        else {
          alert.error("There's some issue while processing payment ");
        }

      }


      //-------------------------------------------------------------------------------------
    } catch (error) {
      //agr error ay ga to button disabled ni ho ga
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  }


  //---------------useEffect--------------
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert])

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <div className="EditCardOrder">
          <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
            <Typography>Card Info</Typography>
            {/* <span style={{textAlign: "center"}}> 4242 4242 4242 4242</span> */}
            <div>
              <CreditCardIcon />
              <CardNumberElement className="paymentInput" />
              
            </div>
            <div>
              <EventIcon />
              <CardExpiryElement className="paymentInput" />
            </div>
            <div>
              <VpnKeyIcon />
              <CardCvcElement className="paymentInput" />
            </div>

             {/* <input
              type="submit"
              value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
              ref={payBtn}
              className="paymentFormBtn"
            />  */}
            
        {/* button  */}
            <div className='EditBtn EditBtns' >
              <button
               type="submit"
               value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
               ref={payBtn}
               
                className="save">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default Payment



