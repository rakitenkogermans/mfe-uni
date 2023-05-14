import {useEffect, useState} from 'react';

const PriceRangeSlider = ({min, max, changeMinPrice, changeMaxPrice}) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(3000);

    useEffect(() => {
        return () => {
            changeMinPrice(0);
            changeMaxPrice(3000);
        }
    }, []);

    // useEffect(() => {
    //     if (min !== minPrice) {
    //         setMinPrice(min);
    //     }
    //     if (max !== maxPrice) {
    //         setMaxPrice(max);
    //     }
    // }, [min, max]);

    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value);
        changeMinPrice(e.target.value);
    }

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value);
        changeMaxPrice(e.target.value);
    }

    return (
        <div className="w-full bg-gray-100 p-4 rounded-md">
            <h2 className="text-lg font-bold mb-2">Price Range:</h2>
            <div className="flex items-center justify-between">
                <span>$0</span>
                <input
                    type="range"
                    min="0"
                    max="3000"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    className="w-full mx-2"
                />
                <span>$3000</span>
            </div>
            <div className="text-center mt-2">Min Price: ${minPrice}</div>
            <div className="flex items-center justify-between mt-4">
                <span>$0</span>
                <input
                    type="range"
                    min="0"
                    max="3000"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    className="w-full mx-2"
                />
                <span>$3000</span>
            </div>
            <div className="text-center mt-2">Max Price: ${maxPrice}</div>
        </div>
    );
};

export { PriceRangeSlider };
