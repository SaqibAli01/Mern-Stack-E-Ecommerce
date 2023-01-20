//step 1 > store ....step 2 > Reducer .... step 3 Action

//----------Import file Constant.js And ProductAction.js-----------
//----------Import Get All Product Details -----------------------------

import {
    ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, ALL_PRODUCT_FAIL, 
    PRODUCT_DETAILS_REQUEST,  PRODUCT_DETAILS_SUCCESS,  PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,  NEW_REVIEW_SUCCESS,  NEW_REVIEW_FAIL,NEW_REVIEW_RESET,
    CLEAR_ERROR,

} from "../constant/ProductConstance";


//state k under ak product ki empty array dy di;
//action.type = 3 type k ha ye ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, ALL_PRODUCT_FAIL;
//product: action.payload.products ye file ham action wali file me bany gy kia mela ga ham ko action product me;


//is ko store me ja k import krna ha
export const ProductReducer = ((state = { products: [] }, action) => {
    //switch Statement
    switch (action.type) {
        //One
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }

        //two
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage, 
                filteredProductsCount: action.payload.filteredProductsCount,
            }

        //three
        case ALL_PRODUCT_FAIL:
            return {
                loading: true,
                error: action.payload,
            }

        //four
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }

        default:
            return state;
    }
});

//----------Import Get All Product Details -----------------------------
//initialState is me object ha => products: {}.....is ko store.js me import krna ha...
export const productDetailsReducer = ((state = { product: {} }, action) => {
    //switch Statement
    switch (action.type) {
        //One
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }

        //two
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            }

        //three
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: true,
                error: action.payload,
            }

        //four
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }

        default:
            return state;
    }
});


//-------------------------Review ----------------------------
export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case NEW_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_REVIEW_SUCCESS:
        return {
          loading: false,
          success: action.payload,
        };
      case NEW_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_REVIEW_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERROR:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };