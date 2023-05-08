import { AlertPayload, Cart, Product } from "../../types/types";

export enum CartActionTypes {
    CART_DISPLAY_ALERT = 'SHOW_ALERT',
    CART_CLEAR_ALERT = 'CLEAR_ALERT',
    CART_ADD_ITEM = 'CART_ADD_ITEM',
    CART_REMOVE_ITEM = 'CART_REMOVE_ITEM',
    CART_RESET = 'CART_RESET',
}

export type CartAction =
    | { type: CartActionTypes.CART_DISPLAY_ALERT }
    | { type: CartActionTypes.CART_CLEAR_ALERT }
    | { type: CartActionTypes.CART_ADD_ITEM; payload: Cart }
    | { type: CartActionTypes.CART_REMOVE_ITEM; payload: { id: string } }
    | { type: CartActionTypes.CART_RESET }
