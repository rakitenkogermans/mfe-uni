import { useCallback, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import {Link} from "react-router-dom";

const CartItem = ({ product, onChangeQty, onRemoveItem }) => {
    const { name, price, image, qty, id } = product;

    const incrementQuantity = useCallback(() => onChangeQty(product, qty + 1), [onChangeQty, product, qty]);
    const decrementQuantity = useCallback(() => onChangeQty(product, qty > 1 ? qty - 1 : 1), [onChangeQty, product, qty]);

    const handleDelete = useCallback(() => {
        onRemoveItem(id)
    }, [onRemoveItem, id]);

    const totalPrice = price * qty;

    return (
        <div className="grid grid-cols-[1fr_3fr_1fr_1fr_2fr] gap-4 p-4 bg-white shadow rounded-lg my-4">
            <div>
                <img src={image} alt={name} className="h-16 object-cover rounded-md" />
            </div>
            <Link to={`/product/${id}`}>
                <h2 className="text-lg font-semibold">{name}</h2>
                <p>${price.toFixed(2)}</p>
            </Link>
            <div className="flex items-center justify-center">
                <button className="bg-gray-200 text-gray-700 py-2 px-3 rounded-l-md focus:outline-none" onClick={decrementQuantity}>
                    -
                </button>
                <span className="bg-gray-100 text-gray-700 py-2 px-4">{qty}</span>
                <button className="bg-gray-200 text-gray-700 py-2 px-3 rounded-r-md focus:outline-none" onClick={incrementQuantity}>
                    +
                </button>
            </div>
            <div className="flex items-center justify-center">
                <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200 focus:outline-none" onClick={handleDelete}>
                    <AiFillDelete />
                </button>
            </div>
            <div className="text-center">
                <p className="text-lg font-semibold">Total</p>
                <p>${totalPrice.toFixed(2)}</p>
            </div>
        </div>
    );
};

export { CartItem }
