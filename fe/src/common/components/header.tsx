import { Bell, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";

import { ThemeSwitcher } from "./theme-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

import { useAuthContext } from "../context/auth-context";

const Header = () => {
    const { logout, user } = useAuthContext();
    return (
        <header className="fixed top-0 left-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center gap-2 md:gap-4">
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-primary text-xl font-bold">
                        Mentor Platform
                    </span>
                </Link>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    className="relative"
                    aria-label="Notifications"
                >
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                </Button>
                <ThemeSwitcher />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="hover:ring-primary/20 h-9 w-9 cursor-pointer transition hover:ring-2">
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="User"
                            />
                            <AvatarFallback>UN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <div className="px-2 py-1.5">
                            <p className="text-sm font-medium">
                                {user && user.fullName}
                            </p>
                            <p className="text-muted-foreground text-xs">
                                {user && user.email}
                            </p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link
                                to="/home/profile"
                                className="flex w-full cursor-pointer"
                            >
                                <User className="mr-2 h-4 w-4" />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={logout}
                            className="text-red-500 focus:bg-red-50 focus:text-red-500 dark:focus:bg-red-950/20 dark:focus:text-red-500"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Header;
