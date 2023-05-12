import React from 'react';
import {ProductList} from "./ProductList";
import {ProductFilters} from "./ProductFilters";

const ProductsPage = () => {
    return (
        <>
            <ProductFilters />
            <ProductList />
        </>
    );
};

export { ProductsPage };
