import { Bell, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

import { ThemeSwitcher } from "./theme-switcher";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/common/components/ui/dropdown-menu";
import { useAuthContext } from "../context/auth-context";

const Header = () => {
  const { logout, user } = useAuthContext();
  return (
    <header className="fixed top-0 left-0 w-full h-16 border-b border-gray-200 dark:border-gray-800 z-40 px-4 flex items-center justify-between dark:bg-gray-900 bg-white">
      <div className="flex items-center gap-2 md:gap-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">Mentor Platform</span>
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
          <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
        </Button>
        <ThemeSwitcher />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer h-9 w-9 hover:ring-2 hover:ring-primary/20 transition">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{user&&user.fullName}</p>
              <p className="text-xs text-muted-foreground">{user&&user.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/home/profile" className="flex w-full cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem 
            onClick={logout}
              className="text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:text-red-500 dark:focus:bg-red-950/20">
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
