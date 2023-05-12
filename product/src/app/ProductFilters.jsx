import {ProductTypes} from "./ProductTypes";
import { useStore } from 'store/Store';

const ProductFilters = () => {
    const { getProductTypes, productList, changeProductType, type } = useStore();

    return (
        <div className="flex flex-col gap-2 w-full bg-white p-4 mb-4 rounded-md">
            <h2 className="text-lg font-bold">Filters:</h2>
            <div>
                <select className="p-2 rounded-md bg-white">
                    <option value="">All</option>
                    <option value="type1">Type 1</option>
                    <option value="type2">Type 2</option>
                </select>
            </div>
            <div>
                <ProductTypes types={getProductTypes()} activeType={type} onTypeChange={changeProductType}/>
            </div>
        </div>
    );
};

export { ProductFilters };
