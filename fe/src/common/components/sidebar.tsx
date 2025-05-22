import {
    BarChart3,
    Book,
    BookOpen,
    Calendar,
    CheckSquare,
    ChevronLeft,
    ChevronRight,
    Clock,
    Compass,
    LineChart,
    Mail,
    Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "./ui/button";

import { cn } from "../lib/utils";
import { Role } from "../types/auth";

type SidebarProps = {
    onToggle?: (isOpen: boolean) => void;
    userRole?: Role;
};

const Sidebar = ({ onToggle, userRole = Role.Admin }: SidebarProps) => {
    const location = useLocation();
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        if (onToggle) {
            onToggle(newState);
        }
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (onToggle && mounted) {
            onToggle(isOpen);
        }
    }, [mounted, onToggle]);

    if (!mounted) return null;

    const adminMenuItems = [
        {
            name: "Dashboard",
            icon: <BarChart3 size={20} />,
            path: "/admin/dashboard",
        },
        {
            name: "Manage Users",
            icon: <Users size={20} />,
            path: "/admin/manage-users",
        },
        {
            name: "Manage Courses",
            icon: <Book size={20} />,
            path: "/admin/manage-courses",
        },
        {
            name: "Manage Categories",
            icon: <Book size={20} />,
            path: "/admin/manage-course-categories",
        },
        {
            name: "Mentor Approvals",
            icon: <CheckSquare size={20} />,
            path: "/admin/mentor-approvals",
        },
        {
            name: "Resources",
            icon: <BookOpen size={20} />,
            path: "/admin/resources",
        },
        {
            name: "Messages",
            icon: <Mail size={20} />,
            path: "/admin/messages",
        },
    ];

    const learnerMenuItems = [
        {
            name: "Dashboard",
            icon: <BarChart3 size={20} />,
            path: "/learner/dashboard",
        },
        {
            name: "Find Mentor",
            icon: <Compass size={20} />,
            path: "/learner/find-mentor",
        },
        {
            name: "Session",
            icon: <Calendar size={20} />,
            path: "/learner/session",
        },
        {
            name: "My Progress",
            icon: <LineChart size={20} />,
            path: "/learner/progress",
        },
        {
            name: "Resources",
            icon: <BookOpen size={20} />,
            path: "/learner/resources",
        },
        {
            name: "Messages",
            icon: <Mail size={20} />,
            path: "/learner/messages",
        },
    ];

    const mentorMenuItems = [
        {
            name: "Dashboard",
            icon: <BarChart3 size={20} />,
            path: "/mentor/dashboard",
        },
        {
            name: "Resources",
            icon: <BookOpen size={20} />,
            path: "/mentor/resources",
        },
        {
            name: "Availability",
            icon: <Clock size={20} />,
            path: "/mentor/availability",
        },
        {
            name: "Courses",
            icon: <Book size={20} />,
            path: "/mentor/manage-courses",
        },
        {
            name: "Messages",
            icon: <Mail size={20} />,
            path: "/mentor/messages",
        },
    ];

    const menuItems =
        userRole === Role.Admin
            ? adminMenuItems
            : userRole === Role.Mentor
              ? mentorMenuItems
              : learnerMenuItems;

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
                    "fixed top-16 bottom-0 left-0 z-50 flex h-full flex-col border-r border-gray-200 transition-all duration-300 ease-in-out dark:border-gray-800",
                    isOpen ? "w-64" : "w-20",
                )}
            >
                <Button
                    onClick={toggleSidebar}
                    variant="outline"
                    className="border-border bg-background hover:bg-accent absolute top-6 -right-3 z-40 flex h-6 w-6 items-center justify-center rounded-full border p-0 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
                    aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                    {isOpen ? (
                        <ChevronLeft className="text-foreground h-3.5 w-3.5 dark:text-gray-300" />
                    ) : (
                        <ChevronRight className="text-foreground h-3.5 w-3.5 dark:text-gray-300" />
                    )}
                </Button>

                <nav className="flex h-full flex-col px-3 py-8">
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.name}>
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
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
