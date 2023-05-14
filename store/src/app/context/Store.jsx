import {createContext, useCallback, useContext, useReducer, useRef, useState} from 'react';
import {productListReducer} from "./reducers/productList";
import {ProductListActionTypes} from "./actions/productList";
import {AxiosError} from "axios";
import {LOCAL_STORAGE_CART_KEY, LOCAL_STORAGE_USER_KEY} from "../../constants/localstorage";
import {$api} from "../../api/api";
import {ProductSortField, ProductTypes} from "../types/constants";
import {ProductDetailsActionTypes} from "./actions/productDetails";
import {productDetailsReducer} from "./reducers/productDetails";
import {cartReducer} from "./reducers/cart";
import {CartActionTypes} from "./actions/cart";
import {userReducer} from "./reducers/user";
import {UserActionTypes} from "./actions/user";

const user = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
const cart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);

const productListInitialState = {
    hasMore: false,
    limit: 9,

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

const cartInitialState = cart ? JSON.parse(cart) : {
    cartItems: [],
    totalQty: 0,
    totalPrice: 0.0,
}

const userInitialState = {
    user: user ? JSON.parse(user) : undefined,

    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: undefined,
}

const initialState = {
    productList: productListInitialState,
    productDetails: productDetailsInitialState,
    cart: cartInitialState,
    user: userInitialState,

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
    changeSortField: function () {},
    changeOrder: function () {},
    changeSearch: function () {},
    changeMinPrice: function () {},
    changeMaxPrice: function () {},
    resetFilter: function () {},

    loginUser: function () {},
    logoutUser: function () {},
}

const Store = createContext(initialState);

const StoreProvider = ({ children }) => {
    const [productListState, productListDispatch] = useReducer(productListReducer, productListInitialState);
    const [productDetailsState, productDetailsDispatch] = useReducer(productDetailsReducer, productDetailsInitialState);
    const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialState);
    const [userState, userDispatch] = useReducer(userReducer, userInitialState);

    const [page, setPage] = useState(1);
    const [type, setType] = useState(ProductTypes.ALL);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(3000);
    const [sort, setSort] = useState(ProductSortField.ID);
    const [order, setOrder] = useState('asc');
    const [search, setSearch] = useState('');

    const replace = useRef(false);

    const { limit } = productListState;

    const loginUser = useCallback(async (username, password) => {
        userDispatch({ type: UserActionTypes.SETUP_USER_BEGIN });
        try {
            const response = await $api.post('/login', {
                    username,
                    password,
            });

            if (!response.data) {
                throw new Error();
            }

            const loggedInUser = {
                id: response.data.id,
                username: response.data.username,
                avatar: response.data.avatar
            };

            addUserToLocalStorage(loggedInUser);

            userDispatch({
                type: UserActionTypes.SETUP_USER_SUCCESS,
                payload: loggedInUser,
            });

        } catch (err) {
            if (err instanceof AxiosError)
                userDispatch({
                    type: UserActionTypes.SETUP_USER_ERROR,
                    payload: { alertText: 'Something went wrong! Try again!' },
                });
        }
    }, []);

    const fetchProductsList = useCallback(async () => {

        productListDispatch({ type: ProductListActionTypes.PRODUCT_LIST_BEGIN });

        try {
            const { data } = await $api.get('/laptops', {
                params: {
                    _limit: limit,
                    _page: page,
                    _sort: sort,
                    _order: order,
                    q: search,
                    price_gte: minPrice,
                    price_lte: maxPrice,
                    types: type === ProductTypes.ALL ? undefined : type.toLowerCase(),
                },
            });

            productListDispatch({
                type: ProductListActionTypes.PRODUCT_LIST_SUCCESS,
                payload: {data, replace: replace.current},
            });

            replace.current = false;
        } catch (err) {
            if (err instanceof AxiosError) {
                productListDispatch({
                    type: ProductListActionTypes.PRODUCT_LIST_ERROR,
                    payload: {alertText: 'Try again later!'}
                })
            }
        }
    }, [limit, page, sort, order, search, minPrice, maxPrice, type]);

    const fetchNextProductsList = useCallback(async () => {
        if (productListState.hasMore && !productListState.isLoading) {
            setPage(prev => prev + 1);
        }
    }, [productListState.hasMore, productListState.isLoading]);

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

    const logoutUser = useCallback(() => {
        userDispatch({ type: UserActionTypes.LOGOUT_USER });
        removeUserFromLocalStorage();
    }, []);

    const addUserToLocalStorage = (user) => {
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    };

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    };

    const getProductTypes = useCallback(() => {
        return Object.entries(ProductTypes).map(([key, value]) => value);
    }, []);

    const changeProductType = useCallback((newType) => {
        replace.current = true;
        setPage(1);

        setType(newType);
    }, []);

    const changeSortField = useCallback((newSort) => {
        replace.current = true;
        setPage(1);

        setSort(newSort);
    }, []);

    const changeOrder = useCallback((newOrder) => {
        replace.current = true;
        setPage(1);

        setOrder(newOrder);
    }, []);

    const changeSearch = useCallback((newSearch) => {
        replace.current = true;
        setPage(1);

        setSearch(newSearch);
    }, []);

    const changeMinPrice = useCallback((newMinPrice) => {
        replace.current = true;
        setPage(1);

        setMinPrice(newMinPrice);
    }, []);

    const changeMaxPrice = useCallback((newMaxPrice) => {
        replace.current = true;
        setPage(1);

        setMaxPrice(newMaxPrice);
    }, []);

    const resetFilter = useCallback(() => {
        changeProductType(ProductTypes.ALL);
        changeSortField(ProductSortField.ID)
        changeOrder('asc')
        changeSearch('')
        changeMinPrice(0)
        changeMaxPrice(3000)
    } ,[changeProductType, changeSortField, changeOrder, changeSearch, changeMinPrice, changeMaxPrice]);

    return (
        <Store.Provider
            value={{
                productList: {...productListState},
                productDetails: {...productDetailsState},
                cart: {...cartState},
                user: {...userState},
                type,
                minPrice,
                maxPrice,
                sort,
                order,
                search,
                page,
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
                changeSortField,
                changeOrder,
                changeSearch,
                changeMinPrice,
                changeMaxPrice,
                resetFilter,
                loginUser,
                logoutUser
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
