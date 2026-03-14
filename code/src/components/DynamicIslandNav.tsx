import { useRef, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
    HomeIcon,
    PencilIcon,
    MapPinIcon,
    PhoneIcon,
    EllipsisHorizontalIcon,
    UserGroupIcon,
    InformationCircleIcon
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
    { id: 'about', path: '/about', label: '关于', icon: InformationCircleIcon },
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
    const desktopMenuRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

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
                targetLeft.set(itemRect.left - containerRect.left);
                targetWidth.set(itemRect.width);
                targetOpacity.set(1);
            }
        } else {
            targetOpacity.set(0);
        }
    };

    useEffect(() => {
        updatePill();
    }, [location.pathname]);

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            updatePill();
        });
        itemRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [location.pathname]);

    // Close menu when clicking outside (both desktop and mobile)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const inDesktop = desktopMenuRef.current?.contains(event.target as Node);
            const inMobile = mobileMenuRef.current?.contains(event.target as Node);
            if (!inDesktop && !inMobile) {
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

    // Shared "More" menu items
    const MoreMenuContent = ({ origin }: { origin: 'top' | 'bottom' }) => (
        <>
            <div className="px-3 py-2 text-xs font-semibold text-[#1d1d1f]/40 dark:text-white/40 uppercase tracking-wider">
                更多
            </div>

            <NavLink
                to="/friends"
                className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive
                    ? 'bg-[#007AFF]/10 text-[#007AFF] dark:text-blue-400'
                    : 'text-[#1d1d1f] dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10'
                    }`}
            >
                <UserGroupIcon className="w-5 h-5" />
                <span className="font-medium">朋友们</span>
            </NavLink>

            <NavLink
                to="/about"
                className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive
                    ? 'bg-[#007AFF]/10 text-[#007AFF] dark:text-blue-400'
                    : 'text-[#1d1d1f] dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10'
                    }`}
            >
                <InformationCircleIcon className="w-5 h-5" />
                <span className="font-medium">关于本站</span>
            </NavLink>

            <a
                href="https://github.com/damesck233/damesck"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#1d1d1f] dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10 transition-all"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                </svg>
                <span className="font-medium">GitHub</span>
            </a>

            {/* Theme toggle row - only in mobile more menu */}
            {origin === 'bottom' && (
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#1d1d1f] dark:text-white/80">
                    <ThemeToggle className="w-5 h-5" />
                    <span className="font-medium">切换主题</span>
                </div>
            )}

            <div className="h-[1px] bg-black/5 dark:bg-white/10 my-1 mx-2" />

            <div className="px-3 py-2 flex items-center justify-between text-xs text-[#1d1d1f]/40 dark:text-white/40">
                <span>© 2026 damesck</span>
                <span>Beta v0.0.21</span>
            </div>
        </>
    );

    return (
        <>
            {/* ─── Desktop: Top Pill Nav (md+) ─── */}
            <div className="hidden md:flex fixed top-6 left-0 right-0 z-50 flex-col items-center justify-center pointer-events-none">
                <div className="pointer-events-auto relative" ref={desktopMenuRef}>

                    {/* Main Pill Container */}
                    <motion.div
                        transition={springTransition}
                        whileHover={{ scale: 1.03 }}
                        className="relative flex items-center bg-white/70 dark:bg-[#1c1c1e]/70 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg shadow-black/5 rounded-full px-2 py-2 overflow-hidden cursor-default"
                        style={{ height: '56px', borderRadius: 9999 }}
                    >
                        <div className="flex items-center gap-1 relative" ref={navRef}>

                            {/* Active Background Pill */}
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

                            <AnimatePresence mode="popLayout" initial={false}>
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
                                            <NavLink to={item.path} className="relative z-10 block">
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

                            {/* Theme Toggle */}
                            <div className="ml-1">
                                <ThemeToggle className="w-10 h-10" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Desktop Dropdown - opens downward */}
                    <AnimatePresence>
                        {isMoreOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 8, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -10, scale: 0.95, filter: 'blur(10px)' }}
                                transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
                                className="absolute top-full right-0 mt-2 w-64 p-2 bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col gap-1 origin-top-right"
                            >
                                <MoreMenuContent origin="top" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* ─── Mobile: Bottom Tab Bar (< md) ─── */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50" ref={mobileMenuRef}>

                {/* More Menu - opens upward */}
                <AnimatePresence>
                    {isMoreOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 12, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 12, scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 320, damping: 28 }}
                            className="absolute bottom-full left-3 right-3 mb-2 p-2 bg-white/90 dark:bg-[#1c1c1e]/90 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-2xl shadow-black/10 rounded-2xl flex flex-col gap-0.5 origin-bottom"
                        >
                            <MoreMenuContent origin="bottom" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Tab Bar */}
                <div className="bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-xl border-t border-black/[0.06] dark:border-white/[0.08] px-2 pt-2" style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}>
                    <div className="flex items-center justify-around">
                        {displayItems.map((item) => {
                            const isActive = location.pathname === item.path ||
                                (item.path !== '/' && item.path.startsWith('/') && location.pathname.startsWith(item.path));

                            return (
                                <NavLink
                                    key={item.id}
                                    to={item.path}
                                    className="flex flex-col items-center gap-0.5 px-3 py-1 min-w-[3rem]"
                                >
                                    <motion.div
                                        animate={{ scale: isActive ? 1.1 : 1 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                    >
                                        <item.icon
                                            className={`w-6 h-6 transition-colors duration-150 ${isActive ? 'text-[#007AFF]' : 'text-[#8e8e93] dark:text-[#636366]'}`}
                                            strokeWidth={isActive ? 2.2 : 1.8}
                                        />
                                    </motion.div>
                                    <span className={`text-[10px] font-medium transition-colors duration-150 ${isActive ? 'text-[#007AFF]' : 'text-[#8e8e93] dark:text-[#636366]'}`}>
                                        {item.label}
                                    </span>
                                </NavLink>
                            );
                        })}

                        {/* More Tab */}
                        <button
                            onClick={() => setIsMoreOpen(!isMoreOpen)}
                            className="flex flex-col items-center gap-0.5 px-3 py-1 min-w-[3rem]"
                        >
                            <motion.div
                                animate={{ scale: isMoreOpen ? 1.1 : 1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                                <EllipsisHorizontalIcon
                                    className={`w-6 h-6 transition-colors duration-150 ${isMoreOpen ? 'text-[#007AFF]' : 'text-[#8e8e93] dark:text-[#636366]'}`}
                                    strokeWidth={isMoreOpen ? 2.2 : 1.8}
                                />
                            </motion.div>
                            <span className={`text-[10px] font-medium transition-colors duration-150 ${isMoreOpen ? 'text-[#007AFF]' : 'text-[#8e8e93] dark:text-[#636366]'}`}>
                                更多
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
