import {createContext, useCallback, useContext, useReducer, useState} from 'react';
import {productListReducer} from "./reducers/productList";
import {ProductListActionTypes} from "./actions/productList";
import {AxiosError} from "axios";
import {LOCAL_STORAGE_USER_KEY} from "../../constants/localstorage";
import {$api} from "../../api/api";
import {ProductSortField, ProductTypes} from "../types/constants";
import {ProductDetailsActionTypes} from "./actions/productDetails";
import {productDetailsReducer} from "./reducers/productDetails";
import {cartReducer} from "./reducers/cart";
import {CartActionTypes} from "./actions/cart";

const productListInitialState = {
    hasMore: false,
    limit: 9,
    order: 'asc',
    page: 1,
    search: "",
    sort: ProductSortField.ID,

    _init: false,

    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: undefined,

    products: []
};

const productDetailsInitialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: undefined,
};

const cartInitialState = {
    cartItems: [],
    totalQty: 0,
    totalPrice: 0.0,
}

const initialState = {
    productList: productListInitialState,
    productDetails: productDetailsInitialState,
    cart: cartInitialState,

    type: ProductTypes.ALL,

    fetchProductsList: async function () {},
    fetchNextProductsList: async function () {},
    fetchProductById: async function () {},
    resetProductDetails: function () {},
    addNewItemToCart: function () {},
    removeItemFromCart: function () {},
    changeItemQtyInCart: function () {},
    resetCart: function () {},
    getProductTypes: function () {},
    changeProductType: function () {},
    nextPage: function () {},
}

const Store = createContext(initialState);

const StoreProvider = ({ children }) => {
    const [productListState, productListDispatch] = useReducer(productListReducer, productListInitialState);
    const [productDetailsState, productDetailsDispatch] = useReducer(productDetailsReducer, productDetailsInitialState);
    const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialState);

    const [type, setType] = useState(ProductTypes.ALL);

    const { search, order, sort, page, limit } = productListState;

    const fetchProductsList = useCallback(async (init, replace) => {

        productListDispatch({ type: ProductListActionTypes.PRODUCT_LIST_BEGIN });

        try {
            const { data } = await $api.get('/laptops', {
                params: {
                    _limit: limit,
                    _page: init ? 1 : page,
                    _sort: sort,
                    _order: order,
                    q: search,
                    types: type === ProductTypes.ALL ? undefined : type.toLowerCase(),
                },
            });

            productListDispatch({
                type: ProductListActionTypes.PRODUCT_LIST_SUCCESS,
                payload: {data, replace},
            });

            productListDispatch({
                type: ProductListActionTypes.PRODUCT_LIST_SET_PAGE,
                payload: init ? 2 : page + 1
            });
        } catch (err) {
            if (err instanceof AxiosError) {
                productListDispatch({
                    type: ProductListActionTypes.PRODUCT_LIST_ERROR,
                    payload: {alertText: 'Try again later!'}
                })
            }
        }
    }, [limit, page, sort, order, search, type]);

    const nextPage = useCallback(async () => {
        if (productListState.hasMore && !productListState.isLoading) {
            productListDispatch({
                type: ProductListActionTypes.PRODUCT_LIST_SET_PAGE,
                payload: productListState.page + 1
            });
        }
    }, [productListState.hasMore, productListState.isLoading, productListState.page]);

    const fetchNextProductsList = useCallback(async () => {
        if (productListState.hasMore && !productListState.isLoading) {
            fetchProductsList();
        }
    }, [productListState.hasMore, productListState.isLoading, fetchProductsList]);

    const fetchProductById = useCallback(async (id) => {
        productDetailsDispatch({ type: ProductDetailsActionTypes.PRODUCT_DETAILS_BEGIN });
        try {
            const { data } = await $api.get(`/laptops/${id}`);

            productDetailsDispatch({
                type: ProductDetailsActionTypes.PRODUCT_DETAILS_SUCCESS,
                payload: data,
            });
        } catch (err) {
            if (err instanceof AxiosError) {
                productDetailsDispatch({
                    type: ProductDetailsActionTypes.PRODUCT_DETAILS_ERROR,
                    payload: {alertText: 'Try again later!'}
                })
            }
        }
    }, []);

    const resetProductDetails = useCallback(async () => {
        productDetailsDispatch({ type: ProductDetailsActionTypes.PRODUCT_DETAILS_RESET });
    }, []);

    const addNewItemToCart = useCallback((product, qty) => {
        const item = {...product, qty};
        cartDispatch({
            type: CartActionTypes.CART_ADD_ITEM,
            payload: item
        })
    }, []);

    const removeItemFromCart = useCallback((id) => {
        cartDispatch({
            type: CartActionTypes.CART_REMOVE_ITEM,
            payload: id
        })
    }, []);

    const changeItemQtyInCart = useCallback((product, qty) => {
        const item = {...product, qty};
        cartDispatch({
            type: CartActionTypes.CART_CHANGE_ITEM_QTY,
            payload: item
        })
    }, []);

    const resetCart = useCallback(() => {
        cartDispatch({
            type: CartActionTypes.CART_RESET,
        })
    }, []);

    const addUserToLocalStorage = () => {
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify('user'));
    };

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    };

    const getProductTypes = useCallback(() => {
        return Object.entries(ProductTypes).map(([key, value]) => value);
    }, []);

    const changeProductType = useCallback((newType) => {
        productListDispatch({
            type: ProductListActionTypes.PRODUCT_LIST_RESET
        })

        setType(newType);
    }, []);

    return (
        <Store.Provider
            value={{
                productList: {...productListState},
                productDetails: {...productDetailsState},
                cart: {...cartState},
                type,
                fetchProductsList,
                fetchNextProductsList,
                fetchProductById,
                resetProductDetails,
                addNewItemToCart,
                removeItemFromCart,
                changeItemQtyInCart,
                resetCart,
                getProductTypes,
                changeProductType,
                nextPage
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
