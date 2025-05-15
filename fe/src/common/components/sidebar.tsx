import {
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Users,
  Book,
  CheckSquare,
  BookOpen,
  Mail,
  Compass,
  Clock,
  LineChart,
  Calendar
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "./ui/button";

import { cn } from "../lib/utils";

type SidebarProps = {
onToggle?: (isOpen: boolean) => void;
userRole?: 'admin' | 'mentor' | 'learner';
}

const Sidebar = ({ onToggle, userRole = 'admin' }: SidebarProps) => {
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
    path: "/admin/dashboard"
  },
  {
    name: "Manage Users",
    icon: <Users size={20} />,
    path: "/admin/manage-users"
  },
  {
    name: "Manage Courses",
    icon: <Book size={20} />,
    path: "/admin/manage-courses"
  },
  {
    name: "Mentor Approvals",
    icon: <CheckSquare size={20} />,
    path: "/admin/mentor-approvals"
  },
  {
    name: "Resources",
    icon: <BookOpen size={20} />,
    path: "/admin/resources"
  },
  {
    name: "Messages",
    icon: <Mail size={20} />,
    path: "/admin/messages"
  }
];

const learnerMenuItems = [
  {
    name: "Dashboard",
    icon: <BarChart3 size={20} />,
    path: "/learner/dashboard"
  },
  {
    name: "Find Mentor",
    icon: <Compass size={20} />,
    path: "/learner/find-mentor"
  },
  {
    name: "Session",
    icon: <Calendar size={20} />,
    path: "/learner/session"
  },
  {
    name: "My Progress",
    icon: <LineChart size={20} />,
    path: "/learner/progress"
  },
  {
    name: "Resources",
    icon: <BookOpen size={20} />,
    path: "/learner/resources"
  },
  {
    name: "Messages",
    icon: <Mail size={20} />,
    path: "/learner/messages"
  }
];

const mentorMenuItems = [
  {
    name: "Dashboard",
    icon: <BarChart3 size={20} />,
    path: "/mentor/dashboard"
  },
  {
    name: "Resources",
    icon: <BookOpen size={20} />,
    path: "/mentor/resources"
  },
  {
    name: "Availability",
    icon: <Clock size={20} />,
    path: "/mentor/availability"
  },
  {
    name: "Manage Courses",
    icon: <Book size={20} />,
    path: "/mentor/manage-courses"
  },
  {
    name: "Messages",
    icon: <Mail size={20} />,
    path: "/mentor/messages"
  }
];

const menuItems = 
  userRole === 'admin' ? adminMenuItems :
  userRole === 'mentor' ? mentorMenuItems :
  learnerMenuItems;

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
        "fixed top-16 left-0 h-full bottom-0 border-r border-gray-200 dark:border-gray-800 z-50 transition-all duration-300 ease-in-out flex flex-col",
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
      </nav>
    </aside>
  </>
);
};

export default Sidebar;