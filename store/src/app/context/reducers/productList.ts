import { Reducer } from 'react';
import { Product, ProductListState } from "../../types/types";
import { ProductListAction, ProductListActionTypes } from "../actions/productList";

const productListReducer: Reducer<ProductListState, ProductListAction> = (state, action): ProductListState => {
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
        let oldProducts: Product[] = [];
        if (state.products) {
            oldProducts = [...state.products];
        }
        return {
            ...state,
            isLoading: false,
            products: [...oldProducts, ...action.payload]
        };
    }

    throw new Error(`no such action`);
};

export { productListReducer };
