import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
} from "../constant/cartConstance";

import axios from "axios"
//---------------------------------------Add To Cart-------------------------------------------

//crate actin addToCart .. is ko productDetails.js me import kerna ha
//product me is ki id or quantity ko ly gy
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    //backend sy data ly gy
    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
        type: ADD_TO_CART,
        //Product payload  me ye sb dy gy
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.Stock,
            quantity,
        },
    });

    //ab agr reload ho jy to to card me sy remove na ho is lia is ko localstorge me save krna ha
    // value: cartItems, key: JSON.stringify()// jb .get method me string ki value dy gy ham ko sb value mil jy gi


    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
};

//---------------------------------------Remove To Cart-------------------------------------------
export const removeItemsFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))

};
//---------------------------------------Save Shipping Info-------------------------------------------
//constant.js me sy get ki ha type SAVE_SHIPPING_INFO
//data wo bhajy gy jo parameter lia h or localstorge me save kr dia ha
export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));


};