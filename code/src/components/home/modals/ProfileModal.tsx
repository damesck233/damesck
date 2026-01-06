import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ChatBubbleLeftRightIcon, MinusIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { AppleStyleIcon } from '../../ui/AppleIcons';
import myData from '../../../data/my/data.json';
import { useEffect } from 'react';
import { useScrollLock } from '../../../hooks/useScrollLock';

const { personalInfo, socialLinks } = myData;

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    layoutId?: string;
}

interface SocialLink {
    name: string;
    url: string;
    icon: string;
}

// 社交图标获取辅助函数
const getSocialIcon = (iconName: string) => {
    const commonProps = { className: "w-6 h-6", viewBox: "0 0 24 24", fill: "currentColor" };

    if (iconName === 'book') return (
        <svg {...commonProps}><path d="M6 2C4.9 2 4 2.9 4 4v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6H6z" /></svg>
    );
    if (iconName === 'github') return (
        <svg {...commonProps}><path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
    );
    if (iconName === 'chat') return (
        <svg {...commonProps}><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>
    );
    return <svg {...commonProps}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 0 4 4.5v15ZM6.5 4H20v11H6.5a4.5 4.5 0 0 0-1.5.26V4.5A.5.5 0 0 1 6.5 4Z" /></svg>;
};

