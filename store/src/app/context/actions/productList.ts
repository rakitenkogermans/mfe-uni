// import { AlertPayload, Product } from "../../types/types";

export const ProductListActionTypes = {
    PRODUCT_LIST_DISPLAY_ALERT: 'SHOW_ALERT',
    PRODUCT_LIST_CLEAR_ALERT: 'CLEAR_ALERT',
    PRODUCT_LIST_BEGIN: 'PRODUCT_LIST_BEGIN',
    PRODUCT_LIST_SUCCESS: 'PRODUCT_LIST_SUCCESS',
    PRODUCT_LIST_ERROR: 'PRODUCT_LIST_ERROR',
    PRODUCT_LIST_SET_PAGE: 'PRODUCT_LIST_SET_PAGE',
}

// export type ProductListAction =
//     | { type: ProductListActionTypes.PRODUCT_LIST_DISPLAY_ALERT }
//     | { type: ProductListActionTypes.PRODUCT_LIST_CLEAR_ALERT }
//     | { type: ProductListActionTypes.PRODUCT_LIST_BEGIN }
//     | { type: ProductListActionTypes.PRODUCT_LIST_SUCCESS; payload: Product[] }
//     | { type: ProductListActionTypes.PRODUCT_LIST_ERROR; payload: AlertPayload }
