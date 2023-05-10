import {useEffect} from "react";
import {ProductDetailsCard} from "./ProductDetailsCard";
import { useStore } from 'store/Store';
import {ProductDetailsSkeleton} from "./ProductDetailsSkeleton";

const ProductDetails= ({ id }) => {
    const { fetchProductById, productDetails } = useStore();
    const { product, isLoading } = productDetails;

    useEffect(() => {
        fetchProductById(id);
    }, []);

    if (isLoading || !product) {
        return (
            <div>
                <ProductDetailsSkeleton/>
            </div>
        );
    }

    return (
        <div>
            <ProductDetailsCard product={product} />
        </div>
    );
};

export { ProductDetails };
