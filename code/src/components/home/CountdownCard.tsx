import { motion } from 'framer-motion';
import { ClockIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export interface CountdownEvent {
    title: string;
    Startdate: string;
    targetDate: string;
    totalDays: number; // Seems to be "duration" or manual override? I'll re-calc for precision if needed.
    top: boolean;
}

interface CountdownCardProps {
    events: CountdownEvent[];
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    layoutId?: string;
    hidden?: boolean;
}

const CountdownCard: React.FC<CountdownCardProps> = ({
    events,
    onClick,
    onMouseEnter,
    onMouseLeave,
    layoutId,
    hidden = false
}) => {
    // Find top event or nearest event
    const topEvent = events.find(e => e.top) || events[0];

    // Calculate days left
    const calculateDaysLeft = (target: string) => {
        const today = new Date();
        const tgt = new Date(target);
        today.setHours(0, 0, 0, 0);
        tgt.setHours(0, 0, 0, 0);
        const diff = tgt.getTime() - today.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    const days = calculateDaysLeft(topEvent.targetDate);
    const isPast = days < 0;

    return (
        <motion.div
            layoutId={layoutId}
            className={`md:col-span-1 cursor-pointer group relative z-10 overflow-hidden rounded-[32px] duration-200 aspect-square md:h-full bg-white/40 dark:bg-[#1c1c1e]/60 backdrop-blur-xl transition-colors duration-300 ${hidden ? 'pointer-events-none' : ''}`}
            animate={{ opacity: hidden ? 0 : 1 }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 250, damping: 25, mass: 1.0 }}
        >
            {/* Gradient Overlay (Teal/Blue to match "Time" vibe) */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-blue-50/50 dark:from-teal-900/20 dark:to-blue-900/20 z-0 opacity-80"></div>

            {/* Content */}
            <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <motion.div
                        layoutId={`${layoutId}-icon-box`}
                        className="w-10 h-10 rounded-full bg-teal-500/10 dark:bg-teal-400/10 flex items-center justify-center backdrop-blur-md"
                    >
                        <motion.div layoutId={`${layoutId}-icon`}>
                            <ClockIcon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                        </motion.div>
                    </motion.div>

                    <div className="px-2 py-1 rounded-full bg-white/40 dark:bg-white/10 border border-white/20 text-[10px] font-medium text-gray-500 dark:text-gray-400 backdrop-blur-sm">
                        {events.length} Events
                    </div>
                </div>

                {/* Main Number */}
                <div className="flex flex-col items-center justify-center flex-1 my-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Distance to {topEvent.title}
                    </span>
                    <div className="text-6xl font-bold text-[#1d1d1f] dark:text-white tracking-tighter flex items-end leading-none">
                        {Math.abs(days)}
                        <span className="text-lg font-medium text-gray-400 ml-1 mb-1.5">
                            {isPast ? 'Days Ago' : 'Days'}
                        </span>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                            <CalendarIcon className="w-3 h-3" />
                            {topEvent.targetDate}
                        </span>
                    </div>
                    {/* Mini Progress Bar if needed, or just a decorative line */}
                    <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-teal-500 rounded-full w-[60%] opacity-80" />
                        {/* TODO: Calculate real percentage for creating a sense of urgency */}
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default CountdownCard;
