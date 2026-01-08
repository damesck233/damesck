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
}

const BlogCard: React.FC<BlogCardProps> = ({
    blogPosts,
    loading,
    apiError,
    onClick,
    onMouseEnter,
    onMouseLeave,
    hidden = false
}) => {
    // Get latest 3 posts
    const latestPosts = blogPosts.slice(0, 3);
    const featuredPost = latestPosts[0];
    const otherPosts = latestPosts.slice(1, 3);

    return (
        <motion.div
            className={`md:col-span-3 cursor-pointer group relative z-10 overflow-hidden rounded-[32px] bg-white/40 dark:bg-[#1c1c1e]/60 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/5 border border-white/20 dark:border-white/5 ${hidden ? 'pointer-events-none opacity-0' : ''}`}
            style={{ height: '320px' }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            whileHover={{ scale: 1.005, y: -2 }}
            whileTap={{ scale: 0.995 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50/40 via-transparent to-rose-50/40 dark:from-pink-900/10 dark:to-transparent pointer-events-none" />

            <div className="flex h-full p-6 gap-6 relative z-10">

                {/* Left: Featured Post (40%) */}
                <div className="flex-[2] flex flex-col relative group/featured">
                    {loading ? (
                        <div className="flex-1 bg-white/30 dark:bg-white/5 rounded-2xl animate-pulse"></div>
                    ) : featuredPost ? (
                        <div className="flex-1 bg-white/50 dark:bg-white/5 rounded-2xl p-5 border border-white/40 dark:border-white/5 flex flex-col justify-between hover:bg-white/80 dark:hover:bg-white/10 transition-colors duration-300">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-0.5 rounded-md bg-pink-100 dark:bg-pink-500/20 text-[10px] font-bold text-pink-600 dark:text-pink-400">
                                        {featuredPost.categories?.[0]?.name || 'FEATURED'}
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-mono">{featuredPost.date}</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-3 line-clamp-3 group-hover/featured:text-pink-600 transition-colors">
                                    {featuredPost.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 hidden md:block">
                                    {featuredPost.summary}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 group-hover/featured:text-pink-500 transition-colors mt-auto">
                                Read Article <ArrowRightIcon className="w-3 h-3" />
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-400">No posts</div>
                    )}
                </div>

                {/* Right: List & Header (60%) */}
                <div className="flex-[3] flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 pb-2">
                        <div className="flex items-center gap-3">
                            {/* Icon Box - Shared Layout ID for Morphing into Sidebar Ident */}
                            <div
                                className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-600"
                            >
                                <DocumentTextIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white leading-none">Latest Articles</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Updates & Tutorials</p>
                            </div>
                        </div>
                        <div className="flex items-center hover:bg-black/5 dark:hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors">
                            <span className="text-xs font-bold text-gray-500 dark:text-gray-300 mr-1">View All</span>
                            <ChevronRightIcon className="w-3 h-3 text-gray-400" />
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
                                    className="flex-1 flex items-center p-3 rounded-xl bg-white/30 dark:bg-white/5 border border-white/20 dark:border-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors group/item"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-gray-50 dark:bg-white/5 flex flex-col items-center justify-center text-[10px] font-bold text-gray-400 mr-4 shrink-0">
                                        <span className="text-pink-500">{new Date(post.created * 1000).getDate()}</span>
                                        <span className="uppercase">{new Date(post.created * 1000).toLocaleString('en-US', { month: 'short' })}</span>
                                    </div>

                                    <div className="flex-1 min-w-0 pr-4">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide border border-gray-200 dark:border-white/10 px-1 rounded-sm">
                                                {post.categories?.[0]?.name}
                                            </span>
                                        </div>
                                        <h5 className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate group-hover/item:text-pink-600 transition-colors">
                                            {post.title}
                                        </h5>
                                    </div>

                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 group-hover/item:text-pink-500 group-hover/item:bg-white transition-all">
                                        <ArrowRightIcon className="w-4 h-4" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-xs text-gray-400">
                                More articles coming soon
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BlogCard;
