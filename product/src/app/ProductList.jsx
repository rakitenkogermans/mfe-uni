import './styles/index.scss'
import { ProductCard } from "./ProductCard";
import {memo, useCallback, useEffect, useRef} from "react";
import { useStore } from 'store/Store';
import {useInfiniteScroll} from "./hooks/useInfiniteScroll";
import {ProductCardSkeleton} from "./ProductCardSkeleton";

const ProductList = memo(({ className }) => {
    const { fetchProductsList, fetchNextProductsList, addNewItemToCart, productList } = useStore();
    const { products, isLoading } = productList;
    const triggerRef = useRef(null);

    const onScrollEnd = useCallback(() => {
        fetchNextProductsList()
    }, [fetchNextProductsList]);

    useEffect(() => {
        fetchProductsList();
    }, []);

    useInfiniteScroll({
        triggerRef,
        callback: onScrollEnd,
    });

    const onAddToCart = useCallback((product) => {
        addNewItemToCart(product, 1)
    }, [addNewItemToCart]);

    return (
        <div>
            <section className="grid grid-cols-3 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onClick={onAddToCart}/>
                ))}
                {isLoading && (
                    <>
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                    </>
                )}
            </section>
            <div
                className="h-2 m-1"
                ref={triggerRef}
            />
        </div>
    );
});

export { ProductList };
