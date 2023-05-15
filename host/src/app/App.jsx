import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {MainLayout} from "./MainLayout";
import {NotFoundPage} from "./NotFoundPage";

import {lazy, Suspense} from "react";
import {PageLoader} from "./PageLoader";

const ProductsPage = lazy(() => import("product/ProductsPage"));
const ProductDetailsPage = lazy(() => import("product/ProductDetailsPage"));
const CartPage = lazy( () => import("cart/CartPage"));
const SuccessPage = lazy(() => import("cart/SuccessPage"));
const LoginPage = lazy(() => import( "user/LoginPage"));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={
            <MainLayout/>
        }>
            <Route path="/" element={
                <Suspense fallback={<PageLoader/>}>
                    <ProductsPage />
                </Suspense>
            }/>
            <Route path="/login" element={
                <Suspense fallback={<PageLoader/>}>
                    <LoginPage />
                </Suspense>
            }/>
            <Route path="/cart" element={
                <Suspense fallback={<PageLoader/>}>
                    <CartPage />
                </Suspense>
            }/>
            <Route path="/success" element={
                <Suspense fallback={<PageLoader/>}>
                    <SuccessPage />
                </Suspense>
            }/>
            <Route path="/product/:id" element={
                <Suspense fallback={<PageLoader/>}>
                    <ProductDetailsPage />
                </Suspense>
            }/>
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
