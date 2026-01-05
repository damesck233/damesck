import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClockIcon } from '@heroicons/react/24/outline';
import { AppleStyleIcon } from '../ui/AppleIcons';
import countdownDataRaw from '../../data/cards/countdown.json';
import { iosCardStyle, cardHeaderStyle, cardBodyStyle, hoverStyle, fadeIn } from './CardStyles';
import { calculateDaysLeft, calculateProgress, getMainCountdown } from '../../utils/dateUtils';
import { CountdownItem } from '../../types';

interface CountdownCardProps {
    onClick: () => void;
    custom?: number;
}

const CountdownCard = ({ onClick, custom = 4 }: CountdownCardProps) => {
    const countdownData = countdownDataRaw as CountdownItem[];

    // 实时倒计时状态
    const [daysLeft, setDaysLeft] = useState(() => {
        const mainCountdown = getMainCountdown(countdownData);
        return calculateDaysLeft(mainCountdown.targetDate);
    });

    // 每天更新倒计时
    useEffect(() => {
        const updateDaysLeft = () => {
            const main = getMainCountdown(countdownData);
            if (main) {
                setDaysLeft(calculateDaysLeft(main.targetDate));
            }
        };

        const timer = setInterval(updateDaysLeft, 86400000); // 每24小时更新一次
        return () => clearInterval(timer);
    }, [countdownData]);

    const mainCountdown = getMainCountdown(countdownData);

    return (
        <motion.div
            variants={fadeIn}
            custom={custom}
            initial="hidden"
            animate="visible"
            className="cursor-pointer card-container floating-element"
            onClick={onClick}
            whileHover={hoverStyle}
        >
            <div
                className="h-full"
                style={iosCardStyle}
            >
                <div style={cardHeaderStyle}>
                    <div className="flex items-center">
                        <AppleStyleIcon colorScheme="teal" size="md">
                            <ClockIcon className="w-5 h-5 text-white" />
                        </AppleStyleIcon>
                        <div className="ml-3">
                            <h3 className="text-base font-semibold dark:text-gray-100 text-[#2c2c2e]">倒计日</h3>
                            <p className="text-xs dark:text-gray-400 text-gray-500 mt-0.5">剩余天数</p>
                        </div>
                    </div>
                    <div className="w-6 h-6 flex items-center justify-center rounded-full dark:bg-gray-700 bg-gray-100">
                        <span className="text-blue-500 font-semibold text-sm">{countdownData.length}</span>
                    </div>
                </div>
                <div style={cardBodyStyle} className="h-[calc(100%-64px)]">
                    <div className="h-full flex flex-col p-4 relative">
                        {/* 背景装饰 */}
                        <div className="absolute -top-1 -right-1 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-xl pointer-events-none dark:from-blue-400/5 dark:to-purple-500/5"></div>
                        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-tr from-green-400/10 to-yellow-500/10 rounded-full blur-lg pointer-events-none dark:from-green-400/5 dark:to-yellow-500/5"></div>

                        {/* 主倒计时 */}
                        <div className="flex justify-between items-start mb-3 relative z-10">
                            <h4 className="font-medium text-lg dark:text-gray-100 text-[#2c2c2e]">{mainCountdown.title}</h4>
                            <span className="text-xs py-0.5 px-2 rounded-full font-medium dark:bg-blue-500/20 dark:text-blue-400 bg-blue-100 text-blue-600">主要</span>
                        </div>

                        <div className="relative z-10 mb-3 flex items-center">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center text-white shadow-md">
                                <div className="text-3xl font-bold">{daysLeft}</div>
                            </div>
                            <div className="ml-3">
                                <div className="text-sm dark:text-gray-400 text-gray-500 mb-1">距离目标日期</div>
                                <div className="text-sm font-medium dark:text-gray-300 text-gray-700">{mainCountdown.targetDate.replace(/-/g, '年') + '日'}</div>
                            </div>
                        </div>

                        <div className="h-1.5 w-full dark:bg-gray-700 bg-gray-100 rounded-full overflow-hidden shadow-inner mb-3 relative z-10">
                            <div
                                className="h-full dark:bg-blue-500 bg-blue-500 rounded-full transition-all duration-600"
                                style={{ width: `${calculateProgress(mainCountdown)}%` }}
                            ></div>
                        </div>

                        {/* 更紧凑的其他倒计时列表 */}
                        <div className="relative z-10 flex-1 overflow-hidden">
                            <h5 className="text-xs uppercase dark:text-gray-400 text-gray-500 mb-1.5 font-medium tracking-wider">其他倒计时</h5>
                            <div className="space-y-1.5">
                                {countdownData.filter(item => !item.top).slice(0, 2).map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 rounded-full mr-1.5"
                                                style={{
                                                    backgroundColor: index === 0 ? '#22C55E' : '#F97316'
                                                }}
                                            ></div>
                                            <span className="text-xs dark:text-gray-300 text-gray-700">{item.title}</span>
                                        </div>
                                        <span className="text-xs font-medium dark:text-gray-300 text-gray-700">{calculateDaysLeft(item.targetDate)}天</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CountdownCard;
