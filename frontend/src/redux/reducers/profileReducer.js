
//----------------User Reducer--------------------------
//----------------------Import Constance.js ------------------------
import {
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_RESET, UPDATE_USER_FAIL,
    UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_RESET, UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
    CLEAR_ERRORS
}
    from '../constant/profileConstance'


////-----------is ko ab store me import kry gy--------------------
export const profileReducer = (state = {}, action) => {

    switch (action.type) {
        //-----------------Update User Profile Request--------------------
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false,

            };
        case UPDATE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        //-----------------Update User Password Request--------------------
        case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false,

            };
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };


        //-----------------FORGOT Password Request--------------------
        // case FORGOT_PASSWORD_REQUEST:
        //     return {
        //         ...state,
        //         loading: true,
        //         error: null,
        //     };
        // case FORGOT_PASSWORD_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         message: action.payload,
        //     };
        // case FORGOT_PASSWORD_FAIL:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: action.payload,
        //     };
        //----------------------------------------Clear Error ------------------------------------------------

        case CLEAR_ERRORS:

            return {
                ...state,
                error: null,
            }

        default:
            return state;
    }
}

//-----------Forgot Password..import to store ---------------------------

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };
        case FORGOT_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        //---------------------Reset Password-------------------------


        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
            };
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };


        //---------------------Clear Error-------------------------
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        //---------------Default -------------------------
        default:
            return state;
    }
};

