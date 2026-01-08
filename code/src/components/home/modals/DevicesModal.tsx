import { motion, AnimatePresence } from 'framer-motion';
import {
    XMarkIcon,
    MinusIcon,
    ArrowTopRightOnSquareIcon,
    ComputerDesktopIcon,
    DevicePhoneMobileIcon,
    DeviceTabletIcon,
    CpuChipIcon
} from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { useScrollLock } from '../../../hooks/useScrollLock';
import { Device } from '../DevicesCard';

interface DevicesModalProps {
    isOpen: boolean;
    onClose: () => void;
    devices: Device[];
    layoutId?: string;
}

const DevicesModal: React.FC<DevicesModalProps> = ({
    isOpen,
    onClose,
    devices,
    layoutId
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

    const getDeviceIcon = (name: string) => {
        if (name.includes('Mac') || name.includes('PC')) return <ComputerDesktopIcon className="w-8 h-8 text-gray-500" />;
        if (name.includes('iPhone') || name.includes('Android')) return <DevicePhoneMobileIcon className="w-8 h-8 text-gray-500" />;
        if (name.includes('iPad') || name.includes('Tablet')) return <DeviceTabletIcon className="w-8 h-8 text-gray-500" />;
        return <CpuChipIcon className="w-8 h-8 text-gray-500" />;
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
                            layoutId={layoutId} // Shared layout ID
                            initial={!layoutId ? { opacity: 0, scale: 0.95 } : undefined}
                            animate={!layoutId ? { opacity: 1, scale: 1 } : undefined}
                            exit={!layoutId ? { opacity: 0, scale: 0.95 } : undefined}
                            className="w-full md:max-w-[1000px] h-[90vh] md:h-[750px] bg-white/95 dark:bg-[#1c1c1e]/95 backdrop-blur-2xl rounded-[32px] shadow-2xl overflow-y-auto md:overflow-hidden pointer-events-auto flex flex-col md:flex-row relative p-2"
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
                            <div className="w-full md:w-[320px] flex-shrink-0 bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-[24px] shadow-sm flex flex-col relative overflow-visible md:overflow-hidden border-b md:border-b-0 md:border-r border-[#FEF9F1] dark:border-white/5 z-20">

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
                                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white shadow-lg mb-4"
                                        >
                                            <motion.div layoutId={`${layoutId}-icon`}>
                                                <ComputerDesktopIcon className="w-8 h-8" />
                                            </motion.div>
                                        </motion.div>
                                        <motion.h2
                                            layoutId={`${layoutId}-title`}
                                            className="text-2xl leading-none font-bold text-[#1d1d1f] dark:text-white mb-1"
                                        >
                                            我的设备
                                        </motion.h2>
                                        <motion.p
                                            layoutId={`${layoutId}-subtitle`}
                                            className="text-[#86868b] dark:text-gray-400 text-sm"
                                        >
                                            Digital Arsenal
                                        </motion.p>
                                    </div>

                                    {/* Stats */}
                                    <motion.div
                                        className="mt-auto"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                                        transition={{ delay: 0.2, duration: 0.3 }}
                                    >
                                        <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/5 backdrop-blur-sm">
                                            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-2">Total Value</div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white italic">
                                                "工欲善其事，必先利其器"
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Main Content Area: Device Grid */}
                            <motion.div
                                className="flex-none md:flex-1 h-auto md:h-full overflow-visible md:overflow-y-auto overflow-x-hidden p-6 md:p-8 custom-scrollbar z-10"
                                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                            >
                                <div className="max-w-[800px] mx-auto grid grid-cols-1 gap-6">
                                    {devices && devices.map((device, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + (idx * 0.1) }}
                                            className="bg-white dark:bg-[#2c2c2e] rounded-3xl p-6 shadow-sm border border-black/5 dark:border-white/5 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow duration-300"
                                        >
                                            {/* Image/Icon Area */}
                                            <div className="w-full md:w-32 h-32 rounded-2xl bg-gray-50 dark:bg-black/20 flex items-center justify-center flex-shrink-0">
                                                {/* Placeholder for image, or use icon if no image */}
                                                {device.image.startsWith('http') ? (
                                                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                                        {/* In real app, put img here. For now, icon fallback to avoid broken images if url is fake */}
                                                        {getDeviceIcon(device.name)}
                                                    </div>
                                                ) : (
                                                    getDeviceIcon(device.name)
                                                )}
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 flex flex-col justify-center">
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    {device.tags.map((tag, tIdx) => (
                                                        <span key={tIdx} className="px-2 py-1 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-bold rounded-md uppercase tracking-wide">
                                                            {tag.name}
                                                        </span>
                                                    ))}
                                                </div>
                                                <h3 className="text-xl font-bold text-[#1d1d1f] dark:text-white mb-1">
                                                    {device.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                                    {device.description}
                                                </p>

                                                <div className="flex items-center gap-4 text-xs font-medium text-gray-400 dark:text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                        {device.specs.condition}
                                                    </span>
                                                    <span>Bought: {device.specs.purchaseDate}</span>
                                                    <span>{device.specs.warranty}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
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

export default DevicesModal;
