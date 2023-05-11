import {Link} from "react-router-dom";

const SuccessPage = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center bg-gray-100">
            <h1 className="text-4xl font-bold text-green-500 mb-4">Payment Successful!</h1>
            <p className="text-lg text-gray-700 mb-4">Thank you for your purchase. We hope to see you again soon!</p>
            <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none">
                Continue Shopping
            </Link>
        </div>
    );
};

export { SuccessPage };
