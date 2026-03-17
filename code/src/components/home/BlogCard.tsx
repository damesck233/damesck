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
    const posts = blogPosts.slice(0, 4);
    const featured = posts[0];
    const topRight = posts[1];
    const bottomRight = posts.slice(2, 4);

    const formatDate = (ts: number) =>
        new Date(ts * 1000).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });

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
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-rose-50/50 dark:from-pink-900/20 dark:to-rose-900/20 z-0 opacity-80" />

            <div className="relative z-10 w-full h-full p-5 flex flex-col gap-3">

                {/* Header — full width */}
                <div className="flex items-center gap-2.5 shrink-0">
                    <motion.div
                        layoutId={`${layoutId}-icon-box`}
                        className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/20 shrink-0"
                    >
                        <DocumentTextIcon className="w-[18px] h-[18px]" />
                    </motion.div>
                    <div>
                        <motion.h3
                            layoutId={`${layoutId}-title`}
                            className="text-base font-bold text-[#1d1d1f] dark:text-white leading-none"
                        >
                            My Blog
                        </motion.h3>
                        <motion.p
                            layoutId={`${layoutId}-subtitle`}
                            className="text-[10px] text-[#1d1d1f]/50 dark:text-white/50 font-medium uppercase tracking-wider mt-0.5"
                        >
                            Updates & Tutorials
                        </motion.p>
                    </div>
                    {!loading && (
                        <div className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/50 dark:bg-black/20 border border-white/20 dark:border-white/10 backdrop-blur-sm shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                            <span className="text-[11px] font-medium text-[#1d1d1f]/70 dark:text-gray-300">
                                {blogPosts.length} 篇
                            </span>
                        </div>
                    )}
                </div>

                {/* Content row */}
                <div className="flex-1 flex flex-col md:flex-row gap-3 min-h-0">

                {/* Left: Featured Post */}
                <div className="md:w-[45%] flex flex-col gap-3 shrink-0">

                    {/* Featured Post */}
                    {loading ? (
                        <div className="flex-1 bg-white/30 dark:bg-white/5 rounded-2xl animate-pulse" />
                    ) : featured ? (
                        <div className="flex-1 flex flex-col justify-between p-4 rounded-2xl bg-white/50 dark:bg-black/20 border border-white/40 dark:border-white/5 backdrop-blur-sm hover:bg-white/70 dark:hover:bg-white/5 transition-colors group/feat">
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-bold text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-100 dark:border-pink-500/20 self-start">
                                    {featured.categories?.[0]?.name || '文章'}
                                </span>
                                <h4 className="text-[15px] font-bold text-[#1d1d1f] dark:text-white leading-snug line-clamp-2 group-hover/feat:text-pink-600 dark:group-hover/feat:text-pink-400 transition-colors">
                                    {featured.title}
                                </h4>
                                {featured.summary && (
                                    <p className="text-[11px] text-[#1d1d1f]/50 dark:text-white/40 leading-relaxed line-clamp-2">
                                        {featured.summary}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-[#1d1d1f]/40 dark:text-white/30">
                                        {formatDate(featured.created)}
                                    </span>
                                    {featured.readTime && (
                                        <>
                                            <span className="w-0.5 h-0.5 rounded-full bg-[#1d1d1f]/20 dark:bg-white/20" />
                                            <span className="text-[10px] text-[#1d1d1f]/40 dark:text-white/30">
                                                {featured.readTime}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <ChevronRightIcon className="w-4 h-4 text-pink-400/60 dark:text-pink-400/40 group-hover/feat:text-pink-500 transition-colors" />
                            </div>
                        </div>
                    ) : null}
                </div>

                {/* Right: Top post + Bottom two posts */}
                <div className="flex-1 flex flex-col gap-3 min-h-0">

                    {/* Top post */}
                    {loading ? (
                        <div className="flex-1 bg-white/30 dark:bg-white/5 rounded-2xl animate-pulse" />
                    ) : topRight ? (
                        <div className="flex-1 flex flex-col justify-between p-4 rounded-2xl bg-white/40 dark:bg-black/20 border border-white/40 dark:border-white/5 backdrop-blur-sm hover:bg-white/60 dark:hover:bg-white/10 transition-colors group/top">
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-semibold text-[#007aff] dark:text-blue-400 self-start">
                                    {topRight.categories?.[0]?.name || '文章'}
                                </span>
                                <h4 className="text-sm font-semibold text-[#1d1d1f] dark:text-white leading-snug line-clamp-1 group-hover/top:text-pink-600 dark:group-hover/top:text-pink-400 transition-colors">
                                    {topRight.title}
                                </h4>
                                {topRight.summary && (
                                    <p className="text-[10px] text-[#1d1d1f]/45 dark:text-white/35 leading-relaxed line-clamp-1">
                                        {topRight.summary}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-[#1d1d1f]/40 dark:text-white/30">
                                        {formatDate(topRight.created)}
                                    </span>
                                    {topRight.readTime && (
                                        <>
                                            <span className="w-0.5 h-0.5 rounded-full bg-[#1d1d1f]/20 dark:bg-white/20" />
                                            <span className="text-[10px] text-[#1d1d1f]/40 dark:text-white/30">{topRight.readTime}</span>
                                        </>
                                    )}
                                </div>
                                <ChevronRightIcon className="w-3.5 h-3.5 text-[#1d1d1f]/20 dark:text-white/20 group-hover/top:text-pink-400 transition-colors" />
                            </div>
                        </div>
                    ) : null}

                    {/* Bottom two posts */}
                    <div className="flex-1 flex gap-3">
                        {loading ? (
                            <>
                                <div className="flex-1 bg-white/30 dark:bg-white/5 rounded-2xl animate-pulse" />
                                <div className="flex-1 bg-white/30 dark:bg-white/5 rounded-2xl animate-pulse" />
                            </>
                        ) : bottomRight.length > 0 ? (
                            bottomRight.map((post) => (
                                <div
                                    key={post.cid}
                                    className="flex-1 flex flex-col justify-between p-3.5 rounded-2xl bg-white/40 dark:bg-black/20 border border-white/40 dark:border-white/5 backdrop-blur-sm hover:bg-white/60 dark:hover:bg-white/10 transition-colors group/bot min-w-0"
                                >
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-semibold text-[#007aff] dark:text-blue-400 truncate">
                                            {post.categories?.[0]?.name || '文章'}
                                        </span>
                                        <h4 className="text-xs font-semibold text-[#1d1d1f] dark:text-white leading-snug line-clamp-2 group-hover/bot:text-pink-600 dark:group-hover/bot:text-pink-400 transition-colors">
                                            {post.title}
                                        </h4>
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <span className="text-[10px] text-[#1d1d1f]/40 dark:text-white/30">
                                            {formatDate(post.created)}
                                        </span>
                                        {post.readTime && (
                                            <>
                                                <span className="w-0.5 h-0.5 rounded-full bg-[#1d1d1f]/20 dark:bg-white/20" />
                                                <span className="text-[10px] text-[#1d1d1f]/40 dark:text-white/30">{post.readTime}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : null}
                    </div>

                </div>

                </div>{/* end content row */}
            </div>
        </motion.div>
    );
};

export default BlogCard;
