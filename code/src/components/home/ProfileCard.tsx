import { motion } from 'framer-motion';
import myData from '../../data/my/data.json';
import InteractiveCard from './InteractiveCard';
const { personalInfo } = myData;

interface ProfileCardProps {
    onClick: () => void;
    layoutId?: string;
    hidden?: boolean;
    closing?: boolean;
    index?: number;
}

const ProfileCard = ({ onClick, layoutId, hidden = false, closing = false, index = 0 }: ProfileCardProps) => {
    return (
        <InteractiveCard
            index={index}
            className="aspect-square"
            layoutId={layoutId}
            hidden={hidden}
            closing={closing}
            onClick={onClick}
        >
            {/* Gradient Overlay for Pink Glassmorphism tint */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FCE7F3]/80 to-[#FBCFE8]/80 dark:from-pink-500/10 dark:to-rose-600/5 z-0"></div>

            {/* Cloud Decorations (White Circles) */}
            <div className="absolute top-[-50px] left-[-50px] z-0 pointer-events-none opacity-60 dark:opacity-20">
                <div className="w-64 h-64 bg-white/40 dark:bg-pink-300/10 rounded-full blur-[2px] absolute top-10 left-10"></div>
                <div className="w-48 h-48 bg-white/30 dark:bg-white/5 rounded-full blur-[2px] absolute top-[-10px] left-[80px]"></div>
                <div className="w-40 h-40 bg-white/20 dark:bg-white/5 rounded-full blur-[2px] absolute top-[80px] left-[-20px]"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between p-7">

                {/* Avatar Section */}
                <div className="relative mt-4">
                    {/* Ring/Halo effect around avatar to match the 'cloud' look */}
                    <div className="w-32 h-32 rounded-full bg-white/50 dark:bg-pink-400/15 absolute -top-2 -left-2 blur-sm transition-colors duration-300"></div>
                    {/* 头像与模态框侧栏共享 layoutId，展开时连贯 morph 过去 */}
                    <motion.div
                        layoutId={layoutId ? `${layoutId}-avatar` : undefined}
                        className="w-28 h-28 rounded-full shadow-lg overflow-hidden relative z-10 transition-colors duration-300"
                    >
                        <img src={personalInfo.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    </motion.div>
                </div>

                {/* Text Info */}
                <div className="flex flex-col items-start gap-0.5 mb-1 text-[#1d1d1f] dark:text-white transition-colors duration-300">
                    <motion.h2
                        layoutId={layoutId ? `${layoutId}-name` : undefined}
                        className="text-[32px] font-bold tracking-tight leading-none mb-1"
                    >
                        {personalInfo.name}
                    </motion.h2>
                    <motion.p
                        layoutId={layoutId ? `${layoutId}-email` : undefined}
                        className="text-[15px] text-[#1d1d1f]/60 dark:text-white/60 font-medium"
                    >
                        {personalInfo.email}
                    </motion.p>
                    <div className="mt-3 text-[14px] font-bold flex items-center gap-1">
                        致不完美的明天<span className="text-[16px] relative -top-[1px]">_</span>
                    </div>
                </div>
            </div>

            {/* Subtle Shine/Reflection */}
            <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-white/20 dark:from-transparent to-transparent pointer-events-none rounded-tr-[32px]"></div>
        </InteractiveCard>
    );
};

export default ProfileCard;
