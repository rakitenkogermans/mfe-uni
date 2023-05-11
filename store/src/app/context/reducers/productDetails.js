import {ProductDetailsActionTypes} from "../actions/productDetails";

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

    if (action.type === ProductDetailsActionTypes.PRODUCT_DETAILS_RESET) {
        return {
            ...state,
            product: null
        };
    }

    throw new Error(`no such action`);
};

export { productDetailsReducer };
