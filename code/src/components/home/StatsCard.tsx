import { motion } from 'framer-motion';
import { AppleStyleIcon, AppleLearningIcon } from '../ui/AppleIcons';
import learningProgress from '../../data/cards/learningProgress.json';
import { iosCardStyle, cardHeaderStyle, cardBodyStyle, hoverStyle, fadeIn } from './CardStyles';

interface StatsCardProps {
    onClick: () => void;
    custom?: number;
}

const StatsCard = ({ onClick, custom = 2 }: StatsCardProps) => {
    return (
        <motion.div
            variants={fadeIn}
            custom={custom}
            initial="hidden"
            animate="visible"
            className="aspect-square cursor-pointer card-container floating-element"
            onClick={onClick}
            whileHover={hoverStyle}
        >
            <div
                className="h-full"
                style={iosCardStyle}
            >
                <div style={cardHeaderStyle}>
                    <div className="flex items-center">
                        <AppleStyleIcon colorScheme="indigo">
                            <AppleLearningIcon className="w-5 h-5 text-white" />
                        </AppleStyleIcon>
                        <div className="ml-3">
                            <h3 className="text-base font-semibold dark:text-gray-100 text-[#2c2c2e]">学习进度</h3>
                            <p className="text-xs dark:text-gray-400 text-gray-500 mt-0.5">正在学习中</p>
                        </div>
                    </div>
                    <div className="w-6 h-6 flex items-center justify-center rounded-full dark:bg-gray-700 bg-gray-100">
                        <span className="text-[#5E5CE6] font-semibold text-sm">{learningProgress.length}</span>
                    </div>
                </div>
                <div style={cardBodyStyle} className="h-[calc(100%-64px)] overflow-y-auto">
                    <div className="flex flex-col h-full p-3">
                        {learningProgress.map((item, index) => (
                            <div key={index} className="mb-4 group hover:translate-y-[-2px] transition-all duration-300 bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-800/60 rounded-xl p-4 shadow-sm hover:shadow-md dark:shadow-gray-900/10">
                                <div className="flex items-center justify-between mb-2.5">
                                    <h4 className="text-base font-medium dark:text-white text-gray-800">{item.name}</h4>
                                    <div
                                        className="text-xs px-2 py-1 rounded-full font-medium border dark:border-opacity-20 border-opacity-30"
                                        style={{
                                            backgroundColor: item.color === 'blue' ? 'rgba(59, 130, 246, 0.08)' :
                                                item.color === 'green' ? 'rgba(16, 185, 129, 0.08)' :
                                                    item.color === 'yellow' ? 'rgba(245, 158, 11, 0.08)' :
                                                        item.color === 'orange' ? 'rgba(249, 115, 22, 0.08)' :
                                                            item.color === 'indigo' ? 'rgba(79, 70, 229, 0.08)' :
                                                                item.color === 'red' ? 'rgba(239, 68, 68, 0.08)' :
                                                                    item.color === 'purple' ? 'rgba(139, 92, 246, 0.08)' :
                                                                        item.color === 'pink' ? 'rgba(236, 72, 153, 0.08)' : 'rgba(59, 130, 246, 0.08)',
                                            color: item.color === 'blue' ? '#3B82F6' :
                                                item.color === 'green' ? '#10B981' :
                                                    item.color === 'yellow' ? '#F59E0B' :
                                                        item.color === 'orange' ? '#F97316' :
                                                            item.color === 'indigo' ? '#4F46E5' :
                                                                item.color === 'red' ? '#EF4444' :
                                                                    item.color === 'purple' ? '#8B5CF6' :
                                                                        item.color === 'pink' ? '#EC4899' : '#3B82F6',
                                            borderColor: item.color === 'blue' ? 'rgba(59, 130, 246, 0.2)' :
                                                item.color === 'green' ? 'rgba(16, 185, 129, 0.2)' :
                                                    item.color === 'yellow' ? 'rgba(245, 158, 11, 0.2)' :
                                                        item.color === 'orange' ? 'rgba(249, 115, 22, 0.2)' :
                                                            item.color === 'indigo' ? 'rgba(79, 70, 229, 0.2)' :
                                                                item.color === 'red' ? 'rgba(239, 68, 68, 0.2)' :
                                                                    item.color === 'purple' ? 'rgba(139, 92, 246, 0.2)' :
                                                                        item.color === 'pink' ? 'rgba(236, 72, 153, 0.2)' : 'rgba(59, 130, 246, 0.2)'
                                        }}
                                    >
                                        {parseInt(item.value) < 30 ? '初学' :
                                            parseInt(item.value) < 60 ? '进阶' :
                                                parseInt(item.value) < 80 ? '熟练' : '精通'}
                                    </div>
                                </div>

                                <p className="text-xs dark:text-gray-400 text-gray-500 mb-3 line-clamp-1">{item.description}</p>

                                <div className="flex items-center">
                                    <div className="relative flex-grow mr-3">
                                        <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-400 ease-out"
                                                style={{
                                                    width: item.value,
                                                    backgroundColor: item.color === 'blue' ? '#3B82F6' :
                                                        item.color === 'green' ? '#10B981' :
                                                            item.color === 'yellow' ? '#F59E0B' :
                                                                item.color === 'orange' ? '#F97316' :
                                                                    item.color === 'indigo' ? '#4F46E5' :
                                                                        item.color === 'red' ? '#EF4444' :
                                                                            item.color === 'purple' ? '#8B5CF6' :
                                                                                item.color === 'pink' ? '#EC4899' : '#3B82F6'
                                                }}
                                            ></div>
                                        </div>
                                        <div className="absolute -bottom-4 left-0 w-full flex justify-between text-[10px] text-gray-400 dark:text-gray-500 px-0.5">
                                            <span>0%</span>
                                            <span>50%</span>
                                            <span>100%</span>
                                        </div>
                                    </div>
                                    <div
                                        className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 text-sm shadow-sm"
                                        style={{
                                            backgroundColor: item.color === 'blue' ? '#3B82F6' :
                                                item.color === 'green' ? '#10B981' :
                                                    item.color === 'yellow' ? '#F59E0B' :
                                                        item.color === 'orange' ? '#F97316' :
                                                            item.color === 'indigo' ? '#4F46E5' :
                                                                item.color === 'red' ? '#EF4444' :
                                                                    item.color === 'purple' ? '#8B5CF6' :
                                                                        item.color === 'pink' ? '#EC4899' : '#3B82F6'
                                        }}
                                    >
                                        {item.value}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default StatsCard;
