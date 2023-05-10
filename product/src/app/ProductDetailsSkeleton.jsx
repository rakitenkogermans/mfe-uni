const ProductDetailsSkeleton = () => {
    return (
        <div className="container mx-auto px-4 py-6 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="w-full h-96 bg-gray-200 rounded-md"></div>
                <div>
                    <div className="h-10 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-4/5"></div>
                    <div className="h-12 bg-gray-200 rounded w-1/3 mb-6"></div>
                    <div className="flex items-center">
                        <div className="h-12 bg-gray-200 rounded w-1/4"></div>
                        <div className="ml-6 flex">
                            <div className="h-12 bg-gray-200 rounded w-8"></div>
                            <div className="h-12 bg-gray-200 rounded w-8 ml-8"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { ProductDetailsSkeleton };
