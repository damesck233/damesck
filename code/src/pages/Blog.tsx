import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import {
    DocumentTextIcon,
    CalendarIcon,
    HashtagIcon,
    EyeIcon,
} from '@heroicons/react/24/outline';
import { useBlogPosts } from '../hooks/useBlogPosts';

const Blog = () => {
    const { blogPosts, loading } = useBlogPosts();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchParams] = useSearchParams();
    const search = searchParams.get('q') || '';

    const categories = useMemo(() => {
        const cats = new Set<string>();
        blogPosts.forEach(p => p.categories?.forEach(c => cats.add(c.name)));
        return ['All', ...Array.from(cats)];
    }, [blogPosts]);

    const filtered = useMemo(() => {
        let posts = blogPosts;
        if (selectedCategory !== 'All') {
            posts = posts.filter(p => p.categories?.some(c => c.name === selectedCategory));
        }
        if (search.trim()) {
            const q = search.toLowerCase();
            posts = posts.filter(p =>
                p.title.toLowerCase().includes(q) || p.summary?.toLowerCase().includes(q)
            );
        }
        return posts;
    }, [blogPosts, selectedCategory, search]);

    const formatDate = (ts: number) =>
        new Date(ts * 1000).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' });

    return (
        <div className="max-w-5xl mx-auto px-4 flex flex-col min-h-[calc(100vh-200px)]">
            {/* Page header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-10"
            >
                <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs font-semibold tracking-wide border border-pink-200/50 dark:border-pink-700/50">
                        MY BLOG
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3 text-[#2c2c2e] dark:text-white tracking-tight">
                    博客
                </h1>
                <p className="text-base md:text-lg text-[#6c6c6e] dark:text-gray-400 max-w-xl leading-relaxed">
                    记录技术探索与日常思考，分享开发过程中的收获与感悟。
                </p>
                {!loading && (
                    <div className="mt-5 flex items-center gap-2 flex-wrap">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                                    selectedCategory === cat
                                        ? 'bg-pink-500 text-white shadow-md shadow-pink-500/30'
                                        : 'bg-white/50 dark:bg-white/5 text-[#6c6c6e] dark:text-gray-400 border border-white/30 dark:border-white/10 hover:bg-white/70 dark:hover:bg-white/10'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100/60 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/50 text-xs text-gray-600 dark:text-gray-400 backdrop-blur-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse"></div>
                            共 {blogPosts.length} 篇文章
                        </div>
                    </div>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-grow space-y-10"
            >
                {/* Section title — only show for search or non-All category */}
                {(search || selectedCategory !== 'All') && (
                    <h2 className="text-[22px] font-bold text-[#1d1d1f] dark:text-white tracking-tight">
                        {search ? `"${search}" 的搜索结果` : selectedCategory}
                    </h2>
                )}

                {/* Post list */}
                {loading ? (
                    <div className="flex flex-col gap-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="animate-pulse p-6 rounded-[18px]"
                                style={{ backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-border)' } as React.CSSProperties}
                            >
                                <div className="h-6 bg-white/40 dark:bg-white/10 rounded-lg w-2/3 mb-4" />
                                <div className="h-4 bg-white/30 dark:bg-white/5 rounded w-full mb-2" />
                                <div className="h-4 bg-white/30 dark:bg-white/5 rounded w-5/6 mb-2" />
                                <div className="h-3 bg-white/20 dark:bg-white/5 rounded w-1/3 mt-5" />
                            </div>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="py-20 text-center text-[#8e8e93] dark:text-gray-500">
                        <DocumentTextIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">没有找到匹配的文章</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <AnimatePresence mode="popLayout">
                            {filtered.map((post, i) => (
                                <motion.div
                                    key={post.cid}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -2, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                                    style={{
                                        backgroundColor: 'var(--glass-bg)',
                                        borderRadius: '18px',
                                        border: '1px solid var(--glass-border)',
                                        backdropFilter: 'blur(12px)',
                                        WebkitBackdropFilter: 'blur(12px)',
                                        willChange: 'transform',
                                    } as React.CSSProperties}
                                >
                                    <Link to={`/blog/${post.slug}`} className="block px-6 py-5">
                                        {/* Title */}
                                        <h3 className="text-lg md:text-xl font-bold text-[#1d1d1f] dark:text-white leading-snug mb-3">
                                            {post.title}
                                        </h3>

                                        {/* Left column (excerpt + meta) + right cover */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 min-w-0 flex flex-col gap-3">
                                                <p className="text-sm text-[#3d3d3f] dark:text-gray-300 leading-relaxed line-clamp-4">
                                                    {post.summary}
                                                </p>
                                                <div className="flex items-center gap-3 text-xs text-[#6c6c6e] dark:text-gray-400 flex-wrap">
                                                    <span className="flex items-center gap-1">
                                                        <CalendarIcon className="w-3.5 h-3.5" />
                                                        {formatDate(post.created)}
                                                    </span>
                                                    {post.categories?.[0] && (
                                                        <span className="flex items-center gap-1">
                                                            <HashtagIcon className="w-3.5 h-3.5" />
                                                            {post.categories[0].name}
                                                        </span>
                                                    )}
                                                    {post.views != null && (
                                                        <span className="flex items-center gap-1">
                                                            <EyeIcon className="w-3.5 h-3.5" />
                                                            {post.views.toLocaleString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            {post.cover_image && (
                                                <img
                                                    src={post.cover_image}
                                                    alt={post.title}
                                                    className="w-28 h-20 md:w-36 md:h-24 object-cover rounded-xl shadow-sm shrink-0"
                                                />
                                            )}
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Blog;
