import { Bell, CalendarPlus2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ThemeSwitcher } from "../theme/theme-switcher";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 border-b border-gray-200 dark:border-gray-800 z-40 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">Mentor Platform</span>
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
          <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
        </Button>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
