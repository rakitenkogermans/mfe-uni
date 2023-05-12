import {memo} from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Outlet,
    RouterProvider
} from "react-router-dom";
import {ProductDetailsPage} from "./ProductDetailsPage";
import {ProductsPage} from "./ProductsPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={
            <div className="p-4 flex flex-col">
                <Outlet />
            </div>
        }>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Route>
    )
);

const App = memo(() => {
    return (
        <RouterProvider router={router} />
    );
});

export default App ;
