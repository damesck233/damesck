import { motion } from 'framer-motion';
import personalInfo from '../../data/cards/personalInfo.json';

interface ProfileCardProps {
    onClick: () => void;
    layoutId?: string;
    hidden?: boolean;
}

const ProfileCard = ({ onClick, layoutId = 'profile-card', hidden = false }: ProfileCardProps) => {
    return (
        <motion.div
            layoutId={layoutId} // 启用布局动画，实现无缝过渡
            className={`aspect-square cursor-pointer group relative z-10 overflow-hidden rounded-[32px] duration-200 ${hidden ? 'pointer-events-none' : ''}`}
            style={{ opacity: hidden ? 0 : 1 }}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
        >
            {/* Background - Glassmorphism Restored */}
            <div className="absolute inset-0 bg-white/40 dark:bg-[#1c1c1e]/40 backdrop-blur-xl z-0 transition-colors duration-300"></div>

            {/* Gradient Overlay for Pink Glassmorphism tint */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FCE7F3]/80 to-[#FBCFE8]/80 dark:from-[#EC4899]/20 dark:to-[#DB2777]/20 z-0"></div>

            {/* Cloud Decorations (White Circles) */}
            <div className="absolute top-[-50px] left-[-50px] z-0 pointer-events-none opacity-60">
                <div className="w-64 h-64 bg-white/40 rounded-full blur-[2px] absolute top-10 left-10"></div>
                <div className="w-48 h-48 bg-white/30 rounded-full blur-[2px] absolute top-[-10px] left-[80px]"></div>
                <div className="w-40 h-40 bg-white/20 rounded-full blur-[2px] absolute top-[80px] left-[-20px]"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between p-7">

                {/* Avatar Section */}
                <div className="relative mt-4 ml-2">
                    {/* Ring/Halo effect around avatar to match the 'cloud' look */}
                    <div className="w-28 h-28 rounded-full bg-white/50 absolute -top-2 -left-2 blur-sm"></div>
                    <div className="w-24 h-24 rounded-full border-[4px] border-white shadow-lg overflow-hidden relative z-10 bg-white">
                        <img src={personalInfo.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Text Info */}
                <div className="flex flex-col items-start gap-0.5 mb-1">
                    <h2 className="text-[32px] font-bold text-[#1d1d1f] tracking-tight leading-none mb-1">
                        {personalInfo.name}
                    </h2>
                    <p className="text-[15px] text-[#1d1d1f]/60 font-medium">
                        {personalInfo.email}
                    </p>
                    <div className="mt-3 text-[14px] font-bold text-[#1d1d1f] flex items-center gap-1">
                        iCloud<span className="text-[16px] relative -top-[1px]">+</span>
                    </div>
                </div>
            </div>

            {/* Subtle Shine/Reflection */}
            <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-white/20 to-transparent pointer-events-none rounded-tr-[32px]"></div>

        </motion.div>
    );
};

export default ProfileCard;
