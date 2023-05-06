import { type FC } from 'react';
import Navbar from "./Navbar";

const App: FC = () => {
    return (
        <div className="p-4 flex flex-col min-h-screen">
            <Navbar />
        </div>
    );
};

export default App ;
