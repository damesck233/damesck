import { motion, AnimatePresence } from 'framer-motion';
import {
    XMarkIcon,
    MinusIcon,
    ArrowTopRightOnSquareIcon,
    ChartBarIcon,
    AcademicCapIcon,
    CommandLineIcon,
    CpuChipIcon,
    GlobeAltIcon,
    SwatchIcon
} from '@heroicons/react/24/outline';
import { AppleStyleIcon } from '../../ui/AppleIcons';
import { useEffect } from 'react';
import { useScrollLock } from '../../../hooks/useScrollLock';

// Reusing interfaces for consistency
interface Skill {
    name: string;
    icon: string;
    color: string;
    level: number;
}

interface LearningItem {
    name: string;
    value: string;
    total: string;
    color: string;
    description: string;
}

interface ActivityModalProps {
    isOpen: boolean;
    onClose: () => void;
    skills: { [key: string]: Skill[] };
    learningProgress: LearningItem[];
    layoutId?: string;
}

const ActivityModal: React.FC<ActivityModalProps> = ({
    isOpen,
    onClose,
    skills,
    learningProgress,
    layoutId = 'activity-card'
}) => {

    // Lock body scroll
    // Use custom hook for scroll locking with layout shift prevention
    const { lockScroll, unlockScroll } = useScrollLock();

    useEffect(() => {
        if (isOpen) {
            lockScroll();
        }
        // Don't unlock immediately on close, wait for animation
        return () => {
            // Safety cleanup
            if (!isOpen) unlockScroll();
        };
    }, [isOpen, lockScroll, unlockScroll]);

    // Helper to get category icon
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Languages': return <CommandLineIcon className="w-5 h-5 text-blue-500" />;
            case 'Frontend': return <GlobeAltIcon className="w-5 h-5 text-green-500" />;
            case 'Backend': return <CpuChipIcon className="w-5 h-5 text-purple-500" />;
            case 'Design': return <SwatchIcon className="w-5 h-5 text-pink-500" />;
            default: return <ChartBarIcon className="w-5 h-5 text-gray-500" />;
        }
    };

    return (
        <AnimatePresence onExitComplete={unlockScroll}>
            {isOpen && (
                <>
                    {/* Backdrop Blur Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
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
                            {/* Sidebar (Navigation / Summary) */}
                            <div className="w-full md:w-[280px] flex-shrink-0 bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-[24px] shadow-sm flex flex-col relative overflow-hidden border-b md:border-b-0 md:border-r border-[#FEF9F1] dark:border-white/5 z-20">

                                {/* Header - Traffic Lights */}
                                <div className="flex-shrink-0 h-[44px] md:h-[60px] flex items-center justify-between px-5">
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
                                </div>

                                {/* Sidebar Content */}
                                <div className="flex-1 p-6 flex flex-col">
                                    <div className="mb-8">
                                        <motion.div
                                            layoutId={`${layoutId}-icon-box`}
                                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg mb-4"
                                        >
                                            <ChartBarIcon className="w-8 h-8" />
                                        </motion.div>
                                        <motion.h2
                                            layoutId={`${layoutId}-title`}
                                            className="text-2xl font-bold text-[#1d1d1f] dark:text-white mb-1"
                                        >
                                            技能与活动
                                        </motion.h2>
                                        <motion.p
                                            layoutId={`${layoutId}-subtitle`}
                                            className="text-[#86868b] dark:text-gray-400 text-sm"
                                        >
                                            技术栈概览与当前学习进度
                                        </motion.p>
                                    </div>

                                    {/* Fade-in container for non-morphing content */}
                                    <motion.div
                                        className="flex-1 flex flex-col"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2, duration: 0.3 }}
                                    >
                                        <div className="space-y-1">
                                            <div className="px-3 py-2 rounded-lg bg-black/5 dark:bg-white/10 text-sm font-medium text-gray-900 dark:text-white">
                                                全部概览
                                            </div>
                                            {/* Potential future navigation items */}
                                        </div>

                                        <div className="mt-auto">
                                            <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/5 backdrop-blur-sm">
                                                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-2">Total Skills</div>
                                                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                                    {Object.values(skills).flat().length}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>


                            {/* Main Content Area */}
                            <div className="flex-1 h-full overflow-y-auto overflow-x-hidden p-6 md:p-8 custom-scrollbar">
                                <div className="max-w-[800px] mx-auto space-y-8">

                                    {/* Learning Progress Section */}
                                    <motion.section
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.25 }}
                                    >
                                        <h3 className="text-xl font-bold text-[#1d1d1f] dark:text-white mb-4 flex items-center gap-2">
                                            <AcademicCapIcon className="w-6 h-6 text-indigo-500" />
                                            正在学习
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {learningProgress.map((item, idx) => (
                                                <div key={idx} className="bg-white dark:bg-[#2c2c2e] p-5 rounded-[20px] shadow-sm border border-black/5 dark:border-white/5 hover:scale-[1.02] transition-transform duration-300">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</p>
                                                        </div>
                                                        <div className="px-2 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                                                            {item.value}%
                                                        </div>
                                                    </div>
                                                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-700/50 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${item.value}%` }}
                                                            transition={{ duration: 0.8, delay: 0.3 + (idx * 0.1) }}
                                                            className="h-full rounded-full"
                                                            style={{
                                                                backgroundColor: item.color === 'blue' ? '#3B82F6' : '#8B5CF6'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.section>

                                    <div className="w-full h-px bg-gray-200 dark:bg-gray-700/50"></div>

                                    {/* Skills Section */}
                                    <motion.section
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <h3 className="text-xl font-bold text-[#1d1d1f] dark:text-white mb-6 flex items-center gap-2">
                                            <ChartBarIcon className="w-6 h-6 text-blue-500" />
                                            技能详情
                                        </h3>

                                        <div className="space-y-8">
                                            {Object.entries(skills).map(([category, items], catIdx) => (
                                                <div key={category}>
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
                                                            {getCategoryIcon(category)}
                                                        </div>
                                                        <h4 className="font-semibold text-gray-700 dark:text-gray-200">{category}</h4>
                                                    </div>

                                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                                        {items.map((skill, idx) => (
                                                            <motion.div
                                                                key={idx}
                                                                whileHover={{ scale: 1.05 }}
                                                                className="bg-white dark:bg-[#2c2c2e] p-3 rounded-xl border border-black/5 dark:border-white/5 shadow-sm flex flex-col items-center text-center gap-2 group"
                                                            >
                                                                <div className="text-2xl mb-1 filter drop-shadow-sm">{skill.icon}</div>
                                                                <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</span>

                                                                {/* Skill Dots */}
                                                                <div className="flex gap-0.5 mt-auto">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <div
                                                                            key={i}
                                                                            className={`w-1 h-3 rounded-full transition-colors ${i < skill.level
                                                                                ? 'bg-blue-500 dark:bg-blue-400'
                                                                                : 'bg-gray-200 dark:bg-gray-700'
                                                                                }`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.section>

                                    {/* Footer */}
                                    <div className="pt-8 pb-4 text-center text-gray-400 text-xs">
                                        Continuous Learning & Improvement
                                    </div>

                                </div>
                            </div>
                        </motion.div >
                    </div >
                </>
            )}
        </AnimatePresence>
    );
};

export default ActivityModal;
