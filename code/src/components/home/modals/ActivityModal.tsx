import { motion, AnimatePresence } from 'framer-motion';
import {
    XMarkIcon,
    MinusIcon,
    ArrowTopRightOnSquareIcon,
    SparklesIcon,
    GiftIcon,
    AcademicCapIcon,
    RocketLaunchIcon
} from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { useScrollLock } from '../../../hooks/useScrollLock';

// Reusing TimelineEvent Interface
export interface TimelineEvent {
    date: string;
    title: string;
    description: string;
    icon: string;
    color: string;
}

interface ActivityModalProps {
    isOpen: boolean;
    onClose: () => void;
    timelineEvents: TimelineEvent[];
    layoutId?: string;
}

const ActivityModal: React.FC<ActivityModalProps> = ({
    isOpen,
    onClose,
    timelineEvents,
    layoutId = 'activity-card'
}) => {

    const { lockScroll, unlockScroll } = useScrollLock();

    useEffect(() => {
        if (isOpen) {
            lockScroll();
        }
        return () => {
            if (!isOpen) unlockScroll();
        };
    }, [isOpen, lockScroll, unlockScroll]);

    // Helper to get icon component
    const getIcon = (iconName: string) => {
        if (iconName.startsWith('http')) {
            return <img src={iconName} alt="icon" className="w-full h-full object-cover rounded-full border-2 border-transparent" />;
        }
        switch (iconName) {
            case 'sparkles': return <SparklesIcon className="w-5 h-5 text-white" />;
            case 'gift': return <GiftIcon className="w-5 h-5 text-white" />;
            case 'academic': return <AcademicCapIcon className="w-5 h-5 text-white" />;
            case 'rocket': return <RocketLaunchIcon className="w-5 h-5 text-white" />;
            default: return <SparklesIcon className="w-5 h-5 text-white" />;
        }
    };

    // Helper for background color of icon
    const getIconBgColor = (color: string) => {
        switch (color) {
            case 'blue': return 'bg-blue-500';
            case 'red': return 'bg-red-500';
            case 'purple': return 'bg-purple-500';
            case 'green': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
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
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md z-[999]"
                        onClick={onClose}
                    />

                    <div className="fixed inset-0 flex items-center justify-center z-[1000] pointer-events-none p-4">
                        <motion.div
                            layoutId={layoutId} // 启用布局动画
                            className="w-full md:max-w-[1000px] h-[90vh] md:h-[750px] bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-[32px] shadow-2xl overflow-hidden pointer-events-auto flex flex-col md:flex-row relative p-2"
                            style={{
                                backdropFilter: 'blur(50px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(50px) saturate(180%)',
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 250,
                                damping: 25,
                                mass: 1.0
                            }}
                        >
                            {/* Sidebar */}
                            <div className="w-full md:w-[320px] flex-shrink-0 bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-[24px] shadow-sm flex flex-col relative overflow-hidden border-b md:border-b-0 md:border-r border-[#FEF9F1] dark:border-white/5 z-20">

                                {/* Header - Traffic Lights */}
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

                                {/* Sidebar Content */}
                                <div className="flex-1 p-6 flex flex-col">
                                    <div className="mb-8">
                                        <motion.div
                                            layoutId={`${layoutId}-icon-box`}
                                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg mb-4"
                                        >
                                            <SparklesIcon className="w-8 h-8" />
                                        </motion.div>
                                        <motion.h2
                                            layoutId={`${layoutId}-title`}
                                            className="text-2xl font-bold text-[#1d1d1f] dark:text-white mb-1"
                                        >
                                            最近发生的事
                                        </motion.h2>
                                        <motion.p
                                            layoutId={`${layoutId}-subtitle`}
                                            className="text-[#86868b] dark:text-gray-400 text-sm"
                                        >
                                            Timeline & Updates
                                        </motion.p>
                                    </div>

                                    {/* Simple Stats for Timeline */}
                                    <motion.div
                                        className="mt-auto"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                                        transition={{ delay: 0.2, duration: 0.3 }}
                                    >
                                        <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/5 backdrop-blur-sm">
                                            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-2">Total Events</div>
                                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                                {timelineEvents ? timelineEvents.length : 0}
                                            </div>
                                        </div>
                                    </motion.div>

                                </div>
                            </div>


                            {/* Main Content Area: Vertical Timeline */}
                            <motion.div
                                className="flex-1 h-full overflow-y-auto overflow-x-hidden p-6 md:p-8 custom-scrollbar"
                                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                            >
                                <div className="max-w-[800px] mx-auto relative pt-4">

                                    {/* Vertical Line */}
                                    <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-white/10"></div>

                                    <div className="space-y-12">
                                        {timelineEvents && timelineEvents.map((event, idx) => {
                                            const isImage = event.icon.startsWith('http');
                                            return (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.2 + (idx * 0.1) }}
                                                    className="relative pl-20"
                                                >
                                                    {/* Timeline Node */}
                                                    <div className={`absolute left-0 w-14 h-14 rounded-full ${isImage ? 'bg-transparent overflow-hidden' : getIconBgColor(event.color)} flex items-center justify-center shadow-lg border-4 border-[#f5f5f7] dark:border-[#1c1c1e] z-10`}>
                                                        {getIcon(event.icon)}
                                                    </div>

                                                    {/* Date Tag */}
                                                    <div className="absolute left-20 top-[-25px] inline-block px-3 py-1 rounded-full bg-white dark:bg-white/10 text-xs font-semibold text-gray-500 dark:text-gray-300 shadow-sm border border-gray-100 dark:border-white/5">
                                                        {event.date}
                                                    </div>

                                                    {/* Card Body */}
                                                    <div className="bg-white dark:bg-[#2c2c2e] p-6 rounded-2xl shadow-sm border border-black/5 dark:border-white/5 hover:transform hover:scale-[1.01] transition-all duration-300">
                                                        <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-white mb-2">
                                                            {event.title}
                                                        </h3>
                                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                                            {event.description}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    <div className="h-16"></div> {/* Spacer */}

                                </div>
                            </motion.div>
                        </motion.div >
                    </div >
                </>
            )}
        </AnimatePresence>
    );
};

export default ActivityModal;
