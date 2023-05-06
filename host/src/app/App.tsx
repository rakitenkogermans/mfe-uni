import { type FC } from 'react';
import Footer from './Footer';
import Navbar from "header/Navbar";
import ProductList from "product/ProductList";

const App: FC = () => {
    return (
        <div className="p-4 flex flex-col gap-y-12 min-h-screen">
            <Navbar />
            <main className="container self-center flex-grow">
                <ProductList />
            </main>
            <Footer />
        </div>
    );
};

export default App ;
