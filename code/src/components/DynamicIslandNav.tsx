import { useRef, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
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

// Define secondary routes that should act as temporary tabs when visited
const SECONDARY_ITEMS = [
    { id: 'friends', path: '/friends', label: '朋友们', icon: UserGroupIcon },
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

    const targetLeft = useMotionValue(0);
    const targetWidth = useMotionValue(0);
    const targetOpacity = useMotionValue(0);

    // The pill smoothly springs towards the changing target values
    const pillLeft = useSpring(targetLeft, springTransition);
    const pillWidth = useSpring(targetWidth, springTransition);
    const pillOpacity = useSpring(targetOpacity, springTransition);

    const navRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Compute dynamic items: if we are on a secondary page, add it to the visible tabs
    const activeSecondaryItem = SECONDARY_ITEMS.find(item =>
        location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
    );
    const displayItems = activeSecondaryItem ? [...NAV_ITEMS, activeSecondaryItem] : NAV_ITEMS;

    // Helper to calculate and set pill dimensions
    const updatePill = () => {
        const activeIndex = displayItems.findIndex(item =>
            location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))
        );

        if (activeIndex !== -1 && itemRefs.current[activeIndex] && navRef.current) {
            const activeItem = itemRefs.current[activeIndex];
            const container = navRef.current;

            if (activeItem && container) {
                const itemRect = activeItem.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                // Bulletproof: Get exact pixel offset relative to the flex container edge
                targetLeft.set(itemRect.left - containerRect.left);
                targetWidth.set(itemRect.width);
                targetOpacity.set(1);
            }
        } else {
            targetOpacity.set(0);
        }
    };

    // Update pill when path changes
    useEffect(() => {
        updatePill();
    }, [location.pathname]);

    // Update pill continuously as the active item's text animates in/out (changing its width)
    useEffect(() => {
        const observer = new ResizeObserver(() => {
            updatePill();
        });

        // Observe all navigation items for width changes during animations
        itemRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [location.pathname]);

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
                    transition={springTransition}
                    whileHover={{ scale: 1.03 }}
                    className="relative flex items-center bg-white/70 dark:bg-[#1c1c1e]/70 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg shadow-black/5 rounded-full px-2 py-2 overflow-hidden cursor-default"
                    style={{ height: '56px', borderRadius: 9999 }}
                >
                    {/* Primary Navigation Items */}
                    <div className="flex items-center gap-1 relative" ref={navRef}>

                        {/* Shared Active Background - Layout agnostic tracking */}
                        <motion.div
                            className="absolute bg-black/5 dark:bg-white/10 rounded-full h-10 pointer-events-none"
                            style={{
                                left: pillLeft,
                                width: pillWidth,
                                opacity: pillOpacity,
                                top: 0,
                                zIndex: 0
                            }}
                            transition={springTransition}
                        />

                        <AnimatePresence mode="popLayout">
                            {displayItems.map((item, index) => {
                                const isActive = location.pathname === item.path ||
                                    (item.path !== '/' && location.pathname.startsWith(item.path));

                                return (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8, width: 0, marginLeft: 0, marginRight: 0 }}
                                        transition={springTransition}
                                    >
                                        <NavLink
                                            to={item.path}
                                            className="relative z-10 block"
                                        >
                                            <div
                                                ref={(el) => { itemRefs.current[index] = el; }}
                                                className="relative z-10 flex items-center justify-center rounded-full h-10 px-3 cursor-pointer"
                                            >
                                                <item.icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 relative z-10 ${isActive ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`} strokeWidth={2} />

                                                <div className="overflow-hidden flex">
                                                    <AnimatePresence initial={false}>
                                                        {isActive && (
                                                            <motion.span
                                                                initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                                                                animate={{ opacity: 1, width: 'auto', marginLeft: 8 }}
                                                                exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                                                                transition={springTransition}
                                                                className="text-sm font-medium whitespace-nowrap text-black dark:text-white relative z-10"
                                                            >
                                                                {item.label}
                                                            </motion.span>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        </NavLink>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {/* Divider */}
                        <div className="w-[1px] h-6 bg-gray-200 dark:bg-white/10 mx-1" />

                        {/* More Button */}
                        <button
                            onClick={() => setIsMoreOpen(!isMoreOpen)}
                            className={`flex items-center justify-center rounded-full w-10 h-10 transition-colors duration-200 ${isMoreOpen
                                ? 'bg-black/5 dark:bg-white/10 text-black dark:text-white'
                                : 'text-gray-500 hover:bg-black/5 dark:text-gray-400 dark:hover:bg-white/5'
                                }`}
                        >
                            <EllipsisHorizontalIcon className="w-6 h-6" />
                        </button>

                        {/* Theme Toggle integrated */}
                        <div className="ml-1">
                            <ThemeToggle className="w-10 h-10" />
                        </div>
                    </div>
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
                                <span>© 2026 damesck</span>
                                <span>Beta v0.0.15</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
