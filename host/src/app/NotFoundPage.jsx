import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 text-center px-4">
            <h1 className="text-6xl text-red-500 font-bold mb-4">404</h1>
            <p className="text-2xl text-gray-700 mb-8">Sorry, the page you're looking for cannot be found!</p>
            <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none">
                Go Home
            </Link>
        </div>
    );
};

export { NotFoundPage };
