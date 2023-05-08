// import { AppAction, AppActionTypes } from './actions';
// import { Reducer } from 'react';
// import { productListInitialState } from './appContext';
// import {StateType} from "../types/types";
// import {ProductListActionTypes} from "./actions/productList";
//
// const reducer: Reducer<StateType, AppAction> = (state, action) => {
//     if (action.type === ProductListActionTypes.PRODUCT_LIST_DISPLAY_ALERT) {
//         return {
//             ...state,
//             productList: {
//                 showAlert: true,
//                 alertType: 'danger',
//                 alertText: 'Please provide all values!',
//             }
//         };
//     }
//
//     if (action.type === ProductListActionTypes.PRODUCT_LIST_CLEAR_ALERT) {
//         return {
//             ...state,
//             productList: {
//                 showAlert: false,
//                 alertType: null,
//                 alertText: '',
//             }
//         };
//     }
//
//
//     throw new Error(`no such action`);
// };
//
// export default reducer;
