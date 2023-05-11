import {Link} from "react-router-dom";

const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-700 mb-4">Your Cart is Empty</h1>
            <p className="text-lg text-gray-500 mb-4">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none">
                Shop Now
            </Link>
        </div>
    );
};

export { EmptyCart };
