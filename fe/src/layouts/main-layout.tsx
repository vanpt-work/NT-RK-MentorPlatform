import { Outlet } from "react-router-dom";

import Header from "@/common/components/header";
import Sidebar from "@/common/components/sidebar";

const MainLayout = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <Sidebar />
            <main className="pt-16 pl-20 transition-all duration-300 ease-in-out md:pl-64">
                <div className="container mx-auto p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
