import ProductList from "./ProductList";
import {memo} from "react";

const App = memo(() => {
    return (
        <div className="p-4 flex flex-col">
            <ProductList />
        </div>
    );
});

export default App ;
