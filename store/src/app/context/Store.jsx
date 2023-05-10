import {createContext, useCallback, useContext, useReducer} from 'react';
import {productListReducer} from "./reducers/productList";
import {ProductListActionTypes} from "./actions/productList";
import {AxiosError} from "axios";
import {LOCAL_STORAGE_USER_KEY} from "../../constants/localstorage";
import {$api} from "../../api/api";
import {ProductSortField, ProductTypes} from "../types/constants";

const productListInitialState = {
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

const initialState = {
    productList: productListInitialState,

    fetchProductsList: async function () {},
    fetchNextProductsList: async function () {},
}

const Store = createContext(initialState);

const StoreProvider = ({ children }) => {
    const [productListState, productListDispatch] = useReducer(productListReducer, productListInitialState);

    const fetchProductsList = useCallback(async () => {
        const { search, order, sort, page, type, limit } = productListState;

        productListDispatch({ type: ProductListActionTypes.PRODUCT_LIST_BEGIN });

        try {
            const { data } = await $api.get('/laptops', {
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

            productListDispatch({
                type: ProductListActionTypes.PRODUCT_LIST_SET_PAGE,
                payload: productListState.page + 1
            });
        } catch (err) {
            if (err instanceof AxiosError) {
                productListDispatch({
                    type: ProductListActionTypes.PRODUCT_LIST_ERROR,
                    payload: {alertText: 'Try again later!'}
                })
            }
        }
    }, [productListState]);

    const fetchNextProductsList = useCallback(async () => {
        if (productListState.hasMore && !productListState.isLoading) {
            fetchProductsList();
        }
    }, [fetchProductsList]);


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
                fetchNextProductsList
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
