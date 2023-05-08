import { AlertPayload, Product } from "../../types/types";

export enum ProductListActionTypes {
    PRODUCT_LIST_DISPLAY_ALERT = 'SHOW_ALERT',
    PRODUCT_LIST_CLEAR_ALERT = 'CLEAR_ALERT',
    PRODUCT_LIST_BEGIN = 'PRODUCT_LIST_BEGIN',
    PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS',
    PRODUCT_LIST_ERROR = 'PRODUCT_LIST_ERROR',
}

export type ProductListAction =
    | { type: ProductListActionTypes.PRODUCT_LIST_DISPLAY_ALERT }
    | { type: ProductListActionTypes.PRODUCT_LIST_CLEAR_ALERT }
    | { type: ProductListActionTypes.PRODUCT_LIST_BEGIN }
    | { type: ProductListActionTypes.PRODUCT_LIST_SUCCESS; payload: Product[] }
    | { type: ProductListActionTypes.PRODUCT_LIST_ERROR; payload: AlertPayload }
