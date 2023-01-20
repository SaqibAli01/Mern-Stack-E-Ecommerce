//step 1 > store ....step 2 > Reducer .... step 3 Action

import axios from "axios";

//--------Import file Constant.js And ProductAction.js-----------
import {
    ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, ALL_PRODUCT_FAIL, CLEAR_ERROR,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,  NEW_REVIEW_SUCCESS,  NEW_REVIEW_FAIL,

} from "../constant/ProductConstance";

//-------------------------------------------------------------------------------------------------------------------------------------
// ----------------is file ko Home.js me import krna ha-----------
//currentPage ko prodtucts.js me sy get kia ha
export const getProduct = (keyword = "", currentPage = 1, price = [0, 25000], category ,ratings = 0) => async (dispatch) => {

    try {
        dispatch({
            type: ALL_PRODUCT_REQUEST,
        });
        //backend sy data lia backend Product rotes me ye rotes tha /products ..is sy ham ko data mil jy ga
        // old link = /api/v1/products ..
        //keyword ko add krny k bad link
        // let links = `/api/v1/products?keyword=${keyword}`;

        // currentPage lagny k bad link ko update kr dia me ny
        // let links = `/api/v1/products?keyword=${keyword}&page=${currentPage}`;

        // price  lagny k bad link ko update kr dia me ny..&price[greatThen >]=${price[0 index]}&price[lessThen <]=${price[1 index]}
        // let links = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

        //ratings update links
        let links = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;


        //agr category ha to ye link kr dy gy is ka 
        if (category) {
         links = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        
        }

        const { data } = await axios.get(links);

        //Data ko reducer me bhjna ha ab
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        //agr error ay to to ReducerProduct,js me fail fuc ko call kr di OR khodi bata dia is ko fail hoa ha or is ko return kr dy gy store.js me

        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
};
//-------------------------------------------------------------------------------------------------------------------------------------
//------------------Get All Product Details Actions-------------------
// is file ko ProductDetails.js me import krna ha..is me ham data ko bhajty ha ha reducer sy ly kr 

export const getProductDetails = (id) => async (dispatch) => {

    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        //backend sy data lia backend Product rotes me ye rotes tha /products ..is sy ham ko data mil jy ga..or ID sy ham ko product details mil jy gi

        const { data } = await axios.get(`/api/v1/product/${id}`);
        // console.log("Data ...", data)

        //Payload me data.product  ko bhajy gy ham or Reducer me received kr rahy ha action.payload.product
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        })

    } catch (error) {
        //agr error ay to to ReducerProduct,js me fail fuc ko call kr di OR khodi bata dia is ko fail hoa ha or is ko return kr dy gy store.js me

        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
};





//-----------------------------Review----------------------------
export const newReview = (reviewData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_REVIEW_REQUEST });

        const config = {
            headers: { "Content-type": "application/json"},
        };

        //reviewData>-->  user: req.user._id, name: req.user.name,rating: Number(rating),comment,
        const { data } = await axios.put(`/api/v1/review`, reviewData, config);
        // console.log("Data ...", data)

        //Payload me data.product  ko bhajy gy ham or Reducer me received kr rahy ha action.payload.product
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        //agr error ay to to ReducerProduct,js me fail fuc ko call kr di OR khodi bata dia is ko fail hoa ha or is ko return kr dy gy store.js me

        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        })
    }
};

















// clearing null ...Ak reducer me clear Error type bani ha;
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
}