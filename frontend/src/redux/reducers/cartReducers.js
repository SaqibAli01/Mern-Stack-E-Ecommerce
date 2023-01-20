//import file cartConstance.js
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
} from "../constant/cartConstance";

//create cartReducer or is k bad is ko action me import kr dana ha 
// is cartReducer ko store me add be krna ha
//shippingInfo:{} ye cart reducer me add ho jy is ko shipping.js me ja k get kr ly gy
export const cartReducer = (state = { cartItems: [], shippingInfo:{} }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            //All items ko cart me a jy gi
            const item = action.payload;

            //if item not find then 
            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );


            if (isItemExist) {
                return {
                    //agr item already ho cart me to use ki replace kr dy gy
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.product === isItemExist.product ? item : i
                    ),
                };
            }
            else {
                //agr cart me item ni ha to us item ko cart me add kr dy gy
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }

        //-----------------Remove Cart Item-----------
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product !== action.payload),
            }
         //-----------------Save Shipping info-----------
         case SAVE_SHIPPING_INFO:
            return {
               ...state,
               shippingInfo: action.payload,
            }


        default:
            return state
    }
}