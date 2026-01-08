import { motion } from 'framer-motion';
import {
    SparklesIcon,
    ArrowRightIcon,
    GiftIcon,
    AcademicCapIcon,
    RocketLaunchIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

// Define Timeline Event Interface
export interface TimelineEvent {
    date: string;
    title: string;
    description: string;
    icon: string;
    color: string;
}

interface ActivityCardProps {
    timelineEvents: TimelineEvent[];
    onClick: () => void;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    custom: number;
    layoutId?: string;
    hidden?: boolean;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
    timelineEvents,
    onClick,
    onMouseEnter,
    onMouseLeave,
    layoutId,
    hidden = false
}) => {

    const [timeStats, setTimeStats] = useState({
        dayOfYear: 0,
        yearProgress: 0,
        dayProgress: 0,
        year: 2026
    });

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            const startOfYear = new Date(now.getFullYear(), 0, 1);
            const startOfNextYear = new Date(now.getFullYear() + 1, 0, 1);

            // Day of Year
            const diff = now.getTime() - startOfYear.getTime();
            const oneDay = 1000 * 60 * 60 * 24;
            const dayOfYear = Math.floor(diff / oneDay) + 1;

            // Year Progress
            const yearDuration = startOfNextYear.getTime() - startOfYear.getTime();
            const yearElapsed = now.getTime() - startOfYear.getTime();
            const yearProgress = (yearElapsed / yearDuration) * 100;

            // Day Progress
            const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const dayElapsed = now.getTime() - startOfDay.getTime();
            const dayProgress = (dayElapsed / oneDay) * 100;

            setTimeStats({
                dayOfYear,
                yearProgress,
                dayProgress,
                year: now.getFullYear()
            });
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000); // Live update
        return () => clearInterval(timer);
    }, []);

    // Get the most recent events (top 3)
    const recentEvents = timelineEvents ? timelineEvents.slice(0, 3) : [];

    // Helper to get icon component
    const getIcon = (iconName: string) => {
        if (iconName.startsWith('http')) {
            return <img src={iconName} alt="icon" className="w-full h-full object-cover rounded-full" />;
        }
        switch (iconName) {
            case 'sparkles': return <SparklesIcon className="w-4 h-4 text-white" />;
            case 'gift': return <GiftIcon className="w-4 h-4 text-white" />;
            case 'academic': return <AcademicCapIcon className="w-4 h-4 text-white" />;
            case 'rocket': return <RocketLaunchIcon className="w-4 h-4 text-white" />;
            default: return <SparklesIcon className="w-4 h-4 text-white" />;
        }
    };

    const getIconBg = (color: string) => {
        switch (color) {
            case 'blue': return 'bg-blue-500 shadow-blue-500/30';
            case 'red': return 'bg-red-500 shadow-red-500/30';
            case 'purple': return 'bg-purple-500 shadow-purple-500/30';
            case 'green': return 'bg-green-500 shadow-green-500/30';
            default: return 'bg-gray-500 shadow-gray-500/30';
        }
    };

    return (
        <motion.div
            layoutId={layoutId}
            className={`md:col-span-2 cursor-pointer group relative z-10 overflow-hidden rounded-[32px] duration-200 aspect-auto md:h-full bg-white/40 dark:bg-[#1c1c1e]/60 backdrop-blur-xl transition-colors duration-300 ${hidden ? 'pointer-events-none' : ''}`}
            animate={{ opacity: hidden ? 0 : 1 }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 250, damping: 25, mass: 1.0 }}
        >

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#E0E7FF]/80 to-[#DBEAFE]/80 dark:from-[#1e1b4b]/40 dark:to-[#172554]/40 z-0 opacity-80"></div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full p-5 flex flex-col md:flex-row gap-5">

                {/* Left Column: Timeline & Header (65%) */}
                <div className="flex-[1.8] flex flex-col relative min-h-0">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 flex-shrink-0">
                        <div className="flex items-center">
                            <motion.div
                                layoutId={`${layoutId}-icon-box`}
                                className="w-10 h-10 rounded-xl bg-white/50 dark:bg-white/10 flex items-center justify-center shadow-sm backdrop-blur-md"
                            >
                                <SparklesIcon className="w-6 h-6 text-[#007aff] dark:text-blue-400" />
                            </motion.div>
                            <div className="ml-3">
                                <motion.h3
                                    layoutId={`${layoutId}-title`}
                                    className="text-[20px] font-bold text-[#1d1d1f] dark:text-white leading-none"
                                >
                                    最近发生的事
                                </motion.h3>
                                <motion.p
                                    layoutId={`${layoutId}-subtitle`}
                                    className="text-[13px] text-[#1d1d1f]/60 dark:text-white/60 font-medium mt-1"
                                >
                                    Timeline & Updates
                                </motion.p>
                            </div>
                        </div>
                    </div>

                    {/* Mini Timeline */}
                    <div className="flex-1 relative pl-3 overflow-hidden">
                        {/* Vertical Line */}
                        <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-white/30 dark:bg-white/10 rounded-full"></div>

                        <div className="space-y-5">
                            {recentEvents.map((event, idx) => {
                                const isImage = event.icon.startsWith('http');
                                return (
                                    <div key={idx} className="relative pl-10 group/item">
                                        {/* Node */}
                                        <div className={`absolute left-[10px] top-1 w-5 h-5 rounded-full ${isImage ? 'bg-transparent overflow-hidden' : getIconBg(event.color)} flex items-center justify-center ${isImage ? '' : 'border-2 border-white dark:border-[#2c2c2e]'} shadow-md z-10 transition-transform duration-300 group-hover/item:scale-110`}>
                                            {/* Tiny icon inside node */}
                                            <div className={isImage ? "w-full h-full" : "scale-[0.6]"}>{getIcon(event.icon)}</div>
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-semibold text-[#007aff] dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-full w-fit mb-1 border border-blue-100 dark:border-blue-500/20">
                                                {event.date}
                                            </span>
                                            <h4 className="text-sm font-bold text-[#1d1d1f] dark:text-white leading-tight mb-0.5 line-clamp-1">
                                                {event.title}
                                            </h4>
                                            <p className="text-[11px] text-[#1d1d1f]/60 dark:text-white/60 line-clamp-1">
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* More Indicator */}
                        <div className="absolute bottom-0 left-[14px] w-3 h-3 rounded-full bg-white/30 dark:bg-white/10 flex items-center justify-center">
                            <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Vertical Divider (Hidden on Mobile) */}
                <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-white/20 to-transparent flex-shrink-0"></div>

                {/* Right Column: Time Status (35%) */}
                <div className="flex-1 flex flex-col justify-between bg-white/30 dark:bg-black/20 rounded-2xl p-4 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-inner min-h-0">

                    <div>
                        <div className="text-[10px] font-bold text-[#1d1d1f]/40 dark:text-white/40 uppercase tracking-wider mb-2">
                            Time Travel
                        </div>
                        <div className="text-sm font-medium text-[#1d1d1f] dark:text-white mb-4">
                            今天是 <span className="text-[#007aff] dark:text-blue-400 font-bold">{timeStats.year}</span> 年的第 <span className="text-[#007aff] dark:text-blue-400 font-bold">{timeStats.dayOfYear}</span> 天
                        </div>

                        {/* Year Progress */}
                        <div className="mb-3">
                            <div className="flex justify-between text-[10px] mb-1 font-medium">
                                <span className="text-[#1d1d1f]/60 dark:text-white/60">今年已过</span>
                                <span className="text-[#1d1d1f] dark:text-white">{timeStats.yearProgress.toFixed(4)}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${timeStats.yearProgress}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                            </div>
                        </div>

                        {/* Day Progress */}
                        <div>
                            <div className="flex justify-between text-[10px] mb-1 font-medium">
                                <span className="text-[#1d1d1f]/60 dark:text-white/60">今天已过</span>
                                <span className="text-[#1d1d1f] dark:text-white">{timeStats.dayProgress.toFixed(4)}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-orange-400 to-pink-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${timeStats.dayProgress}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Quote */}
                    <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex-shrink-0">
                        <p className="text-[12px] italic text-[#1d1d1f]/70 dark:text-white/70 text-center font-serif">
                            "活在当下，珍惜眼下"
                        </p>
                    </div>

                </div>

            </div>
        </motion.div>
    );
};

export default ActivityCard;
