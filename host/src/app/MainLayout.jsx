import {Footer} from 'footer/Footer';
import {Navbar} from "header/Navbar";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="p-4 flex flex-col gap-y-12 min-h-screen">
            <Navbar />
            <main className="container self-center flex-grow">
                <Outlet/>
            </main>
            <Footer />
        </div>
    )
}

export { MainLayout }
