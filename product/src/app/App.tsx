import { type FC } from 'react';
import Navbar from "./ProductCard";
import ProductList from "./ProductList";

const App: FC = () => {
    return (
        <div className="p-4 flex flex-col min-h-screen">
            <ProductList />
        </div>
    );
};

export default App ;
