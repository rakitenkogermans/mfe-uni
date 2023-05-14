const NoProductsFound = ({ resetFilter }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center bg-gray-100 px-4">
            <h1 className="text-2xl text-gray-700 mb-4">No products found</h1>
            <p className="mb-8">Sorry, we couldn't find any products that match your criteria.</p>
            <button onClick={resetFilter} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none">
                Browse All Products
            </button>
        </div>
    );
};

export { NoProductsFound };
