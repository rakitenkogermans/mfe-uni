import './styles/index.scss'
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import {Link} from "react-router-dom";
import { useStore } from 'store/Store';
import {useCallback, useState} from "react";

const Navbar = ({ className }) => {
    const { cart, changeSearch } = useStore();
    const [search, setSearch] = useState('');

    const { totalQty } = cart;

    const changeSearchHandler = useCallback((e) => {
        setSearch(e.target.value)
    }, []);

    const onClickHandler = () => {
        changeSearch(search);
    }

    return (
        <nav className="bg-gray-800 text-white p-4 drop-shadow-xl rounded-md">
            <div className="container mx-auto flex items-center justify-between">
                <Link to='/' className="flex items-center">
                    <span className="text-xl font-semibold">MFE-ESHOP</span>
                </Link>

                <div className="relative">
                    <input
                        type="text"
                        className="bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Search..."
                        value={search}
                        onChange={changeSearchHandler}
                    />
                    <button onClick={onClickHandler} className="bg-blue-500 py-2 px-4 text-white rounded-r-md focus:outline-none hover:bg-blue-600">
                        Search
                    </button>
                </div>

                <div className="flex items-center space-x-6">
                    <Link to="/login" className="text-lg hover:text-blue-400">
                        Login
                    </Link>
                    <Link to="/cart" className="relative">
                        <FaShoppingCart className="h-6 w-6" />
                        <span className="absolute top-4 left-4 text-xs bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
                            {totalQty}
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
