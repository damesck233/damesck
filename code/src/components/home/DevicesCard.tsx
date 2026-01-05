import { motion } from 'framer-motion';
import { AppleStyleIcon, AppleDeviceIcon } from '../ui/AppleIcons';
import devices from '../../data/cards/devices.json';
import { iosCardStyle, cardHeaderStyle, cardBodyStyle, hoverStyle, fadeIn } from './CardStyles';

interface DevicesCardProps {
    onClick: () => void;
    custom?: number;
}

const DevicesCard = ({ onClick, custom = 3 }: DevicesCardProps) => {
    return (
        <motion.div
            variants={fadeIn}
            custom={custom}
            initial="hidden"
            animate="visible"
            className="md:col-span-2 cursor-pointer card-container floating-element"
            style={{ height: 'calc(100% - 0px)' }}
            onClick={onClick}
            whileHover={hoverStyle}
        >
            <div
                className="h-full"
                style={iosCardStyle}
            >
                <div style={cardHeaderStyle}>
                    <div className="flex items-center">
                        <AppleStyleIcon colorScheme="orange">
                            <AppleDeviceIcon className="w-5 h-5 text-white" />
                        </AppleStyleIcon>
                        <div className="ml-3">
                            <h3 className="text-base font-semibold dark:text-gray-100 text-[#2c2c2e]">我的设备</h3>
                            <p className="text-xs dark:text-gray-400 text-gray-500 mt-0.5">浏览全部设备</p>
                        </div>
                    </div>
                    <div className="w-6 h-6 flex items-center justify-center rounded-full dark:bg-gray-700 bg-gray-100">
                        <span className="text-[#FF9F0A] font-semibold text-sm">{devices.length}</span>
                    </div>
                </div>
                <div style={cardBodyStyle} className="h-[calc(100%-64px)] overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {devices.slice(0, 3).map((device, index) => (
                            <div key={index} className="relative flex flex-col overflow-hidden h-full dark:bg-gray-800/70 dark:border-gray-700/50 bg-white/70 rounded-xl hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all shadow-sm border border-gray-100/50 group">
                                {/* 背景装饰 */}
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                    <div className="absolute -right-6 -top-6 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl dark:from-blue-600/10 dark:to-purple-600/10"></div>
                                    <div className="absolute -left-4 -bottom-4 w-12 h-12 rounded-full bg-gradient-to-tr from-green-500/10 to-yellow-500/10 blur-lg dark:from-green-600/5 dark:to-yellow-600/5"></div>
                                </div>

                                {/* 上部图片与信息区 */}
                                <div className="p-3 pb-2 relative z-10">
                                    <div className="flex items-center">
                                        <div className="relative w-14 h-14 rounded-xl overflow-hidden mr-3 shadow-sm flex-shrink-0">
                                            <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-gray-700 dark:to-gray-800 bg-gradient-to-br from-gray-100 to-gray-200"></div>
                                            <img src={device.image} alt={device.name} className="w-full h-full object-contain p-1.5 relative z-10 transition-transform duration-300 group-hover:scale-110" style={{ willChange: 'transform' }} />
                                        </div>
                                        <div className="flex-grow overflow-hidden">
                                            <h4 className="font-semibold dark:text-gray-100 text-[#1d1d1f] truncate">{device.name}</h4>
                                            <div className="flex items-center mt-0.5">
                                                <div className="w-2 h-2 rounded-full mr-1.5 flex-shrink-0"
                                                    style={{
                                                        backgroundColor: device.specs.condition === '良好' ? '#34D399' :
                                                            device.specs.condition === '一般' ? '#FBBF24' :
                                                                device.specs.condition === '需要维修' ? '#F87171' : '#60A5FA'
                                                    }}
                                                ></div>
                                                <span className="text-xs dark:text-gray-400 text-gray-500">{device.specs.condition}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 中部卡片内容 */}
                                <div className="flex-grow px-3 pb-1 flex flex-col relative z-10">
                                    <p className="text-xs dark:text-gray-400 text-gray-500 line-clamp-2 mb-2">{device.description}</p>

                                    {/* 信息卡片 */}
                                    <div className="mt-auto mb-2">
                                        <div className="w-full dark:bg-gray-700/40 bg-gray-100/80 rounded-lg p-2 backdrop-blur-sm">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] dark:text-gray-400 text-gray-500">购买日期</span>
                                                <span className="text-xs font-medium dark:text-gray-300 text-gray-700">{device.specs.purchaseDate}</span>
                                            </div>
                                            <div className="flex justify-between items-center mt-1">
                                                <span className="text-[10px] dark:text-gray-400 text-gray-500">保修状态</span>
                                                <span className="text-xs font-medium dark:text-gray-300 text-gray-700">{device.specs.warranty}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 底部标签区域 */}
                                <div className="p-3 pt-0 relative z-10">
                                    <div className="flex flex-wrap gap-1.5">
                                        {device.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="inline-flex items-center px-2 py-0.5 text-2xs rounded-full backdrop-blur-sm transition-all duration-300 group-hover:translate-y-[-1px] group-hover:shadow-sm"
                                                style={{
                                                    backgroundColor: tagIndex === 0 ? 'rgba(59, 130, 246, 0.1)' :
                                                        tagIndex === 1 ? 'rgba(16, 185, 129, 0.1)' :
                                                            'rgba(99, 102, 241, 0.1)',
                                                    color: tagIndex === 0 ? '#3B82F6' :
                                                        tagIndex === 1 ? '#10B981' :
                                                            '#6366F1',
                                                    borderColor: tagIndex === 0 ? 'rgba(59, 130, 246, 0.2)' :
                                                        tagIndex === 1 ? 'rgba(16, 185, 129, 0.2)' :
                                                            'rgba(99, 102, 241, 0.2)',
                                                    borderWidth: '1px'
                                                }}
                                            >
                                                {tagIndex === 0 && (
                                                    <svg className="w-2 h-2 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                                                    </svg>
                                                )}
                                                {tagIndex === 1 && (
                                                    <svg className="w-2 h-2 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                                                    </svg>
                                                )}
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* 悬停指示器 */}
                                <div className="absolute top-0 right-0 w-0 h-0 border-l-[24px] border-l-transparent border-t-[24px] border-blue-500/70 dark:border-blue-600/70 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DevicesCard;
