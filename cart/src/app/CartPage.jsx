import {CartItems} from "./CartItems";
import {CartSummary} from "./CartSummary";
import { useStore } from 'store/Store';
import {EmptyCart} from "./EmptyCart";
import "./styles/index.scss";
import {useCallback} from "react";

const CartPage = () => {
    const { cart, removeItemFromCart, changeItemQtyInCart, resetCart } = useStore();
    const { cartItems, totalQty } = cart;

    const onChangeQty = useCallback((product, qty) => {
        changeItemQtyInCart(product, qty);
    }, [changeItemQtyInCart]);

    const onRemoveItem = useCallback((id) => {
        removeItemFromCart(id);
    }, [removeItemFromCart]);

    const onResetCart = useCallback(() => {
        resetCart();
    }, [resetCart]);

    return (
        <div>
            {cartItems.length === 0 ? (
                <EmptyCart/>
            ) : (
                <>
                    <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
                    <CartItems cartItems={cartItems} onChangeQty={onChangeQty} onRemoveItem={onRemoveItem} />
                    <CartSummary cartItems={cartItems} onResetCart={onResetCart} />
                </>
            )}
        </div>
    );
};

export { CartPage }
