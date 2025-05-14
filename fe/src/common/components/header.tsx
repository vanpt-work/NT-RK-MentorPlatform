import { Bell, CalendarPlus2 } from "lucide-react";
import { Link } from "react-router-dom";

import { ThemeSwitcher } from "./theme-switcher";
import { Button } from "./ui/button";

const Header = () => {
    return (
        <header className="fixed top-0 left-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
            <div className="flex items-center gap-2 md:gap-4">
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-primary text-xl font-bold">
                        Mentor Platform
                    </span>
                </Link>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <Button variant="outline" size="sm" asChild>
                    <Link to="/book-session">
                        <CalendarPlus2 className="mr-2" />
                        Book session
                    </Link>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    aria-label="Notifications"
                >
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                </Button>
                <ThemeSwitcher />
            </div>
        </header>
    );
};

export default Header;
