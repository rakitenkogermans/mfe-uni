import { Footer } from './Footer';
import Navbar from "header/Navbar";
import {HomePage} from "./HomePage";
import {createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider} from "react-router-dom";
import {MainLayout} from "./MainLayout";
import {ProductDetailsPage} from "product/ProductDetailsPage";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={
            <MainLayout/>
        }>
            <Route path="/" element={<HomePage />} />
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
