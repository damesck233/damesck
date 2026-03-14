import { motion } from 'framer-motion';
import { DocumentTextIcon, ArrowRightIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { BlogPost, ApiError } from '../../types';

interface BlogCardProps {
    blogPosts: BlogPost[];
    loading: boolean;
    apiError: ApiError | null;
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    hidden?: boolean;
    layoutId?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
    blogPosts,
    loading,
    apiError,
    onClick,
    onMouseEnter,
    onMouseLeave,
    hidden = false,
    layoutId
}) => {
    const latestPosts = blogPosts.slice(0, 3);
    const featuredPost = latestPosts[0];
    const otherPosts = latestPosts.slice(1, 3);

    return (
        <motion.div
            layoutId={layoutId}
            className={`md:col-span-3 cursor-pointer group relative z-10 overflow-hidden rounded-[32px] bg-white/40 dark:bg-[#1c1c1e]/60 backdrop-blur-xl border border-white/20 dark:border-white/5 ${hidden ? 'pointer-events-none' : ''} h-auto md:h-[320px]`}
            animate={{ opacity: hidden ? 0 : 1 }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 250, damping: 25, mass: 1.0 }}
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50/40 via-transparent to-rose-50/40 dark:from-pink-900/10 dark:to-transparent pointer-events-none z-0" />

            <div className="flex flex-col md:flex-row h-full p-6 gap-6 relative z-10">

                {/* Left: Featured Post (40%) */}
                <div className="w-full md:flex-[2] flex flex-col relative group/featured">
                    {loading ? (
                        <div className="flex-1 bg-white/30 dark:bg-white/5 rounded-2xl animate-pulse"></div>
                    ) : featuredPost ? (
                        <div className="flex-1 bg-white/50 dark:bg-white/5 rounded-2xl p-5 border border-white/40 dark:border-white/5 flex flex-col justify-between hover:bg-white/70 dark:hover:bg-white/10 transition-colors duration-300">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-0.5 rounded-full bg-pink-50 dark:bg-pink-500/10 text-[10px] font-bold text-pink-600 dark:text-pink-400 border border-pink-100 dark:border-pink-500/20">
                                        {featuredPost.categories?.[0]?.name || 'FEATURED'}
                                    </span>
                                    <span className="text-[10px] text-[#1d1d1f]/40 dark:text-white/40 font-mono">{featuredPost.date}</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-[#1d1d1f] dark:text-white leading-tight mb-3 line-clamp-3 group-hover/featured:text-pink-600 dark:group-hover/featured:text-pink-400 transition-colors">
                                    {featuredPost.title}
                                </h3>
                                <p className="text-sm text-[#1d1d1f]/60 dark:text-white/60 line-clamp-3 hidden md:block leading-relaxed">
                                    {featuredPost.summary}
                                </p>
                            </div>

                            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#007aff] dark:text-blue-400 group-hover/featured:gap-2.5 transition-all mt-auto">
                                阅读文章 <ArrowRightIcon className="w-3 h-3" />
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-[#1d1d1f]/40 dark:text-white/40 text-sm">暂无文章</div>
                    )}
                </div>

                {/* Right: List & Header (60%) */}
                <div className="w-full md:flex-[3] flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 pb-2">
                        <div className="flex items-center">
                            <motion.div
                                layoutId={`${layoutId}-icon-box`}
                                className="w-10 h-10 rounded-xl bg-white/50 dark:bg-white/10 flex items-center justify-center shadow-sm backdrop-blur-md border border-white/30 dark:border-white/5"
                            >
                                <DocumentTextIcon className="w-5 h-5 text-pink-500 dark:text-pink-400" />
                            </motion.div>
                            <div className="ml-3">
                                <motion.h4
                                    layoutId={`${layoutId}-title`}
                                    className="text-[20px] font-bold text-[#1d1d1f] dark:text-white leading-none"
                                >
                                    My Blog
                                </motion.h4>
                                <motion.p
                                    layoutId={`${layoutId}-subtitle`}
                                    className="text-[13px] text-[#1d1d1f]/60 dark:text-white/60 font-medium mt-1"
                                >
                                    Updates & Tutorials
                                </motion.p>
                            </div>
                        </div>
                        <div className="flex items-center hover:bg-black/5 dark:hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors">
                            <span className="text-xs font-semibold text-[#1d1d1f]/50 dark:text-white/50 mr-1">全部</span>
                            <ChevronRightIcon className="w-3 h-3 text-[#1d1d1f]/40 dark:text-white/40" />
                        </div>
                    </div>

                    {/* List */}
                    <div className="flex-1 flex flex-col gap-3">
                        {loading ? (
                            <>
                                <div className="flex-1 bg-white/30 dark:bg-white/5 rounded-xl animate-pulse"></div>
                                <div className="flex-1 bg-white/30 dark:bg-white/5 rounded-xl animate-pulse"></div>
                            </>
                        ) : otherPosts.length > 0 ? (
                            otherPosts.map((post) => (
                                <div
                                    key={post.cid}
                                    className="flex-1 flex items-center p-3 rounded-xl bg-white/30 dark:bg-white/5 border border-white/20 dark:border-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors duration-200 group/item"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white/60 dark:bg-white/5 flex flex-col items-center justify-center mr-4 shrink-0 border border-white/30 dark:border-white/5">
                                        <span className="text-sm font-bold text-pink-500 dark:text-pink-400 leading-none">
                                            {new Date(post.created * 1000).getDate()}
                                        </span>
                                        <span className="text-[9px] font-semibold text-[#1d1d1f]/40 dark:text-white/40 uppercase tracking-wide">
                                            {new Date(post.created * 1000).toLocaleString('en-US', { month: 'short' })}
                                        </span>
                                    </div>

                                    <div className="flex-1 min-w-0 pr-3">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-[9px] font-bold text-[#007aff] dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-100 dark:border-blue-500/20">
                                                {post.categories?.[0]?.name}
                                            </span>
                                        </div>
                                        <h5 className="text-sm font-bold text-[#1d1d1f] dark:text-white truncate group-hover/item:text-pink-600 dark:group-hover/item:text-pink-400 transition-colors">
                                            {post.title}
                                        </h5>
                                    </div>

                                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[#1d1d1f]/20 dark:text-white/20 group-hover/item:text-pink-500 group-hover/item:bg-pink-50 dark:group-hover/item:bg-pink-500/10 transition-all duration-200 flex-shrink-0">
                                        <ArrowRightIcon className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-sm text-[#1d1d1f]/40 dark:text-white/40">
                                更多文章即将发布
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BlogCard;