const ProfileModal = ({ isOpen, onClose, layoutId = 'profile-card' }: ProfileModalProps) => {
    // 锁定背景滚动
    // Use custom hook for scroll locking with layout shift prevention
    const { lockScroll, unlockScroll } = useScrollLock();

    useEffect(() => {
        if (isOpen) {
            lockScroll();
        } else {
            unlockScroll();
        }
        return () => {
            unlockScroll();
        };
    }, [isOpen, lockScroll, unlockScroll]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* 背景遮罩 */}
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
                            layoutId={layoutId}
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
                            {/* Left Sidebar (Floating Look) */}
                            <div className="w-full md:w-[300px] flex-shrink-0 bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-[24px] shadow-sm flex flex-col relative overflow-hidden border-b md:border-b-0 md:border-r border-[#FEF9F1] dark:border-white/5 z-20">
                                {/* Header - Mac Traffic Lights (Inside Sidebar) */}
                                <div className="flex-shrink-0 h-[44px] md:h-[60px] flex items-center justify-between px-5">
                                    <div className="flex items-center gap-2.5">
                                        <button
                                            onClick={onClose}
                                            className="w-4 h-4 rounded-full bg-[#ff5f56] border-[0.5px] border-[#e0443e] hover:brightness-90 transition-all flex items-center justify-center group"
                                            aria-label="Close"
                                        >
                                            <XMarkIcon className="w-2.5 h-2.5 text-black/50 opacity-0 group-hover:opacity-100" />
                                        </button>
                                        <button
                                            onClick={onClose}
                                            className="w-4 h-4 rounded-full bg-[#ffbd2e] border-[0.5px] border-[#dea123] hover:brightness-90 transition-all flex items-center justify-center group"
                                            aria-label="Minimize"
                                        >
                                            <MinusIcon className="w-2.5 h-2.5 text-black/50 opacity-0 group-hover:opacity-100" />
                                        </button>
                                        <a
                                            href="https://me.damesck.net"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-4 h-4 rounded-full bg-[#27c93f] border-[0.5px] border-[#1aab29] hover:brightness-90 transition-all flex items-center justify-center group"
                                            aria-label="Maximize"
                                        >
                                            <ArrowTopRightOnSquareIcon className="w-2.5 h-2.5 text-black/50 opacity-0 group-hover:opacity-100" />
                                        </a>
                                    </div>
                                </div>

                                {/* Sidebar Content: Avatar & Socials */}
                                <motion.div
                                    className="flex-1 overflow-y-auto px-5 pb-5 md:px-6 md:pb-6 flex flex-col items-start"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.4 }}
                                >
                                    <div className="flex flex-row md:flex-col items-center md:items-start w-full gap-5 md:gap-0 mb-6 md:mb-0">
                                        <div className="w-16 h-16 md:w-32 md:h-32 flex-shrink-0 relative md:mt-4 md:mb-5">
                                            <div className="w-full h-full rounded-full overflow-hidden shadow-lg">
                                                <img src={personalInfo.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="absolute bottom-1 right-1 w-3.5 h-3.5 md:w-6 md:h-6 bg-[#34c759] rounded-full border-[2px] md:border-[3px] border-white dark:border-[#2c2c2e] z-10"></div>
                                        </div>

                                        <div className="flex flex-col">
                                            <h2 className="text-xl md:text-2xl font-bold text-[#1d1d1f] dark:text-white mb-0.5 md:mb-1">{personalInfo.name}</h2>
                                            <p className="text-[#86868b] dark:text-[#98989d] text-[13px] md:text-[14px] font-medium md:mb-6">{personalInfo.email}</p>
                                        </div>
                                    </div>



                                    <div className="w-full grid grid-cols-3 gap-3 md:flex md:flex-col md:space-y-3">
                                        {socialLinks.map((link: SocialLink, idx: number) => (
                                            <a
                                                key={idx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-1.5 md:gap-3 p-2 md:p-3 rounded-2xl bg-white/50 dark:bg-[#3a3a3c]/50 hover:bg-white dark:hover:bg-[#48484a] transition-all shadow-sm group"
                                            >
                                                <div className={`w-8 h-8 md:w-8 md:h-8 rounded-[10px] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105
                        ${idx === 0 ? 'bg-[#007aff]' : idx === 1 ? 'bg-[#ff2d55]' : 'bg-[#34c759]'}`}>
                                                    {getSocialIcon(link.icon)}
                                                </div>
                                                <div className="flex-1 min-w-0 flex justify-center md:justify-start">
                                                    <div className="text-[10px] md:text-[14px] font-semibold text-[#1d1d1f] dark:text-white truncate text-center md:text-left leading-tight">{link.name}</div>
                                                </div>
                                            </a>
                                        ))}
                                    </div>

                                    <div className="flex-1"></div>

                                    {/* Footer */}
                                    <div className="mt-8 text-center text-[#86868b] text-[12px] opacity-60">
                                        Designed by damesck<br />with Apple aesthetic
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right Content Area */}
                            <div className="flex-1 h-full overflow-y-auto overflow-x-hidden p-6 md:p-8">
                                <div className="space-y-6 max-w-[800px] mx-auto">

                                    {/* About Me */}
                                    <motion.div
                                        className="bg-white dark:bg-[#2c2c2e] rounded-[24px] p-8 shadow-sm border border-black/5 dark:border-white/5"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <h3 className="text-[20px] font-bold text-[#1d1d1f] dark:text-white mb-4 flex items-center gap-2">
                                            <span className="text-[#007aff]"></span> {myData.about.title}
                                        </h3>
                                        <p className="text-[16px] leading-relaxed text-[#1d1d1f]/80 dark:text-white/80 font-normal">
                                            {myData.about.description}
                                        </p>
                                    </motion.div>

                                    {/* Contributions & Positions */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <motion.div
                                            className="bg-[#fff9f0] dark:bg-[#2c2c2e] rounded-[24px] p-6 border border-orange-100 dark:border-white/5"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <h4 className="text-[17px] font-bold text-[#ff9500] mb-4 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-[#ff9500]"></div> Contributions
                                            </h4>
                                            <ul className="space-y-4">
                                                {myData.contributions.map((item, i) => (
                                                    <li key={i} className="flex gap-3 items-start">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#ff9500] mt-2 flex-shrink-0 opacity-60"></div>
                                                        <span className="text-[15px] text-[#1d1d1f] dark:text-white/90">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>

                                        <motion.div
                                            className="bg-[#f0f9ff] dark:bg-[#2c2c2e] rounded-[24px] p-6 border border-blue-100 dark:border-white/5"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <h4 className="text-[17px] font-bold text-[#007aff] mb-4 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-[#007aff]"></div> Positions
                                            </h4>
                                            <ul className="space-y-4">
                                                {myData.positions.map((item, i) => (
                                                    <li key={i} className="flex gap-3 items-start">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#007aff] mt-2 flex-shrink-0 opacity-60"></div>
                                                        <span className="text-[15px] text-[#1d1d1f] dark:text-white/90">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    </div>

                                    {/* Interests */}
                                    <motion.div
                                        className="bg-white dark:bg-[#2c2c2e] rounded-[24px] p-6 border border-black/5 dark:border-white/5"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <h4 className="text-[17px] font-bold text-[#af52de] mb-4 flex items-center gap-2">
                                            Interest
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {myData.interests.map((tag, i) => (
                                                <span key={i} className="px-4 py-1.5 rounded-full bg-[#af52de]/10 text-[#af52de] text-[14px] font-medium hover:bg-[#af52de]/20 transition-colors cursor-default">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>

                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )
            }
        </AnimatePresence >
    );
};

export default ProfileModal;
