import {
    Facebook,
    Instagram,
    Linkedin,
    MessageCircle,
    Twitter,
    Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="w-full border-t border-gray-200 py-8 dark:border-gray-800">
            <div className="container mx-auto px-4">
                <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
                    <div className="mb-6 flex flex-col md:mb-0">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                                <MessageCircle className="text-primary h-6 w-6" />
                            </div>
                            <span className="text-lg font-medium">
                                Mentor Platform
                            </span>
                        </div>
                        <p className="max-w-md text-sm text-gray-600 dark:text-gray-400">
                            To inspire powerful conversations and collaborations
                            among members worldwide so together we can change
                            the world with creativity.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <Youtube className="h-5 w-5" />
                        </a>
                        <a
                            href="#"
                            className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <Linkedin className="h-5 w-5" />
                        </a>
                        <a
                            href="#"
                            className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a
                            href="#"
                            className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a
                            href="#"
                            className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <Facebook className="h-5 w-5" />
                        </a>
                        <a
                            href="#"
                            className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                            >
                                <path d="M9 12A6 6 0 1 0 9 0a6 6 0 1 0 0 12z"></path>
                                <path d="M15 8a6 6 0 1 0 0 12 6 6 0 1 0 0-12z"></path>
                                <path d="M15 5a6 6 0 1 0 0-10 6 6 0 1 0 0 10z"></path>
                                <line x1="8" y1="6" x2="16" y2="18"></line>
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between md:flex-row">
                    <nav className="mb-4 md:mb-0">
                        <ul className="flex flex-wrap gap-x-8 gap-y-2">
                            <li>
                                <Link
                                    to="/find-mentors"
                                    className="hover:text-primary dark:hover:text-primary text-gray-700 transition dark:text-gray-300"
                                >
                                    find mentors
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/become-mentor"
                                    className="hover:text-primary dark:hover:text-primary text-gray-700 transition dark:text-gray-300"
                                >
                                    become a mentor
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/community"
                                    className="hover:text-primary dark:hover:text-primary text-gray-700 transition dark:text-gray-300"
                                >
                                    community
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/blog"
                                    className="hover:text-primary dark:hover:text-primary text-gray-700 transition dark:text-gray-300"
                                >
                                    blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="hover:text-primary dark:hover:text-primary text-gray-700 transition dark:text-gray-300"
                                >
                                    about us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/join"
                                    className="hover:text-primary dark:hover:text-primary text-gray-700 transition dark:text-gray-300"
                                >
                                    join adplist
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/faqs"
                                    className="hover:text-primary dark:hover:text-primary text-gray-700 transition dark:text-gray-300"
                                >
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/help"
                                    className="hover:text-primary dark:hover:text-primary text-gray-700 transition dark:text-gray-300"
                                >
                                    help center
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/partnerships"
                                    className="hover:text-primary dark:hover:text-primary text-gray-700 transition dark:text-gray-300"
                                >
                                    partnerships
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex flex-col items-center gap-4 md:flex-row">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Copyright 2025 - Mentor Platform
                        </span>

                        <div className="flex gap-4 text-sm">
                            <Link
                                to="/contact"
                                className="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            >
                                Contact us
                            </Link>
                            <Link
                                to="/privacy"
                                className="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms"
                                className="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            >
                                Terms of use
                            </Link>
                            <Link
                                to="/sitemap"
                                className="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            >
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
