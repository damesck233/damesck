import { motion } from 'framer-motion';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { AppleStyleIcon } from '../ui/AppleIcons';
import { iosCardStyle, cardHeaderStyle, cardBodyStyle, hoverStyle, fadeIn } from './CardStyles';
import { BlogPost, ApiError } from '../../types';

interface BlogCardProps {
    onClick: () => void;
    blogPosts: BlogPost[];
    loading: boolean;
    apiError: ApiError | null;
    onRetry: () => void;
    custom?: number;
}

const BlogCard = ({ onClick, blogPosts, loading, apiError, onRetry, custom = 5 }: BlogCardProps) => {
    return (
        <motion.div
            variants={fadeIn}
            custom={custom}
            initial="hidden"
            animate="visible"
            className="md:col-span-3 cursor-pointer card-container floating-element"
            style={{ height: '320px' }}
            onClick={onClick}
            whileHover={hoverStyle}
        >
            <div
                className="h-full"
                style={iosCardStyle}
            >
                <div style={cardHeaderStyle}>
                    <div className="flex items-center">
                        <AppleStyleIcon colorScheme="pink" size="md">
                            <DocumentTextIcon className="w-5 h-5 text-white" />
                        </AppleStyleIcon>
                        <div className="ml-3">
                            <h3 className="text-base font-semibold dark:text-gray-100 text-[#2c2c2e]">我的博客文章</h3>
                            <p className="text-xs dark:text-gray-400 text-gray-500 mt-0.5">从 blog.damesck.net 获取的最新内容</p>
                        </div>
                    </div>
                    <div className="w-6 h-6 flex items-center justify-center rounded-full dark:bg-gray-700 bg-gray-100">
                        <span className="text-[#FF375F] font-semibold text-sm">{blogPosts.length || 0}</span>
                    </div>
                </div>
                <div style={cardBodyStyle} className="h-[calc(100%-64px)] overflow-y-auto">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-pulse flex flex-col items-center">
                                <div className="h-2 w-20 dark:bg-gray-700 bg-gray-200 rounded mb-2"></div>
                                <div className="h-2 w-16 dark:bg-gray-700 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    ) : apiError ? (
                        <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                            <div className="text-red-500 mb-2 font-medium">请求失败 (错误代码: {apiError.code})</div>
                            <div className="text-sm dark:text-gray-300 text-gray-700 mb-3">{apiError.message}</div>
                            {apiError.details && (
                                <div className="text-xs dark:text-gray-400 text-gray-500 max-w-md">{apiError.details}</div>
                            )}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRetry();
                                }}
                                className="mt-4 px-3 py-1 dark:bg-blue-900/50 dark:text-blue-300 bg-blue-100 text-blue-700 rounded-full text-xs dark:hover:bg-blue-800/70 hover:bg-blue-200 transition-colors"
                            >
                                重试
                            </button>
                        </div>
                    ) : blogPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 px-3 py-2 h-full">
                            {blogPosts.slice(0, 4).map((blog, index) => (
                                <div key={index} className="dark:bg-gray-800/50 dark:hover:bg-gray-700/80 bg-gray-50/50 rounded-lg p-3 hover:bg-gray-50/80 transition-colors h-full flex flex-col">
                                    <h4 className="font-medium text-sm dark:text-gray-100 text-[#2c2c2e] truncate mb-2">{blog.title}</h4>
                                    <p className="text-xs dark:text-gray-400 text-gray-600 line-clamp-3 mb-auto">{blog.summary}</p>
                                    <div className="mt-3">
                                        <div className="flex gap-1 flex-wrap mb-2">
                                            {blog.tags.slice(0, 1).map((tag, tagIndex) => (
                                                <span key={tagIndex} className="px-1.5 py-0.5 text-xs rounded-md dark:bg-blue-900/30 dark:text-blue-400 bg-blue-50 text-blue-600">
                                                    {tag.name}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-xs dark:text-gray-500 text-gray-500 pt-2 dark:border-gray-700/50 border-t border-gray-100/50 w-full">{blog.date} · {blog.readTime}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full px-3 py-2">
                            <p className="text-sm dark:text-gray-400 text-gray-600">暂无博客数据</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default BlogCard;
