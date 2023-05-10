import './styles/index.scss'
import {memo} from "react";

const ProductCard = memo(({ className, product }) => {
    const { name, price, description, types, image, id } = product;
    return (
        <a href={`/product/${id}`} className="block bg-white shadow-md rounded-md p-4 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
            <img src={image} alt={name} className="w-full h-48 object-cover rounded-md mb-4" />
            <div>
                <h3 className="text-xl font-bold text-blue-600">{name}</h3>
                <p className="text-gray-500">${price.toFixed(2)}</p>
                <p className="text-gray-700 mt-2">{description}</p>
                <ul className="mt-2 space-y-1">
                    {types.map((type, index) => (
                        <li key={index} className="inline-flex items-center bg-blue-100 text-blue-600 py-1 px-2 rounded-md text-sm font-semibold mr-2 mb-2">
                            {type}
                        </li>
                    ))}
                </ul>
                <button className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none">
                    Add to Cart
                </button>
            </div>
        </a>
    );
});

export { ProductCard };
