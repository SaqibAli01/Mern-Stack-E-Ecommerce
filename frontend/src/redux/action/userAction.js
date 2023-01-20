//----------------------Import Constance.js ------------------------
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERRORS,
    REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL,
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL,
    LOGOUT_SUCCESS, LOGOUT_FAIL,
} from '../constant/UserConstance';

//backend sy data leny k lia axios ko import kia ha
import axios from "axios";


//......is ko LoginSignUp.js ki file me import krna ha .........
//......email or password login hony k lia backend me di ha......
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(
            {
                type: LOGIN_REQUEST
            });

        const config = { Headers: { "Content-type": "application/json" } }
        // ye backend sy login ka data lia ha 
        const { data } = await axios.post(`/api/v1/login`,
            { email, password },
            config
        );
        dispatch(
            {
                type: LOGIN_SUCCESS,
                payload: data.user
            }
        )

    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })
    }
}

//--------------Register ----------------------
//userData ham ny parameter bhja ha is ko loginSinup.js me get kry gy (myForm)
export const register = (userData) => async (dispatch) => {

    try {
        dispatch(
            {
                type: REGISTER_USER_REQUEST
            });

        const config = { Headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.post(`/api/v1/register`, userData, config);

        dispatch(
            {
                type: REGISTER_USER_SUCCESS,
                payload: data.user
            })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        })
    }

}

//-----------------Load User---------------------------
//is ko App.js me import krna ha..is sy agr user already login ha to wo show ho ga or next koe user login login ni ho skta ha
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get(`/api/v1/me`);

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        });

    }

    catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
}

//-------------logout----------------------------

export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/logout`);

        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
};

//--------------------clear error ka function-------------------------------------------
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}