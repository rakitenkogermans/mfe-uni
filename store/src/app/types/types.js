// export interface StateType {
//
//     user?: User;
//     token?: string;
//
//     productList?: ProductListState;
//     productDetails?: string;
//     cart?: Cart[];
//
//     fetchProductsList: () => Promise<void>;
// };
//
// export interface ProductListState extends LocalState {
//     products?: Product[];
//
//     // pagination
//     page: number;
//     limit: number;
//     hasMore: boolean;
//
//     // filters
//     order: SortOrder;
//     sort: ProductSortField;
//     search: string;
//     type: ProductTypes;
//
//     // search: string;
//     // sort: SortOptionsEnum;
//     // order: SortOrderOptions;
//     // clearFilters: () => void;
//     // changePage: (page: number) => void;
// }
//
// export interface User {
//     id: string;
//     username: string;
//     role: UserRoles;
//     avatar: string;
// }
//
// enum UserRoles {
//     ADMIN = "ADMIN",
//     USER = "USER"
// }
//
// export interface Product {
//     id: string;
//     name: string;
//     price: number;
//     description: string;
//     image: string;
//     longDescription: string;
//     types: ProductTypes[]
// }
//
// export enum ProductTypes {
//     ALL = 'ALL',
//     GAMING = 'GAMING',
//     ULTRABOOK = 'ULTRABOOK',
//     BUSINESS = 'BUSINESS',
//     TWO_IN_ONE = '2 IN 1',
//     CHROMEBOOK = 'CHROMEBOOK'
// }
//
// interface LocalState {
//     isLoading: boolean;
//     showAlert: boolean;
//     alertText: string;
//     alertType?: 'danger' | 'success' ;
// }
//
// export type AlertPayload = {
//     alertText: string;
// };
//
// export interface Cart {
//     product: string;
//     name: string;
//     image: string;
//     price: number;
//     countInStock: number;
//     qty: number;
// };
//
// export type SortOrder = 'asc' | 'desc';
//
// export enum ProductSortField {
//     ID = 'id',
//     NAME = 'name',
//     PRICE = 'price',
// }
