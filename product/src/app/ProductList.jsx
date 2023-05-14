import './styles/index.scss'
import { ProductCard } from "./ProductCard";
import {memo, useCallback, useEffect, useRef} from "react";
import { useStore } from 'store/Store';
import {useInfiniteScroll} from "./hooks/useInfiniteScroll";
import {ProductCardSkeleton} from "./ProductCardSkeleton";
import {NoProductsFound} from "./NoProductsFound";

const ProductList = memo(({ className }) => {
    const {
        fetchProductsList,
        fetchNextProductsList,
        addNewItemToCart,
        productList,
        type,
        minPrice,
        maxPrice,
        sort,
        order,
        search,
        page,
        resetFilter
    } = useStore();
    const { products, isLoading, _init } = productList;
    const triggerRef = useRef(null);

    const onScrollEnd = useCallback(() => {
        fetchNextProductsList()
    }, [fetchNextProductsList]);

    useEffect(() => {
        fetchProductsList(true, false);
    }, [type, minPrice, maxPrice, sort, order, search, page]);

    useInfiniteScroll({
        triggerRef,
        callback: onScrollEnd,
    });

    const onAddToCart = useCallback((product) => {
        addNewItemToCart(product, 1)
    }, [addNewItemToCart]);

    return (
        <div>
            {products.length === 0 ? (
                !isLoading && _init && <NoProductsFound resetFilter={resetFilter}/>
            ) : null}
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
