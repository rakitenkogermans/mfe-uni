import {ProductTypes} from "./ProductTypes";
import { useStore } from 'store/Store';
import {PriceRangeSlider} from "./PriceRangeSlider";
import {SortSelector} from "./SortSelector";
import {useDebounce} from "./hooks/useDebounce";

const ProductFilters = () => {
    const {
        getProductTypes,
        changeProductType,
        type,
        minPrice,
        maxPrice,
        sort,
        order,
        changeSortField,
        changeOrder,
        changeMinPrice,
        changeMaxPrice,
    } = useStore();

    const debouncedChangeMinPrice = useDebounce(changeMinPrice, 1000);
    const debouncedChangeMaxPrice = useDebounce(changeMaxPrice, 1000);

    return (
        <div className="flex flex-col gap-2 w-full bg-white p-4 mb-4 shadow-md rounded-md">
            <h2 className="text-lg font-bold">Filters:</h2>
            <div>
                <SortSelector
                    sort={sort}
                    order={order}
                    changeSortField={changeSortField}
                    changeOrder={changeOrder}
                />
            </div>
            <PriceRangeSlider
                minPrice={minPrice}
                maxPrice={maxPrice}
                changeMinPrice={debouncedChangeMinPrice}
                changeMaxPrice={debouncedChangeMaxPrice}
            />
            <div>
                <ProductTypes types={getProductTypes()} activeType={type} onTypeChange={changeProductType}/>
            </div>
        </div>
    );
};

export { ProductFilters };
