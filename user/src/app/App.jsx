import {memo} from "react";
import {createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider, Navigate} from "react-router-dom";
import LoginPage from "./LoginPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={
            <div className="p-4 flex flex-col">
                <Outlet />
            </div>
        }>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Route>
    )
);

const App = memo(() => {
    return (
        <RouterProvider router={router} />
    );
});

export default App ;
