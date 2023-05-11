import {ProductDetailsActionTypes} from "../actions/productDetails";
import {CartActionTypes} from "../actions/cart";

const cartReducer = (state, action) => {
    if (action.type === CartActionTypes.CART_DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: 'Failed!',
        }
    }

    if (action.type === CartActionTypes.CART_CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: undefined,
            alertText: '',
        };
    }

    if (action.type === CartActionTypes.CART_ADD_ITEM) {
        const item = action.payload;
        const existItem = state.cartItems.find((p) => p.id === item.id);

        if (!existItem) {
            return { ...state, cartItems: [...state.cartItems, item], totalQty: state.cartItems.length + 1 };
        }

        return {
            ...state,
            cartItems: state.cartItems.map((p) => {
                const isSameItem = p.id === existItem.id;
                if (isSameItem) {
                    p.qty += item.qty;
                }
                return p;
            }),
            totalQty: state.cartItems.length
        };
    }

    if (action.type === CartActionTypes.CART_REMOVE_ITEM) {
        return {
            ...state,
            cartItems: state.cartItems.filter((item) => item.id !== action.payload),
            totalQty: state.cartItems.length - 1
        };
    }

    if (action.type === CartActionTypes.CART_CHANGE_ITEM_QTY) {
        const item = action.payload;

        return {
            ...state,
            cartItems: state.cartItems.map((p) => {
                const isSameItem = p.id === item.id;
                if (isSameItem) {
                    p.qty = item.qty;
                }
                return p;
            }),
            totalQty: state.cartItems.length
        };
    }

    if (action.type === CartActionTypes.CART_RESET) {
        return {
            ...state,
            cartItems: [],
            totalQty: 0
        };
    }

    throw new Error(`no such action`);
};

export { cartReducer };
