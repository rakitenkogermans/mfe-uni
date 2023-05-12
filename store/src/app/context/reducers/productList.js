import { ProductListActionTypes } from "../actions/productList";
import {ProductTypes} from "../../types/constants";

const productListReducer = (state, action) => {
    if (action.type === ProductListActionTypes.PRODUCT_LIST_DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: 'Failed!',
        }
    }

    if (action.type === ProductListActionTypes.PRODUCT_LIST_CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: undefined,
            alertText: '',
        };
    }

    if (action.type === ProductListActionTypes.PRODUCT_LIST_BEGIN) {
        return {
            ...state,
            showAlert: false,
            isLoading: true
        };
    }

    if (action.type === ProductListActionTypes.PRODUCT_LIST_SUCCESS) {
        let oldProducts = [];
        if (state.products) {
            oldProducts = [...state.products];
        }
        return {
            ...state,
            isLoading: false,
            hasMore: action.payload.data.length >= state.limit,
            products: action.payload.replace ? [...action.payload.data] : [...oldProducts, ...action.payload.data],
            _init: true
        };
    }

    if (action.type === ProductListActionTypes.PRODUCT_LIST_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.alertText,
        };
    }

    if (action.type === ProductListActionTypes.PRODUCT_LIST_SET_PAGE) {
        return {
            ...state,
            page: action.payload,
        };
    }

    if (action.type === ProductListActionTypes.PRODUCT_LIST_CHANGE_TYPE) {
        return {
            ...state,
            type: ProductTypes[action.payload],
        };
    }

    if (action.type === ProductListActionTypes.PRODUCT_LIST_RESET) {
        return {
            ...state,
            products: [],
        };
    }

    throw new Error(`no such action`);
};

export { productListReducer };
