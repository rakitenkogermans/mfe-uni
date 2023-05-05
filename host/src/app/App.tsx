import { type FC } from 'react';
import { classNames } from 'shared/lib/classNames';
import Footer from 'host/Footer';
import { Navbar } from "header/Navbar";

const App: FC = () => {
    return (
        <div className="p-4 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <div>Main content would be here</div>
            </main>
            <Footer />
        </div>
    );
};

export default App ;
