import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { 
  Home, 
  Compass, 
  Edit3, 
  MessageSquare, 
  Clock, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "../ui/button";

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
      path: "/"
    },
    {
      name: "Explore",
      icon: <Compass size={20} />,
      path: "/explore"
    },
    {
      name: "Journal",
      icon: <Edit3 size={20} />,
      path: "/journal"
    },
    {
      name: "Messages",
      icon: <MessageSquare size={20} />,
      path: "/messages"
    },
    {
      name: "Bookings",
      icon: <Clock size={20} />,
      path: "/bookings"
    },
    {
      name: "More",
      icon: <MoreHorizontal size={20} />,
      path: "/more"
    }
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden" 
          onClick={(e) => e.stopPropagation()}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-16 left-0 h-[calc(100vh-4rem)] border-r border-gray-200 dark:border-gray-800 z-30 transition-all duration-300 ease-in-out flex flex-col",
          isOpen ? "w-64" : "w-20"
        )}
      >
        <Button
          onClick={toggleSidebar}
          variant="ghost"
          className="absolute -right-3 top-6 w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md z-40"
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </Button>

        <nav className="h-full px-3 py-8 flex flex-col">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-3 rounded-md transition-colors relative group",
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  )}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {isOpen && (
                    <span className="ml-3 font-medium">{item.name}</span>
                  )}
                  {!isOpen && (
                    <span className="absolute left-full ml-6 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <div className={cn(
              "flex items-center",
              isOpen ? "px-3" : "justify-center"
            )}>
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src="/avatar.png" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              {isOpen && (
                <div className="ml-3">
                  <p className="text-sm font-medium">Your Name</p>
                  <p className="text-xs text-gray-500">View Profile</p>
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
