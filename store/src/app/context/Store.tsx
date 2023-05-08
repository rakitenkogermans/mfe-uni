import {createContext, FC, ReactNode, useContext, useEffect, useReducer} from 'react';
import {Product, ProductListState, ProductSortField, ProductTypes, StateType} from "../types/types";
import {productListReducer} from "./reducers/productList";
import {ProductListActionTypes} from "./actions/productList";
import {AxiosError} from "axios";
import {LOCAL_STORAGE_USER_KEY} from "../../constants/localstorage";
import axios from "axios";
import {$api} from "../../api/api";

// const $api = axios.create({
//     baseURL: __API__,
// });
//
// $api.interceptors.request.use(
//     (config) => {
//         if (config.headers) {
//             const token = localStorage.getItem(LOCAL_STORAGE_USER_KEY) ?? '';
//             config.headers.authorization = token;
//         }
//
//         return config;
//     },
//
//     async (error) => await Promise.reject(error),
// );

const productListInitialState: ProductListState = {
    hasMore: false,
    limit: 9,
    order: 'asc',
    page: 1,
    search: "",
    sort: ProductSortField.ID,
    type: ProductTypes.ALL,

    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: undefined,

    products: []
};

const initialState: StateType = {
    productList: productListInitialState,

    fetchProductsList: async function () {},
}

const Store = createContext<StateType>(initialState);

const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [productListState, productListDispatch] = useReducer(productListReducer, productListInitialState);

    useEffect(() => {
        fetchProductsList();
    }, []);

    const fetchProductsList = async () => {
        const { search, order, sort, page, type, limit } = productListState;

        productListDispatch({ type: ProductListActionTypes.PRODUCT_LIST_BEGIN });

        try {
            const { data } = await $api.get<Product[]>('/laptops', {
                params: {
                    _limit: limit,
                    _page: page,
                    _sort: sort,
                    _order: order,
                    q: search,
                    types: type === ProductTypes.ALL ? undefined : type,
                },
            });
            productListDispatch({
                type: ProductListActionTypes.PRODUCT_LIST_SUCCESS,
                payload: data,
            });
        } catch (err) {
            if (err instanceof AxiosError) {
                productListDispatch({
                    type: ProductListActionTypes.PRODUCT_LIST_ERROR,
                    payload: {alertText: 'Try again later!'}
                })
            }
        }
    };


    const addUserToLocalStorage = () => {
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify('user'));
    };

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    };

    return (
        <Store.Provider
            value={{
                productList: {...productListState},
                fetchProductsList,
            }}
        >
            {children}
        </Store.Provider>
    );
};

const useStore = () => {
    return useContext(Store);
};

export { StoreProvider, productListInitialState, useStore };
