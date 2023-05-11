import {CartPage} from "./CartPage";
import {memo} from "react";
import {createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider, Navigate} from "react-router-dom";
import {SuccessPage} from "./SuccessPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={
            <div className="p-4 flex flex-col">
                <Outlet />
            </div>
        }>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="*" element={<Navigate to="/cart" />} />
        </Route>
    )
);

const App = memo(() => {
    return (
        <RouterProvider router={router} />
    );
});

export default App ;
