import { useState } from 'react';

const SortSelector = ({ sort, order, changeSortField, changeOrder, }) => {
    // const [sortField, setSortField] = useState('id');
    // const [sortOrder, setSortOrder] = useState('asc');

    const handleFieldChange = (e) => {
        changeSortField(e.target.value);
        // handleSortChange({field: e.target.value, order: sortOrder});
    };

    const handleOrderChange = (e) => {
        changeOrder(e.target.value);
        // handleSortChange({field: sortField, order: e.target.value});
    };

    return (
        <div className="flex gap-12 items-center bg-gray-100 p-4 rounded-md">
            <div>
                <label className="font-bold mr-2" htmlFor="sortField">Sort By:</label>
                <select
                    id="sortField"
                    value={sort}
                    onChange={handleFieldChange}
                    className="p-2 rounded-md bg-white"
                >
                    <option value="id">Created</option>
                    <option value="price">Price</option>
                    <option value="name">Name</option>
                </select>
            </div>
            <div>
                <label className="font-bold mr-2" htmlFor="sortOrder">Order:</label>
                <select
                    id="sortOrder"
                    value={order}
                    onChange={handleOrderChange}
                    className="p-2 rounded-md bg-white"
                >
                    <option value="asc">ASC</option>
                    <option value="desc">DESC</option>
                </select>
            </div>
        </div>
    );
};

export { SortSelector };
