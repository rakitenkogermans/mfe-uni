import React from 'react';

const ProductCardSkeleton = () => {
    return (
        <div className="bg-white shadow-md rounded-md p-4 animate-pulse">
            <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
            <div>
                <div className="h-6 bg-gray-200 rounded mb-2 w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-4/5"></div>
                <div className="mt-2 space-y-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-1/3 mt-4"></div>
            </div>
        </div>
    );
};

export { ProductCardSkeleton };
