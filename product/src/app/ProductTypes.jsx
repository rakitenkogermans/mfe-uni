const ProductTypes = ({ types, activeType, onTypeChange }) => {

    return (
        <>
            {types.map((type, index) => (
                <li
                    key={index}
                    onClick={() => onTypeChange(type)}
                    className={`inline-flex items-center py-2 px-4 rounded-md text-lg font-semibold mr-2 mb-2 cursor-pointer ${activeType === type ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}`}
                >
                    {type}
                </li>
            ))}
        </>
    );
};

export { ProductTypes };
