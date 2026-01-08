import { motion, AnimatePresence } from 'framer-motion';
import {
    XMarkIcon,
    MinusIcon,
    ArrowTopRightOnSquareIcon,
    ClockIcon,
    CalendarDaysIcon,
    FlagIcon
} from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { useScrollLock } from '../../../hooks/useScrollLock';
import { CountdownEvent } from '../CountdownCard';

interface CountdownModalProps {
    isOpen: boolean;
    onClose: () => void;
    events: CountdownEvent[];
    layoutId?: string;
}

const CountdownModal: React.FC<CountdownModalProps> = ({
    isOpen,
    onClose,
    events,
    layoutId
}) => {
    const { lockScroll, unlockScroll } = useScrollLock();

    useEffect(() => {
        if (isOpen) lockScroll();
        return () => { if (!isOpen) unlockScroll(); };
    }, [isOpen, lockScroll, unlockScroll]);

    const calculateDaysLeft = (target: string) => {
        const today = new Date();
        const tgt = new Date(target);
        today.setHours(0, 0, 0, 0);
        tgt.setHours(0, 0, 0, 0);
        const diff = tgt.getTime() - today.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    // Calculate percentage passed
    const calculateProgress = (start: string, end: string) => {
        const startDate = new Date(start).getTime();
        const endDate = new Date(end).getTime();
        const today = new Date().getTime();

        if (today < startDate) return 0;
        if (today > endDate) return 100;

        const total = endDate - startDate;
        const current = today - startDate;
        return Math.min(Math.max((current / total) * 100, 0), 100);
    };

    return (
        <AnimatePresence onExitComplete={unlockScroll}>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: layoutId ? 0.3 : 0.2 }}
                        className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md z-[999]"
                        onClick={onClose}
                    />

                    <div className="fixed inset-0 flex items-center justify-center z-[1000] pointer-events-none p-4">
                        <motion.div
                            layoutId={layoutId}
                            initial={!layoutId ? { opacity: 0, scale: 0.95 } : undefined}
                            animate={!layoutId ? { opacity: 1, scale: 1 } : undefined}
                            exit={!layoutId ? { opacity: 0, scale: 0.95 } : undefined}
                            className="w-full md:max-w-[900px] h-[85vh] md:h-[700px] bg-white/95 dark:bg-[#1c1c1e]/95 backdrop-blur-2xl rounded-[32px] shadow-2xl overflow-y-auto md:overflow-hidden pointer-events-auto flex flex-col md:flex-row relative p-2"
                            transition={layoutId ? {
                                type: "spring",
                                stiffness: 250,
                                damping: 25,
                                mass: 1.0
                            } : {
                                duration: 0.2,
                                ease: "easeOut"
                            }}
                        >
                            {/* Sidebar */}
                            <div className="w-full md:w-[280px] flex-shrink-0 bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-[24px] shadow-sm flex flex-col relative overflow-hidden border-b md:border-b-0 md:border-r border-[#FEF9F1] dark:border-white/5 z-20">

                                {/* Traffic Lights */}
                                <motion.div
                                    className="flex-shrink-0 h-[44px] md:h-[60px] flex items-center justify-between px-5"
                                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <button onClick={onClose} className="w-4 h-4 rounded-full bg-[#ff5f56] border-[0.5px] border-[#e0443e] hover:brightness-90 transition-all flex items-center justify-center group">
                                            <XMarkIcon className="w-2.5 h-2.5 text-black/50 opacity-0 group-hover:opacity-100" />
                                        </button>
                                        <button onClick={onClose} className="w-4 h-4 rounded-full bg-[#ffbd2e] border-[0.5px] border-[#dea123] hover:brightness-90 transition-all flex items-center justify-center group">
                                            <MinusIcon className="w-2.5 h-2.5 text-black/50 opacity-0 group-hover:opacity-100" />
                                        </button>
                                        <button className="w-4 h-4 rounded-full bg-[#27c93f] border-[0.5px] border-[#1aab29] hover:brightness-90 transition-all flex items-center justify-center group cursor-default">
                                            <ArrowTopRightOnSquareIcon className="w-2.5 h-2.5 text-black/50 opacity-0 group-hover:opacity-100" />
                                        </button>
                                    </div>
                                </motion.div>

                                {/* Sidebar Info */}
                                <div className="flex-1 p-6 flex flex-col">
                                    <div className="mb-8">
                                        <motion.div
                                            layoutId={`${layoutId}-icon-box`}
                                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white shadow-lg mb-4"
                                        >
                                            <motion.div layoutId={`${layoutId}-icon`}>
                                                <ClockIcon className="w-8 h-8" />
                                            </motion.div>
                                        </motion.div>
                                        <h2 className="text-2xl font-bold text-[#1d1d1f] dark:text-white mb-1">
                                            倒计日
                                        </h2>
                                        <p className="text-[#86868b] dark:text-gray-400 text-sm">
                                            Time Flies
                                        </p>
                                    </div>

                                    <div className="mt-auto p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/30">
                                        <div className="text-xs text-teal-600 dark:text-teal-400 font-medium mb-1">UPCOMING</div>
                                        <div className="text-sm font-bold text-teal-800 dark:text-teal-100 line-clamp-1">
                                            {events[0]?.title || "No Events"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Grid */}
                            <motion.div
                                className="flex-none md:flex-1 h-auto md:h-full overflow-visible md:overflow-y-auto overflow-x-hidden p-6 md:p-8 custom-scrollbar z-10"
                                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {events.map((event, idx) => {
                                        const days = calculateDaysLeft(event.targetDate);
                                        const progress = calculateProgress(event.Startdate, event.targetDate);
                                        const isPast = days < 0;

                                        return (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 + (idx * 0.1) }}
                                                className="bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/5 rounded-2xl p-5 hover:bg-white/80 dark:hover:bg-white/10 transition-colors duration-200 relative overflow-hidden group"
                                            >
                                                <div className="relative z-10">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <h3 className="font-bold text-lg text-gray-800 dark:text-white">{event.title}</h3>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                                                                <FlagIcon className="w-3 h-3" />
                                                                {event.targetDate}
                                                            </p>
                                                        </div>
                                                        <div className={`px-2 py-1 rounded-lg text-xs font-bold ${isPast ? 'bg-gray-100 text-gray-500' : 'bg-teal-100 text-teal-600'}`}>
                                                            {isPast ? 'ENDED' : 'ACTIVE'}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-end gap-1 mb-4">
                                                        <span className="text-4xl font-bold tracking-tight text-[#1d1d1f] dark:text-white">
                                                            {Math.abs(days)}
                                                        </span>
                                                        <span className="text-sm font-medium text-gray-500 mb-1.5 ml-1">
                                                            {isPast ? 'Days Ago' : 'Days Left'}
                                                        </span>
                                                    </div>

                                                    {/* Progress Bar */}
                                                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${progress}%` }}
                                                            transition={{ delay: 0.4 + (idx * 0.1), duration: 1 }}
                                                            className={`h-full rounded-full ${isPast ? 'bg-gray-400' : 'bg-gradient-to-r from-teal-400 to-cyan-500'}`}
                                                        />
                                                    </div>
                                                    <div className="flex justify-between mt-1.5">
                                                        <span className="text-[10px] text-gray-400">{event.Startdate}</span>
                                                        <span className="text-[10px] text-gray-400">{Math.round(progress)}%</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                                <div className="h-16"></div>
                            </motion.div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CountdownModal;
