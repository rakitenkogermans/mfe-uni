import {ProductDetailsActionTypes} from "../actions/productDetails";
import {ProductListActionTypes} from "../actions/productList";

const productDetailsReducer = (state, action) => {
    if (action.type === ProductDetailsActionTypes.PRODUCT_DETAILS_DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: 'Failed!',
        }
    }

    if (action.type === ProductDetailsActionTypes.PRODUCT_DETAILS_CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: undefined,
            alertText: '',
        };
    }

    if (action.type === ProductDetailsActionTypes.PRODUCT_DETAILS_BEGIN) {
        return {
            ...state,
            showAlert: false,
            isLoading: true
        };
    }

    if (action.type === ProductDetailsActionTypes.PRODUCT_DETAILS_SUCCESS) {

        return {
            ...state,
            isLoading: false,
            hasMore: action.payload.length >= state.limit,
            product: {...action.payload}
        };
    }

    if (action.type === ProductDetailsActionTypes.PRODUCT_DETAILS_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.alertText,
        };
    }

    throw new Error(`no such action`);
};

export { productDetailsReducer };
