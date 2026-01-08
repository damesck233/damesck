import { motion } from 'framer-motion';
import {
    ComputerDesktopIcon,
    DevicePhoneMobileIcon,
    DeviceTabletIcon,
    CpuChipIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';

export interface Device {
    name: string;
    image: string;
    description: string;
    specs: {
        condition: string;
        purchaseDate: string;
        warranty: string;
    };
    tags: { name: string }[];
}

interface DevicesCardProps {
    devices: Device[];
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    layoutId?: string;
    hidden?: boolean;
}

const DevicesCard: React.FC<DevicesCardProps> = ({
    devices,
    onClick,
    onMouseEnter,
    onMouseLeave,
    layoutId,
    hidden = false
}) => {
    // Get top 3 devices
    const topDevices = devices ? devices.slice(0, 3) : [];

    // Helper to get icon
    const getDeviceIcon = (name: string) => {
        if (name.includes('Mac') || name.includes('PC')) return <ComputerDesktopIcon className="w-5 h-5" />;
        if (name.includes('iPhone') || name.includes('Android')) return <DevicePhoneMobileIcon className="w-5 h-5" />;
        if (name.includes('iPad') || name.includes('Tablet')) return <DeviceTabletIcon className="w-5 h-5" />;
        return <CpuChipIcon className="w-5 h-5" />;
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
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-amber-100/50 dark:from-orange-900/20 dark:to-amber-900/20 z-0 opacity-80"></div>

            {/* Content Container - Split Layout */}
            <div className="relative z-10 w-full h-full p-6 flex flex-col md:flex-row gap-6">

                {/* Left Side: Header & Info (35%) */}
                <div className="md:w-[35%] flex flex-col justify-between">
                    <div>
                        <motion.div
                            layoutId={`${layoutId}-icon-box`}
                            className="w-12 h-12 rounded-xl bg-orange-500/10 dark:bg-orange-400/10 flex items-center justify-center shadow-sm backdrop-blur-md mb-4 border border-orange-500/20"
                        >
                            <motion.div layoutId={`${layoutId}-icon`}>
                                <ComputerDesktopIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            </motion.div>
                        </motion.div>

                        <div className='mb-1'>
                            <motion.h3
                                layoutId={`${layoutId}-title`}
                                className="text-2xl font-bold text-[#1d1d1f] dark:text-white leading-none"
                            >
                                我的设备
                            </motion.h3>
                        </div>
                        <motion.p
                            layoutId={`${layoutId}-subtitle`}
                            className="text-xs text-[#1d1d1f]/60 dark:text-white/60 font-medium uppercase tracking-wider"
                        >
                            Digital Arsenal
                        </motion.p>
                    </div>

                    <div className="mt-4 md:mt-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-black/20 border border-white/20 dark:border-white/10 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                {devices.length} Active Devices
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Device List (65%) */}
                <div className="flex-1 flex flex-col justify-center min-w-0">
                    <div className="grid grid-cols-1 gap-3">
                        {topDevices.map((device, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-4 p-3 rounded-2xl bg-white/40 dark:bg-black/20 border border-white/40 dark:border-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors backdrop-blur-sm group/item"
                            >
                                <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover/item:text-orange-500 dark:group-hover/item:text-orange-400 transition-colors">
                                    {getDeviceIcon(device.name)}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                        {device.name}
                                    </h4>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate flex items-center gap-1">
                                        <span>{device.specs.purchaseDate}</span>
                                        <span className="w-0.5 h-0.5 rounded-full bg-gray-400"></span>
                                        <span>{device.specs.condition}</span>
                                    </p>
                                </div>
                                <div className="text-gray-300 dark:text-gray-600">
                                    <ChevronRightIcon className="w-4 h-4" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default DevicesCard;
