import {CartItem} from "./CartItem";

const CartItems = ({ cartItems, onChangeQty, onRemoveItem }) => {

    return (
        <>
            {cartItems.map((item, index) => (
                    <CartItem key={index} product={item} onChangeQty={onChangeQty} onRemoveItem={onRemoveItem} />
                )
            )
            }
        </>
    );
};

export { CartItems }
