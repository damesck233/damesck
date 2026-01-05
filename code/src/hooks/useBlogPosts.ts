import { useState, useEffect, useCallback } from 'react';
import { blogData } from '../data/blog/data';
import { BlogPost, ApiError } from '../types';

export const useBlogPosts = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState<ApiError | null>(null);

    const fetchBlogPosts = useCallback(async () => {
        setLoading(true);
        try {
            console.log("使用本地博客数据:", blogData);

            // 使用本地数据
            if (blogData && blogData.status === "success" && blogData.data && blogData.data.dataSet) {
                const formattedBlogData: BlogPost[] = blogData.data.dataSet.map((post: any) => {
                    // 从HTML内容中提取纯文本以显示摘要
                    const stripHtml = (html: string) => {
                        const tmp = document.createElement('DIV');
                        tmp.innerHTML = html;
                        return tmp.textContent || tmp.innerText || '';
                    };

                    // 计算阅读时间
                    const content = stripHtml(post.digest || '');
                    const wordsPerMinute = 200; // 假设平均阅读速度是每分钟200字
                    const wordCount = content.trim().split(/\s+/).length;
                    const readTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

                    // 格式化日期
                    const formatDate = (timestamp: number) => {
                        const date = new Date(timestamp * 1000);
                        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                    };

                    // 提取分类或标签
                    const categories = post.categories ? post.categories.map((cat: any) => ({
                        mid: cat.mid || 0,
                        name: cat.name || '未分类',
                        slug: cat.slug || ''
                    })) : [];

                    // 返回格式化后的博客文章
                    return {
                        cid: post.cid || 0,
                        title: post.title || '无标题',
                        slug: post.slug || '',
                        created: post.created || 0,
                        modified: post.modified || 0,
                        text: post.digest || '',
                        summary: stripHtml(post.digest || '').substring(0, 200) + '...',
                        date: formatDate(post.created || 0),
                        readTime: `${readTime} min read`,
                        categories: categories,
                        tags: categories.map((cat: any) => ({
                            name: cat.name,
                            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
                        }))
                    };
                });

                setBlogPosts(formattedBlogData);
                setApiError(null);
            } else {
                console.error("本地博客数据格式不正确");
                setBlogPosts([]);
                setApiError({ code: 500, message: "数据格式错误" });
            }
        } catch (error) {
            console.error("加载博客数据时出错:", error);
            setBlogPosts([]);
            setApiError({ code: 500, message: "加载失败" });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBlogPosts();
    }, [fetchBlogPosts]);

    return { blogPosts, loading, apiError, refetch: fetchBlogPosts };
};
