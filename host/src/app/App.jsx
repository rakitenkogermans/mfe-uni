import {ProductsPage} from "product/ProductsPage";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {MainLayout} from "./MainLayout";
import {ProductDetailsPage} from "product/ProductDetailsPage";
import {CartPage} from "cart/CartPage";
import {SuccessPage} from "cart/SuccessPage";
import {LoginPage} from "user/LoginPage";
import {NotFoundPage} from "./NotFoundPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={
            <MainLayout/>
        }>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    )
);

const App = () => {
    return (
        <RouterProvider router={router} />
    );
};

export default App ;
