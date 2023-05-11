import {useCallback, useEffect} from "react";
import {ProductDetailsCard} from "./ProductDetailsCard";
import { useStore } from 'store/Store';
import {ProductDetailsSkeleton} from "./ProductDetailsSkeleton";

const ProductDetails= ({ id }) => {
    const { fetchProductById, productDetails, addNewItemToCart } = useStore();
    const { product, isLoading } = productDetails;

    useEffect(() => {
        fetchProductById(id);
    }, []);

    const onAddToCart = useCallback((product, qty) => {
        addNewItemToCart(product, qty)
    }, [addNewItemToCart]);

    if (isLoading || !product) {
        return (
            <div>
                <ProductDetailsSkeleton/>
            </div>
        );
    }

    return (
        <div>
            <ProductDetailsCard product={product} onClick={onAddToCart}/>
        </div>
    );
};

export { ProductDetails };
