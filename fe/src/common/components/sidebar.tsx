import {
    ChevronLeft,
    ChevronRight,
    Clock,
    Compass,
    Edit3,
    Home,
    MessageSquare,
    MoreHorizontal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "./ui/button";

import { cn } from "../lib/utils";

const Sidebar = () => {
    const location = useLocation();
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const menuItems = [
        {
            name: "Home",
            icon: <Home size={20} />,
            path: "/",
        },
        {
            name: "Explore",
            icon: <Compass size={20} />,
            path: "/explore",
        },
        {
            name: "Journal",
            icon: <Edit3 size={20} />,
            path: "/journal",
        },
        {
            name: "Messages",
            icon: <MessageSquare size={20} />,
            path: "/messages",
        },
        {
            name: "Bookings",
            icon: <Clock size={20} />,
            path: "/bookings",
        },
        {
            name: "More",
            icon: <MoreHorizontal size={20} />,
            path: "/more",
        },
    ];

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/20 md:hidden"
                    onClick={(e) => e.stopPropagation()}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-16 left-0 z-30 flex h-[calc(100vh-4rem)] flex-col border-r border-gray-200 transition-all duration-300 ease-in-out dark:border-gray-800",
                    isOpen ? "w-64" : "w-20",
                )}
            >
                <Button
                    onClick={toggleSidebar}
                    variant="ghost"
                    className="absolute top-6 -right-3 z-40 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md dark:bg-gray-800"
                    aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                    {isOpen ? (
                        <ChevronLeft size={16} />
                    ) : (
                        <ChevronRight size={16} />
                    )}
                </Button>

                <nav className="flex h-full flex-col px-3 py-8">
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li
                                key={item.name}
                                className={cn(
                                    !isOpen &&
                                        "flex items-center justify-center",
                                )}
                            >
                                <Link
                                    to={item.path}
                                    className={cn(
                                        "group relative flex items-center rounded-md px-3 py-3 transition-colors",
                                        location.pathname === item.path
                                            ? "bg-primary/10 text-primary"
                                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                                    )}
                                >
                                    <span className="flex-shrink-0">
                                        {item.icon}
                                    </span>
                                    {isOpen && (
                                        <span className="ml-3 font-medium">
                                            {item.name}
                                        </span>
                                    )}
                                    {!isOpen && (
                                        <span className="absolute left-full ml-6 rounded bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 group-hover:opacity-100 dark:bg-gray-100 dark:text-gray-900">
                                            {item.name}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-auto">
                        <div
                            className={cn(
                                "flex items-center",
                                isOpen ? "px-3" : "justify-center",
                            )}
                        >
                            <div className="h-12 w-12 overflow-hidden rounded-full">
                                <img
                                    src="/avatar.png"
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            {isOpen && (
                                <div className="ml-3">
                                    <p className="text-sm font-medium">
                                        Your Name
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        View Profile
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
