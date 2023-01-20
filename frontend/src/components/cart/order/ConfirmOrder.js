import { Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MetaData from '../../metadata/MetaData';
import CheckoutSteps from '../checkOutStage/CheckoutSteps';
import "./confirmOrder.css";
import { useNavigate } from "react-router-dom";



function ConfirmOrder() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    console.log("------------------------")
    console.log("user...", user?.name);
    console.log("------------------------")

    // console.log("------------------------")
    // console.log("shippingInfo...", shippingInfo);
    // console.log("cartItems...", cartItems);
    // console.log("------------------------")


    //reduce method be foreach ki thra kam krta ha
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.20;

    const totalPrice = subtotal + tax + shippingCharges;


    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };
        //sessionStorage or localStorge same ha is me tab ko close be kr dy to be data save rhy ga
        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        navigate("/process/payment");
    };
    return <Fragment >
        <MetaData title="Confirm Order" />
        <CheckoutSteps activeStep={1} />
        <div className="fragmentssss">
        <div className='EditCardOrder'>
        <div className="confirmOrderPage">
            <div>
                <div className="confirmshippingArea">
                    <Typography>Shipping Info</Typography>
                    <div className="confirmshippingAreaBox">
                        <div>
                            <p>Name:</p>
                            <span>{user?.name}</span>
                        </div>
                        <div>
                            <p>Phone:</p>
                            <span>{shippingInfo.phoneNo}</span>
                        </div>
                        <div>
                            <p>Address:</p>
                            <span>{address}</span>
                        </div>
                    </div>
                </div>
                <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                        {cartItems &&
                            cartItems.map((item) => (
                                <div key={item.product}>
                                    <img src={item.image} alt="Product" />
                                    <Link to={`/product/${item.product}`}>
                                        {item.name}
                                    </Link>{" "}
                                    <span>
                                        {item.quantity} X ${item.price} ={" "}
                                        <b>${item.price * item.quantity}</b>
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            {/*  */}
            <div>
                <div className="orderSummary">
                    <Typography>Order Summery</Typography>
                    <div>
                        <div>
                            <p>Subtotal:</p>
                            <span>${subtotal}</span>
                        </div>
                        <div>
                            <p>Shipping Charges:</p>
                            <span>${shippingCharges}</span>
                        </div>
                        <div>
                            <p>GST:</p>
                            <span>${tax}</span>
                        </div>
                    </div>

                    <div className="orderSummaryTotal">
                        <p>
                            <b>Total:</b>
                        </p>
                        <span>${totalPrice}</span>
                    </div>

                    <button onClick={proceedToPayment}>Proceed To Payment</button>
              
            
                </div>
            </div>
        </div>
        </div>
        </div>
    </Fragment>
}

export default ConfirmOrder