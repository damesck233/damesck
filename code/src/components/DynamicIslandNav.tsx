import { useRef, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import {
    HomeIcon,
    PencilIcon,
    MapPinIcon,
    PhoneIcon,
    EllipsisHorizontalIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';
import ThemeToggle from './ThemeToggle';

// Define navigation items
const NAV_ITEMS = [
    { id: 'home', path: '/', label: '首页', icon: HomeIcon },
    { id: 'blog', path: 'https://blog.damesck.net', label: '博客', icon: PencilIcon },
    { id: 'travels', path: '/travels', label: '足迹', icon: MapPinIcon },
    { id: 'contact', path: '/contact', label: '联系', icon: PhoneIcon },
];

// Spring animation configuration for that "bouncy" Apple feel
const springTransition = {
    type: "spring",
    stiffness: 280,
    damping: 25,
    mass: 1.2
};

export default function DynamicIslandNav() {
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const location = useLocation();
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMoreOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsMoreOpen(false);
    }, [location.pathname]);

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center justify-center pointer-events-none">
            <div className="pointer-events-auto relative" ref={menuRef}>

                {/* Main Pill Container */}
                <motion.div
                    layout
                    transition={springTransition}
                    className="relative flex items-center bg-white/70 dark:bg-[#1c1c1e]/70 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg shadow-black/5 rounded-full px-2 py-2 overflow-hidden"
                    style={{ height: '56px' }}
                >
                    <LayoutGroup>
                        {/* Primary Navigation Items */}
                        <div className="flex items-center gap-1">
                            {NAV_ITEMS.map((item) => {
                                const isActive = location.pathname === item.path ||
                                    (item.path !== '/' && location.pathname.startsWith(item.path));

                                return (
                                    <NavLink
                                        key={item.id}
                                        to={item.path}
                                        className="relative z-10"
                                    >
                                        <motion.div
                                            layout
                                            className="relative z-10 flex items-center justify-center rounded-full h-10 px-3 cursor-pointer"
                                        >
                                            {/* Shared Active Background - The "Sliding Pill" */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="active-pill"
                                                    className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-full"
                                                    transition={springTransition}
                                                    style={{ zIndex: -1 }}
                                                />
                                            )}

                                            <item.icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 ${isActive ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`} strokeWidth={2} />

                                            <div className="overflow-hidden flex">
                                                <AnimatePresence mode="popLayout" initial={false}>
                                                    {isActive && (
                                                        <motion.span
                                                            initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                                                            animate={{ opacity: 1, width: 'auto', marginLeft: 8 }}
                                                            exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                                                            transition={springTransition}
                                                            className="text-sm font-medium whitespace-nowrap text-black dark:text-white"
                                                        >
                                                            {item.label}
                                                        </motion.span>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    </NavLink>
                                );
                            })}

                            {/* Divider */}
                            <div className="w-[1px] h-6 bg-gray-200 dark:bg-white/10 mx-1" />

                            {/* More Button */}
                            <motion.button
                                layout
                                onClick={() => setIsMoreOpen(!isMoreOpen)}
                                className={`flex items-center justify-center rounded-full w-10 h-10 transition-colors duration-200 ${isMoreOpen
                                    ? 'bg-black/5 dark:bg-white/10 text-black dark:text-white'
                                    : 'text-gray-500 hover:bg-black/5 dark:text-gray-400 dark:hover:bg-white/5'
                                    }`}
                            >
                                <EllipsisHorizontalIcon className="w-6 h-6" />
                            </motion.button>

                            {/* Theme Toggle integrated */}
                            <div className="ml-1">
                                <ThemeToggle className="w-10 h-10" />
                            </div>
                        </div>
                    </LayoutGroup>
                </motion.div>

                {/* Expanded Menu Dropdown - Glassmorphic */}
                <AnimatePresence>
                    {isMoreOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 8, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -10, scale: 0.95, filter: 'blur(10px)' }}
                            transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
                            className="absolute top-full right-0 mt-2 w-64 p-2 bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col gap-1 origin-top-right"
                        >
                            <div className="px-3 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                More
                            </div>

                            <NavLink
                                to="/friends"
                                className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive
                                    ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10'
                                    }`}
                            >
                                <UserGroupIcon className="w-5 h-5" />
                                <span className="font-medium">朋友们</span>
                            </NavLink>

                            <a
                                href="https://github.com/damesck233/damesck"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-all"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                                </svg>
                                <span className="font-medium">GitHub</span>
                            </a>

                            <div className="h-[1px] bg-gray-200 dark:bg-white/10 my-1 mx-2" />

                            <div className="px-3 py-2 flex items-center justify-between text-xs text-gray-400">
                                <span>© 2025 damesck</span>
                                <span>v1.0.0</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
