import { motion } from 'framer-motion';
import { DocumentTextIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
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
    onClick,
    onMouseEnter,
    onMouseLeave,
    hidden = false,
    layoutId
}) => {
    const latestPosts = blogPosts.slice(0, 3);

    return (
        <motion.div
            layoutId={layoutId}
            className={`md:col-span-3 cursor-pointer group relative z-10 overflow-hidden rounded-[32px] duration-200 aspect-auto md:h-[320px] bg-white/40 dark:bg-[#1c1c1e]/60 backdrop-blur-xl transition-colors duration-300 ${hidden ? 'pointer-events-none' : ''}`}
            animate={{ opacity: hidden ? 0 : 1 }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 250, damping: 25, mass: 1.0 }}
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-rose-50/50 dark:from-pink-900/20 dark:to-rose-900/20 z-0 opacity-80" />

            {/* Content */}
            <div className="relative z-10 w-full h-full p-6 flex flex-col md:flex-row gap-6">

                {/* Left: Header & Info */}
                <div className="md:w-[28%] flex flex-col justify-between">
                    <div>
                        <motion.div
                            layoutId={`${layoutId}-icon-box`}
                            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/20 mb-4"
                        >
                            <DocumentTextIcon className="w-6 h-6" />
                        </motion.div>

                        <div className="mb-1">
                            <motion.h3
                                layoutId={`${layoutId}-title`}
                                className="text-2xl font-bold text-[#1d1d1f] dark:text-white leading-none"
                            >
                                My Blog
                            </motion.h3>
                        </div>
                        <motion.p
                            layoutId={`${layoutId}-subtitle`}
                            className="text-xs text-[#1d1d1f]/60 dark:text-white/60 font-medium uppercase tracking-wider"
                        >
                            Updates & Tutorials
                        </motion.p>
                    </div>

                    <div className="mt-4 md:mt-0">
                        {!loading && (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-black/20 border border-white/20 dark:border-white/10 backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                                <span className="text-xs font-medium text-[#1d1d1f]/70 dark:text-gray-300">
                                    {blogPosts.length} 篇文章
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Post List */}
                <div className="flex-1 flex flex-col justify-center min-w-0">
                    <div className="grid grid-cols-1 gap-3">
                        {loading ? (
                            <>
                                <div className="h-[60px] bg-white/30 dark:bg-white/5 rounded-2xl animate-pulse" />
                                <div className="h-[60px] bg-white/30 dark:bg-white/5 rounded-2xl animate-pulse" />
                                <div className="h-[60px] bg-white/30 dark:bg-white/5 rounded-2xl animate-pulse" />
                            </>
                        ) : latestPosts.length > 0 ? (
                            latestPosts.map((post) => (
                                <div
                                    key={post.cid}
                                    className="flex items-center gap-4 p-3 rounded-2xl bg-white/40 dark:bg-black/20 border border-white/40 dark:border-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors backdrop-blur-sm group/item"
                                >
                                    {/* Date box */}
                                    <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-500/10 flex flex-col items-center justify-center shrink-0 border border-pink-100 dark:border-pink-500/20">
                                        <span className="text-sm font-bold text-pink-500 dark:text-pink-400 leading-none">
                                            {new Date(post.created * 1000).getDate()}
                                        </span>
                                        <span className="text-[9px] font-semibold text-pink-400/60 uppercase tracking-tight">
                                            {new Date(post.created * 1000).toLocaleString('en-US', { month: 'short' })}
                                        </span>
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <span className="text-[9px] font-bold text-[#007aff] dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-100 dark:border-blue-500/20 inline-block mb-0.5">
                                            {post.categories?.[0]?.name || '文章'}
                                        </span>
                                        <h4 className="text-sm font-semibold text-[#1d1d1f] dark:text-white truncate group-hover/item:text-pink-600 dark:group-hover/item:text-pink-400 transition-colors">
                                            {post.title}
                                        </h4>
                                    </div>

                                    <ChevronRightIcon className="w-4 h-4 text-[#1d1d1f]/20 dark:text-white/20 group-hover/item:text-pink-500 dark:group-hover/item:text-pink-400 transition-colors flex-shrink-0" />
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-sm text-[#1d1d1f]/40 dark:text-white/40 py-8">
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
