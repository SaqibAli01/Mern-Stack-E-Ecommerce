//----------------------Import Constance.js ------------------------
import {
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL,
    UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
    CLEAR_ERRORS
}
    from '../constant/profileConstance';

//backend sy data leny k lia axios ko import kia ha
import axios from "axios";



//--------------Update Profile ----------------------
//userData ham ny parameter bhja ha is ko profile.js me get kry gy 
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch(
            {
                type: UPDATE_USER_REQUEST
            });

        const config = { Headers: { "Content-Type": "multipart/form-data" } }

        //backend me ye routes tha
        const { data } = await axios.put(`/api/v1/me/update`, userData, config);

        //  payload: data.success backend me success true bhja ha
        dispatch(
            {
                type: UPDATE_USER_SUCCESS,
                payload: data.success
            })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        })
    }

}

//--------------Update Password ----------------------
//userData ham ny parameter bhja ha is ko Password.js me get kry gy 
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        //backend me ye routes tha
        const { data } = await axios.put(`/api/v1/password/update`, passwords, config);

        //  payload: data.success backend me success true bhja ha
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }

}

//---------------------- forgot Password ------------------------
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch(
            {
                type: FORGOT_PASSWORD_REQUEST
            });

        const config = { Headers: { "Content-type": "application/json" } }

        // ye backend sy forgot ka data lia ha 
        const { data } = await axios.post(`/api/v1/password/forgot`, email, config);

        dispatch(
            {
                type: FORGOT_PASSWORD_SUCCESS,
                payload: data.message,
            }
        )

    } catch (error) {
        dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message })
    }
}

//----------------------------- forgot Password ------------------------
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch(
            {
                type: RESET_PASSWORD_REQUEST
            });

        const config = { Headers: { "Content-type": "application/json" } }

        // ye backend sy RESET ka data lia ha 
        const { data } = await axios.put(`/api/v1/password/reset/${token}`,
            passwords,
            config
        );

        dispatch(
            {
                type: RESET_PASSWORD_SUCCESS,
                payload: data.success,
            }
        )

    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}


//--------------------clear error ka function-------------------------------------------
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}