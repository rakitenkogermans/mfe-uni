import {HomePage} from "./HomePage";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {MainLayout} from "./MainLayout";
import {ProductDetailsPage} from "product/ProductDetailsPage";
import {CartPage} from "cart/CartPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={
            <MainLayout/>
        }>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Route>
    )
);

const App = () => {
    return (
        <RouterProvider router={router} />
    );
};

export default App ;
