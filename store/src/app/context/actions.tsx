import {ProductListAction} from "./actions/productList";
import {CartAction} from "./actions/cart";

export enum AppActionTypes {

}

export type AppAction = ProductListAction | CartAction
