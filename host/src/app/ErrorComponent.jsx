const ErrorComponent = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-500">Oops!</h1>
                <p className="text-lg text-gray-700 mt-2">Something went wrong. Please try again later.</p>
            </div>
        </div>
    );
};

export {ErrorComponent};
