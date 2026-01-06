import { motion } from 'framer-motion';
import {
    ChartBarIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';

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

interface ActivityCardProps {
    skills: { [key: string]: Skill[] };
    learningProgress: LearningItem[];
    onClick: () => void;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    variants: any; // Using any for Framer Motion variants for simplicity, ideally specific type
    custom: number;
    layoutId?: string;
    hidden?: boolean;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
    skills,
    learningProgress,
    onClick,
    isHovered,
    onMouseEnter,
    onMouseLeave,
    variants,
    custom,
    layoutId = 'activity-card',
    hidden = false
}) => {

    // Get top 4 skills from "Languages" or first category to display as badges
    const topSkills = skills["Languages"]?.slice(0, 4) || [];
    // Get top 2 active learning items
    const activeLearning = learningProgress.slice(0, 2);

    return (
        <motion.div

            layoutId={layoutId} // 启用布局动画，实现无缝过渡
            className={`md:col-span-2 cursor-pointer group relative z-10 overflow-hidden rounded-[32px] duration-200 aspect-square md:aspect-auto md:h-full ${hidden ? 'pointer-events-none' : ''}`}
            animate={{ opacity: hidden ? 0 : 1 }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 250, damping: 25, mass: 1.0 }}
        >
            {/* Background - Glassmorphism Restored (Matching ProfileCard) */}
            <div className="absolute inset-0 bg-white/40 dark:bg-[#1c1c1e]/60 backdrop-blur-xl z-0 transition-colors duration-300"></div>

            {/* Gradient Overlay for Blue/Indigo Glassmorphism tint (Distinct from Profile's Pink) */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#E0E7FF]/80 to-[#DBEAFE]/80 dark:from-[#1e1b4b]/40 dark:to-[#172554]/40 z-0"></div>

            {/* Cloud Decorations (White Circles) */}
            <div className="absolute top-[-50px] right-[-50px] z-0 pointer-events-none opacity-60 dark:opacity-30">
                <div className="w-64 h-64 bg-white/40 dark:bg-white/10 rounded-full blur-[2px] absolute top-10 right-10"></div>
                <div className="w-48 h-48 bg-white/30 dark:bg-white/5 rounded-full blur-[2px] absolute top-[-10px] right-[80px]"></div>
                <div className="w-40 h-40 bg-white/20 dark:bg-white/5 rounded-full blur-[2px] absolute top-[80px] right-[-20px]"></div>
            </div>

            {/* Subtle Shine/Reflection */}
            <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-gradient-to-br from-white/20 to-transparent pointer-events-none rounded-tl-[32px]"></div>


            {/* Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col p-7">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <motion.div
                            layoutId={`${layoutId}-icon-box`}
                            className="w-10 h-10 rounded-xl bg-white/50 dark:bg-white/10 flex items-center justify-center shadow-sm backdrop-blur-md"
                        >
                            <ChartBarIcon className="w-6 h-6 text-[#007aff] dark:text-blue-400" />
                        </motion.div>
                        <div className="ml-3">
                            <motion.h3
                                layoutId={`${layoutId}-title`}
                                className="text-[20px] font-bold text-[#1d1d1f] dark:text-white leading-none"
                            >
                                技能与活动
                            </motion.h3>
                            <motion.p
                                layoutId={`${layoutId}-subtitle`}
                                className="text-[13px] text-[#1d1d1f]/60 dark:text-white/60 font-medium mt-1"
                            >
                                掌握 & 进阶
                            </motion.p>
                        </div>
                    </div>

                    {/* Arrow Icon */}
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/30 dark:bg-white/10 group-hover:bg-[#007aff] transition-colors duration-300">
                        <ArrowRightIcon className="w-4 h-4 text-[#1d1d1f]/60 dark:text-white/60 group-hover:text-white transition-colors duration-300" />
                    </div>
                </div>

                {/* Content Body */}
                <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">

                    {/* Left: Skills Snapshot */}
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="text-[11px] font-bold text-[#1d1d1f]/40 dark:text-white/40 mb-3 uppercase tracking-wider">Top Skills</div>
                        <div className="flex flex-wrap gap-2.5">
                            {topSkills.map((skill, idx) => (
                                <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/5 backdrop-blur-md shadow-sm transition-transform hover:scale-105">
                                    <span className="text-xl filter drop-shadow-sm">{skill.icon}</span>
                                    <span className="text-[14px] font-semibold text-[#1d1d1f]/80 dark:text-white/90">{skill.name}</span>
                                </div>
                            ))}
                            {topSkills.length > 0 && (
                                <div className="px-3 py-2 rounded-xl bg-white/20 dark:bg-white/5 border border-white/10 dark:border-white/5 border-dashed text-[12px] font-medium text-[#1d1d1f]/50 dark:text-white/40 flex items-center">
                                    +More
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px md:w-px md:h-full bg-gradient-to-b from-transparent via-[#1d1d1f]/10 dark:via-white/10 to-transparent"></div>

                    {/* Right: Learning Snapshot */}
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="text-[11px] font-bold text-[#1d1d1f]/40 dark:text-white/40 mb-3 uppercase tracking-wider">In Progress</div>
                        <div className="space-y-4">
                            {activeLearning.map((item, idx) => (
                                <div key={idx} className="group/item">
                                    <div className="flex justify-between text-[13px] mb-1.5 font-medium">
                                        <span className="text-[#1d1d1f]/80 dark:text-white/90">{item.name}</span>
                                        <span className="text-[#1d1d1f]/50 dark:text-white/50">{item.value}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/30 dark:bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                                        <div
                                            className="h-full rounded-full transition-all duration-500 ease-out group-hover/item:brightness-110"
                                            style={{
                                                width: `${item.value}%`,
                                                background: item.color === 'blue' ? '#007aff' :
                                                    item.color === 'green' ? '#34c759' :
                                                        item.color === 'yellow' ? '#ffcc00' :
                                                            item.color === 'purple' ? '#af52de' : '#007aff',
                                                boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

export default ActivityCard;
