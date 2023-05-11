import {useCallback} from "react";

const CartSummary = ({ cartItems, onResetCart }) => {
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.qty), 0);

    const handleBuy = useCallback(() => {
        console.log(`Bought items worth $${totalPrice.toFixed(2)}`);
    }, [totalPrice]);

    const handleDeleteAll = useCallback(() => {
        onResetCart();
    }, [onResetCart]);

    return (
        <div className="bg-white shadow rounded-lg p-6 my-4">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Cart Summary</h2>
            <div className="flex justify-between items-center mb-4">
                <p className="text-lg text-gray-700">Total: </p>
                <p className="text-lg text-green-500 font-bold">${totalPrice.toFixed(2)}</p>
            </div>
            <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200 focus:outline-none mb-2" onClick={handleBuy}>
                Buy Now
            </button>
            <button className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200 focus:outline-none" onClick={handleDeleteAll}>
                Delete All
            </button>
        </div>
    );
};

export { CartSummary }
