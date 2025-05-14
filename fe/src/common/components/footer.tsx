import { Link } from "react-router-dom";
import { Youtube, Linkedin, Twitter, Instagram, Facebook, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex flex-col mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <span className="text-lg font-medium">Mentor Platform</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md">
              To inspire powerful conversations and collaborations among members
              worldwide so together we can change the world with creativity.
            </p>
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-2 transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="#" className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-2 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-2 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-2 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-2 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-2 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M9 12A6 6 0 1 0 9 0a6 6 0 1 0 0 12z"></path>
                <path d="M15 8a6 6 0 1 0 0 12 6 6 0 1 0 0-12z"></path>
                <path d="M15 5a6 6 0 1 0 0-10 6 6 0 1 0 0 10z"></path>
                <line x1="8" y1="6" x2="16" y2="18"></line>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <nav className="mb-4 md:mb-0">
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              <li>
                <Link to="/find-mentors" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition">
                  find mentors
                </Link>
              </li>
              <li>
                <Link to="/become-mentor" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition">
                  become a mentor
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition">
                  community
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition">
                  blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition">
                  about us
                </Link>
              </li>
              <li>
                <Link to="/join" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition">
                  join adplist
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition">
                  help center
                </Link>
              </li>
              <li>
                <Link to="/partnerships" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition">
                  partnerships
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Copyright 2025 - Mentor Platform
            </span>
            
            <div className="flex gap-4 text-sm">
              <Link to="/contact" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition">
                Contact us
              </Link>
              <Link to="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition">
                Terms of use
              </Link>
              <Link to="/sitemap" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
