import { Outlet } from "react-router-dom";

import MainNavigation from "./MainNavigation";

const Layout = () => {
    return (
        <div>
            <header>
                <MainNavigation />
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
};

export default Layout;
