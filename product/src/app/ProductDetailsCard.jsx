import {useState, memo, useCallback} from "react";

const ProductDetailsCard = memo(({product}) => {
    const {name, price, image, longDescription, types} = product;

    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = useCallback(() => setQuantity(prevState => prevState + 1), []);
    const decrementQuantity = useCallback(() => setQuantity(prevState => prevState > 1 ? prevState - 1 : 1), []);

    const addToCart = () => {
        console.log(`Added ${quantity} ${name} to the cart`);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src={image} alt={name} className="w-full h-auto object-cover" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold mb-4">{name}</h1>
                    <p className="text-xl text-gray-500 mb-4">${price.toFixed(2)}</p>
                    <div className="mb-4">
                        {types.map((type, index) => (
                            <span key={index} className="inline-flex items-center bg-blue-100 text-blue-600 py-1 px-2 rounded-md text-sm font-semibold mr-2 mb-2">
                {type}
              </span>
                        ))}
                    </div>
                    <p className="text-gray-700">{longDescription}</p>
                    <div className="flex items-center mt-6">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none h-12" onClick={addToCart}>
                            Add to Cart
                        </button>
                        <div className="ml-6 flex">
                            <button className="bg-gray-200 text-gray-700 py-2 px-3 rounded-l-md focus:outline-none h-12" onClick={decrementQuantity}>
                                -
                            </button>
                            <span className="bg-gray-100 text-gray-700 py-2 px-4 h-12 flex items-center">{quantity}</span>
                            <button className="bg-gray-200 text-gray-700 py-2 px-3 rounded-r-md focus:outline-none h-12" onClick={incrementQuantity}>
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export {ProductDetailsCard};
