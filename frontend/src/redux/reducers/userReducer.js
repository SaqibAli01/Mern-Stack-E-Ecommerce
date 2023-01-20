//----------------------Import Constance.js ------------------------
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERRORS,
    REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL,
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL,
    LOGOUT_SUCCESS, LOGOUT_FAIL
} from '../constant/UserConstance';

//-----------is ko ab store me import kry gy--------------------
export const userReducer = (state = { user: {} }, action) => {


    switch (action.type) {
        //----------------------------------------Login User ------------------------------------------------

        case LOGIN_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            }

        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            }
        case REGISTER_USER_REQUEST:

            return {
                loading: true,
                isAuthenticated: false,
            };

        case REGISTER_USER_SUCCESS:

            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            }
        //----------------------------------------Load User Me ------------------------------------------------

        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            }
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            }
        //----------------------------------------Register User ------------------------------------------------

        case REGISTER_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };

        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            }

        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            }


        //----------------------------------------LOGOUT ------------------------------------------------
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            }
        case LOGOUT_FAIL:
            return {

               ...state,
                loading: false,
                error: action.payload,
            }
        //----------------------------------------Clear Error ------------------------------------------------

        case CLEAR_ERRORS:

            return {
                ...state,
                error: null,
            }
        //----------------------------------------Default ------------------------------------------------

        default:
            return state;
    }

};