import {
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST, MY_ORDER_SUCCESS, MY_ORDER_FAIL,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
    CLEAR_ERRORS,
} from '../constant/orderConstance';

//create function
//state ko empty bhja ha or ...is ko store me ja k import kr dna ha
export const newOrderReducer = (state = {}, action) => {
    switch (action.type){
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            }
        case CREATE_ORDER_FAIL:
            return {
                // loading: true,
                loading: false,
                error: action.payload,
            };

            //clear error ------------------------
            case CREATE_ORDER_FAIL:
            return {
                ...state,
                error: null,
            };
        default :
        return state;
    }
}


//----------------My Order---------------------------
//state = {orders: []}, is k under ak initialState bani ha
export const myOrdersReducer = (state = {orders: []}, action) => {
    switch (action.type){
        case MY_ORDER_REQUEST:
            return {
                loading: true,
            };
        case MY_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            }
        case MY_ORDER_FAIL:
            return {
                // loading: true,
                loading: false,
                error: action.payload,
            };

            //clear error ------------------------
            case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default :
        return state;
    }
}

//------------------------------------------------Order Details Reducers---------------------------------------------------

export const OrdersDetailsReducer = (state = {order: {}}, action) => {
    switch (action.type){
        case ORDER_DETAILS_REQUEST:
            return {
                loading: true,
            };
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            }
        case ORDER_DETAILS_FAIL:
            return {
                // loading: true,
                loading: false,
                error: action.payload,
            };

            //clear error ------------------------
            case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default :
        return state;
    }
}