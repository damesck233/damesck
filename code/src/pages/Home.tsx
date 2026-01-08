// @ts-ignore - 暂时忽略LaptopIcon未导出错误
// @ts-ignore - 暂时忽略找不到../components/Icons错误
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  WrenchScrewdriverIcon,
  DocumentTextIcon,
  CalendarIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  ClockIcon as WatchIcon,
  ArrowRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// 导入旧数据用于兼容

// 导入博客数据
import BlogCard from '../components/home/BlogCard';
import BlogModal from '../components/home/modals/BlogModal';
import { blogData as localBlogData } from '../data/blog/data';

// 导入卡片数据
import skills from '../data/cards/skills.json';
import learningProgress from '../data/cards/learningProgress.json';
import devices from '../data/cards/devices.json';
import countdown from '../data/cards/countdown.json';
import myData from '../data/my/data.json';
import { usePerformanceMotion } from '../hooks/usePerformanceMotion';

const { personalInfo, socialLinks } = myData;
import ProfileCard from '../components/home/ProfileCard';
import ActivityCard from '../components/home/ActivityCard';
import DevicesCard from '../components/home/DevicesCard';
import ActivityModal from '../components/home/modals/ActivityModal';
import ProfileModal from '../components/home/modals/ProfileModal';
import DevicesModal from '../components/home/modals/DevicesModal';
import CountdownCard from '../components/home/CountdownCard';
import CountdownModal from '../components/home/modals/CountdownModal';

// 定义博客文章接口
interface BlogPost {
  cid: number;
  title: string;
  slug: string;
  created: number;
  modified: number;
  text: string;
  summary: string;
  date: string;
  readTime: string;
  categories: Array<{
    mid: number;
    name: string;
    slug: string;
  }>;
  tags: Array<{
    name: string;
    color?: string;
  }>;
}

// 定义API错误接口
interface ApiError {
  code: number;
  message: string;
  details?: string;
}



// 定义API响应中dataset项的接口
interface ApiDatasetItem {
  cid: number;
  title: string;
  slug: string;
  created: number;
  modified: number;
  type: string;
  digest: string;
  password: string;
  categories: Array<{
    mid: number;
    name: string;
    slug: string;
    type: string;
    description: string;
    count: number;
    order: number;
    parent: number;
    cid: number;
    directory: string[];
    permalink: string;
    url: string;
    feedUrl: string;
    feedRssUrl: string;
    feedAtomUrl: string;
  }>;
  category: string;
  directory: string[];
  date: {
    timeStamp: number;
    year: string;
    month: string;
    day: string;
  };
  year: string;
  month: string;
  day: string;
  hidden: boolean;
  pathinfo: string;
  permalink: string;
  url: string;
  isMarkdown: boolean;
  feedUrl: string;
  feedRssUrl: string;
  feedAtomUrl: string;
  titleShow: boolean;
  fields: {
    [key: string]: {
      name: string;
      type: string;
      value: string;
    };
  };
}

// 定义API响应接口
interface ApiResponse {
  status: string;  // "success"或其他状态
  message: string;
  data: {
    page: number;
    pageSize: number;
    pages: number;
    count: number;
    dataSet: ApiDatasetItem[];
  };
}

// 现代化的主题颜色 - 单色设计，减少渐变和紫色
const appleColors = {
  blue: { start: '#007AFF', end: '#007AFF', shadow: 'rgba(0, 122, 255, 0.25)' },
  green: { start: '#34C759', end: '#34C759', shadow: 'rgba(52, 199, 89, 0.25)' },
  indigo: { start: '#5AC8FA', end: '#5AC8FA', shadow: 'rgba(90, 200, 250, 0.25)' }, // 改为青色，避免紫色
  orange: { start: '#FF9500', end: '#FF9500', shadow: 'rgba(255, 149, 0, 0.25)' },
  pink: { start: '#FF2D92', end: '#FF2D92', shadow: 'rgba(255, 45, 146, 0.25)' },
  purple: { start: '#5AC8FA', end: '#5AC8FA', shadow: 'rgba(90, 200, 250, 0.25)' }, // 替换为青色
  red: { start: '#FF3B30', end: '#FF3B30', shadow: 'rgba(255, 59, 48, 0.25)' },
  teal: { start: '#5AC8FA', end: '#5AC8FA', shadow: 'rgba(90, 200, 250, 0.25)' },
  yellow: { start: '#FFCC00', end: '#FFCC00', shadow: 'rgba(255, 204, 0, 0.25)' },
  gray: { start: '#8E8E93', end: '#8E8E93', shadow: 'rgba(142, 142, 147, 0.25)' }, // 新增灰色选项
};
// 现代化的主题颜色 - 单色设计，减少渐变和紫色

import { AppleStyleIcon } from '../components/ui/AppleIcons';

// 自定义Apple风格图标组件
const AppleSkillIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.7)" />
      </linearGradient>
    </defs>
    <path
      d="M8 3C8.55228 3 9 3.44772 9 4V6H15V4C15 3.44772 15.4477 3 16 3C16.5523 3 17 3.44772 17 4V6H19C20.1046 6 21 6.89543 21 8V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V8C3 6.89543 3.89543 6 5 6H7V4C7 3.44772 7.44772 3 8 3Z"
      fill="url(#skillGradient)"
      stroke="rgba(255,255,255,0.3)"
      strokeWidth="0.5"
    />
    <circle cx="8" cy="11" r="1.5" fill="rgba(255,255,255,0.8)" />
    <circle cx="12" cy="11" r="1.5" fill="rgba(255,255,255,0.8)" />
    <circle cx="16" cy="11" r="1.5" fill="rgba(255,255,255,0.8)" />
    <rect x="7" y="14" width="2" height="3" rx="1" fill="rgba(255,255,255,0.8)" />
    <rect x="11" y="13" width="2" height="4" rx="1" fill="rgba(255,255,255,0.8)" />
    <rect x="15" y="15" width="2" height="2" rx="1" fill="rgba(255,255,255,0.8)" />
  </svg>
);

const AppleLearningIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="learningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.7)" />
      </linearGradient>
    </defs>
    <path
      d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z"
      fill="url(#learningGradient)"
      stroke="rgba(255,255,255,0.3)"
      strokeWidth="0.5"
    />
    <path
      d="M8 8H16M8 12H14M8 16H12"
      stroke="rgba(255,255,255,0.8)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="18" cy="6" r="2" fill="rgba(255,255,255,0.9)" />
    <path
      d="M17 5.5L17.5 6L19 4.5"
      stroke="rgba(94, 92, 230, 0.8)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AppleDeviceIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="deviceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.7)" />
      </linearGradient>
    </defs>
    {/* 显示器 */}
    <rect
      x="3" y="4" width="18" height="12" rx="2"
      fill="url(#deviceGradient)"
      stroke="rgba(255,255,255,0.3)"
      strokeWidth="0.5"
    />
    <rect x="5" y="6" width="14" height="8" rx="1" fill="rgba(255,255,255,0.2)" />
    {/* 底座 */}
    <rect x="10" y="16" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.8)" />
    <rect x="8" y="17" width="8" height="1" rx="0.5" fill="rgba(255,255,255,0.8)" />
    {/* 屏幕内容 */}
    <rect x="7" y="8" width="4" height="2" rx="0.5" fill="rgba(255,255,255,0.6)" />
    <rect x="13" y="8" width="6" height="1" rx="0.5" fill="rgba(255,255,255,0.6)" />
    <rect x="13" y="10" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.6)" />
    <circle cx="8" cy="12" r="1" fill="rgba(255,255,255,0.6)" />
    <circle cx="11" cy="12" r="1" fill="rgba(255,255,255,0.6)" />
    <circle cx="14" cy="12" r="1" fill="rgba(255,255,255,0.6)" />
  </svg>
);

const iosCardStyle = {
  backgroundColor: 'var(--card-bg)',
  borderRadius: '20px',
  boxShadow: '0 4px 16px var(--glass-shadow), 0 2px 4px rgba(0,0,0,0.04)',
  overflow: 'hidden',
  transition: 'all 0.3s ease-out',
  border: '1px solid var(--card-border)'
};

// 毛玻璃标题区域样式
const cardHeaderStyle = {
  backdropFilter: 'blur(10px)',
  backgroundColor: 'var(--glass-bg)',
  background: 'linear-gradient(135deg, var(--glass-bg), var(--glass-bg))',
  borderBottom: '1px solid var(--card-border)',
  padding: '14px 20px',
  position: 'relative' as const,
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: 'var(--text-primary)'
};

// 卡片内容区域样式
const cardBodyStyle = {
  backgroundColor: 'var(--card-bg)',
  padding: '16px 20px',
  backdropFilter: 'blur(8px)',
  color: 'var(--text-primary)'
};

// 鼠标悬停时的放大效果
const hoverStyle = {
  transform: 'scale(1.03)',
  boxShadow: '0 8px 24px var(--glass-shadow), 0 4px 8px rgba(0,0,0,0.06)'
};

// 模态框背景样式已移至Tailwind类名

// 模态框内容
const modalContentStyle = {
  backgroundColor: 'var(--card-bg)',
  borderRadius: '20px',
  boxShadow: '0 10px 30px var(--glass-shadow), 0 1px 8px rgba(0,0,0,0.07)',
  width: '90%',
  maxWidth: '800px',
  maxHeight: '80vh',
  overflow: 'auto',
  border: '1px solid var(--card-border)',
  backdropFilter: 'blur(20px)'
};

// 简单的淡入变体
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: custom * 0.1 // 简单的延迟，使卡片依次出现
    }
  })
};

// 定义倒计时数据接口
interface CountdownItem {
  title: string;
  Startdate: string;
  targetDate: string;
  totalDays: number;
  top: boolean;
}

// 计算剩余天数的函数
const calculateDaysLeft = (targetDate: string): number => {
  if (!targetDate) return 0;

  const target = new Date(targetDate);
  const today = new Date();
  const timeDiff = target.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysLeft > 0 ? daysLeft : 0;
};

// 计算起始日期到目标日期的总天数
const calculateTotalDays = (startDate: string, targetDate: string): number => {
  if (!startDate || !targetDate) return 0;

  const start = new Date(startDate);
  const target = new Date(targetDate);
  const timeDiff = target.getTime() - start.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

// 计算已过去的天数
const calculatePassedDays = (startDate: string): number => {
  if (!startDate) return 0;

  const start = new Date(startDate);
  const today = new Date();
  const timeDiff = today.getTime() - start.getTime();
  const passedDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return passedDays > 0 ? passedDays : 0;
};

// 计算进度百分比
const calculateProgress = (item: CountdownItem): number => {
  if (!item || !item.Startdate || !item.targetDate) {
    console.log('无效的倒计时项目:', item);
    return 0;
  }

  const totalDays = calculateTotalDays(item.Startdate, item.targetDate);
  const passedDays = calculatePassedDays(item.Startdate);

  console.log('进度计算:', {
    title: item.title,
    startDate: item.Startdate,
    targetDate: item.targetDate,
    totalDays,
    passedDays
  });

  // 防止除以零
  if (totalDays <= 0) {
    console.log('总天数小于等于0');
    return 0;
  }

  const progress = (passedDays / totalDays) * 100;
  const clampedProgress = Math.min(100, Math.max(0, progress));
  console.log('计算出的进度:', clampedProgress);
  return clampedProgress;
};

// 获取主要倒计时（top为true的项目）- 移至组件外部避免初始化顺序问题
const getMainCountdown = (countdownData: CountdownItem[]): CountdownItem => {
  const main = countdownData.find(item => item.top === true);
  if (main) return main;

  // 如果没有找到top为true的，返回第一个
  return countdownData.length > 0 ? countdownData[0] : {
    title: "默认倒计时",
    Startdate: new Date().toISOString().split('T')[0],
    targetDate: new Date().toISOString().split('T')[0],
    totalDays: 1,
    top: true
  };
};


const Home = () => {
  const { enableMorph } = usePerformanceMotion();
  // 从JSON转换为正确类型
  const countdownData = countdown as CountdownItem[];
  // 使用新的数据文件替换旧数据
  const mySkills = skills;
  const myLearningProgress = learningProgress;
  const myDevices = devices;
  const mySocialLinks = socialLinks;

  // 实时倒计时状态 - 使用组件外的函数初始化
  const [daysLeft, setDaysLeft] = useState(() => {
    const mainCountdown = getMainCountdown(countdownData);
    return calculateDaysLeft(mainCountdown.targetDate);
  });

  // 悬停状态管理
  const [hoveredCards, setHoveredCards] = useState({
    personal: false,
    skills: false,
    stats: false,
    devices: false,
    countdown: false,
    blogs: false
  });

  // 标题悬停状态
  const [hoveredHeaders, setHoveredHeaders] = useState({
    personal: false,
    skills: false,
    stats: false,
    devices: false,
    countdown: false,
    blogs: false
  });

  // 模态框状态
  const [modalOpen, setModalOpen] = useState({
    personal: false,
    skills: false,
    stats: false,
    devices: false,
    countdown: false,
    blogs: false
  });

  // 存储从API获取的博客文章
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<ApiError | null>(null);

  const handleMouseEnter = (card: string) => {
    // 立即设置悬停状态，无需延迟
    setHoveredCards({ ...hoveredCards, [card]: true });
  };

  const handleMouseLeave = (card: string) => {
    // 添加短暂延迟，避免鼠标在卡片边缘移动时状态快速切换
    setTimeout(() => {
      setHoveredCards(prev => ({ ...prev, [card]: false }));
    }, 50);
  };

  const handleHeaderMouseEnter = (header: string) => {
    setHoveredHeaders({ ...hoveredHeaders, [header]: true });
  };

  const handleHeaderMouseLeave = (header: string) => {
    setTimeout(() => {
      setHoveredHeaders(prev => ({ ...prev, [header]: false }));
    }, 50);
  };

  const openModal = (modal: string) => {
    setModalOpen({ ...modalOpen, [modal]: true });
  };

  const closeModal = (modal: string) => {
    setModalOpen({ ...modalOpen, [modal]: false });
  };

  // 每天更新倒计时
  useEffect(() => {
    const updateDaysLeft = () => {
      const main = getMainCountdown(countdownData);
      if (main) {
        setDaysLeft(calculateDaysLeft(main.targetDate));
      }
    };

    const timer = setInterval(updateDaysLeft, 86400000); // 每24小时更新一次
    return () => clearInterval(timer);
  }, [countdownData]);

  // 博客文章获取函数
  const fetchBlogPosts = async () => {
    setLoading(true);
    try {
      let blogData;
      try {
        const response = await fetch('https://blog.damesck.net/api/posts');
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          blogData = await response.json();
        } else {
          throw new Error("Non-JSON response (Cloudflare)");
        }
      } catch (e) {
        console.warn("API Fetch failed, using local data:", e);
        blogData = localBlogData;
      }

      // 处理数据
      if (blogData && blogData.status === "success" && blogData.data && blogData.data.dataSet) {
        // Limit to 12 recent posts to avoid main thread blocking by DOMParser
        const recentPosts = blogData.data.dataSet.slice(0, 12);
        const formattedBlogData: BlogPost[] = recentPosts.map((post: any) => {
          // 从HTML内容中提取纯文本以显示摘要
          const stripHtml = (html: string) => {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            return doc.body.textContent || "";
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
      } else {
        console.error("本地博客数据格式不正确");
        setBlogPosts([]);
      }
    } catch (error) {
      console.error("加载博客数据时出错:", error);
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // 添加获取随机颜色的辅助函数
  const getRandomColor = (seed: string) => {
    // 使用种子生成稳定的颜色
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    // 生成柔和的颜色
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
  };

  // 在组件挂载时获取博客文章
  useEffect(() => {
    console.log("Home组件已挂载，开始获取博客数据");
    fetchBlogPosts();
  }, []);

  // 获取社交图标
  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'book':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <defs>
              <linearGradient id="blogGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.9)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
              </linearGradient>
              <linearGradient id="blogAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.6)" />
              </linearGradient>
            </defs>
            {/* 主要文档背景 */}
            <path
              d="M6 2C4.9 2 4 2.9 4 4v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6H6z"
              fill="url(#blogGradient)"
            />
            {/* 文档折角 */}
            <path
              d="M14 2v6h6"
              fill="url(#blogAccent)"
              opacity="0.7"
            />
            {/* 博客内容线条 */}
            <rect x="7" y="11" width="8" height="1" rx="0.5" fill="rgba(255,255,255,0.8)" />
            <rect x="7" y="13" width="6" height="1" rx="0.5" fill="rgba(255,255,255,0.7)" />
            <rect x="7" y="15" width="7" height="1" rx="0.5" fill="rgba(255,255,255,0.7)" />
            <rect x="7" y="17" width="5" height="1" rx="0.5" fill="rgba(255,255,255,0.6)" />
            {/* 装饰性元素 - 博客图标 */}
            <circle cx="8.5" cy="6.5" r="1.5" fill="rgba(255,255,255,0.8)" />
            <path
              d="M8.5 5.5c0.55 0 1 0.45 1 1s-0.45 1-1 1-1-0.45-1-1 0.45-1 1-1m0 0.3c-0.38 0-0.7 0.32-0.7 0.7s0.32 0.7 0.7 0.7 0.7-0.32 0.7-0.7-0.32-0.7-0.7-0.7"
              fill="rgba(255,255,255,0.9)"
            />
            {/* 小装饰点 */}
            <circle cx="16" cy="12" r="0.5" fill="rgba(255,255,255,0.6)" />
            <circle cx="15" cy="16" r="0.5" fill="rgba(255,255,255,0.5)" />
          </svg>
        );
      case 'github':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <defs>
              <linearGradient id="githubGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
              </linearGradient>
            </defs>
            <path
              d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
              fill="url(#githubGradient)"
            />
          </svg>
        );
      case 'chat':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <defs>
              <linearGradient id="chatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
              </linearGradient>
            </defs>
            <path
              d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
              fill="url(#chatGradient)"
            />
            <circle cx="8" cy="10" r="1.5" fill="rgba(255,255,255,0.7)" />
            <circle cx="12" cy="10" r="1.5" fill="rgba(255,255,255,0.7)" />
            <circle cx="16" cy="10" r="1.5" fill="rgba(255,255,255,0.7)" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <defs>
              <linearGradient id="defaultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
              </linearGradient>
            </defs>
            <path
              d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 0 4 4.5v15ZM6.5 4H20v11H6.5a4.5 4.5 0 0 0-1.5.26V4.5A.5.5 0 0 1 6.5 4Z"
              fill="url(#defaultGradient)"
            />
          </svg>
        );
    }
  };

  // 添加全局鼠标移动监听器，确保卡片悬停状态正确清除
  useEffect(() => {
    const handleMouseMoveOutside = (e: MouseEvent) => {
      // 检查鼠标是否在页面任何地方移动，但不在卡片内
      const target = e.target as HTMLElement;
      if (!target.closest('.card-container')) {
        // 如果鼠标不在任何卡片内，重置所有卡片的悬停状态
        setHoveredCards({
          personal: false,
          skills: false,
          stats: false,
          devices: false,
          countdown: false,
          blogs: false
        });
      }
    };

    // 添加全局点击事件，确保点击其他区域时卡片悬停状态被清除
    const handleClickOutside = () => {
      if (!modalOpen.personal && !modalOpen.skills && !modalOpen.stats &&
        !modalOpen.devices && !modalOpen.countdown && !modalOpen.blogs) {
        setHoveredCards({
          personal: false,
          skills: false,
          stats: false,
          devices: false,
          countdown: false,
          blogs: false
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMoveOutside);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveOutside);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [modalOpen]);

  return (
    <motion.div
      className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 pt-8 md:pt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 个人信息卡片 - 使用新组件 */}
        <ProfileCard
          onClick={() => openModal('personal')}
          hidden={modalOpen.personal}
          layoutId={enableMorph ? 'profile-card' : undefined}
        />

        {/* Activity Card (Replaces Skills & Learning) */}
        {/* Activity Card (Replaces Skills & Learning) */}
        <ActivityCard
          // skills={skills} // Deprecated
          // learningProgress={myLearningProgress} // Deprecated
          timelineEvents={myData.timelineEvents}
          onClick={() => openModal('skills')}
          isHovered={hoveredCards.skills}
          onMouseEnter={() => handleMouseEnter('skills')}
          onMouseLeave={() => handleMouseLeave('skills')}
          // variants={fadeIn} // Removed per previous fix
          custom={1}
          hidden={modalOpen.skills}
          layoutId={enableMorph ? 'activity-card' : undefined}
        />


        {/* 我的设备卡片 - 使用新数据 */}
        <DevicesCard
          devices={devices}
          onClick={() => openModal('devices')}
          onMouseEnter={() => handleMouseEnter('devices')}
          onMouseLeave={() => handleMouseLeave('devices')}
          layoutId={enableMorph ? 'devices-card' : undefined}
          hidden={modalOpen.devices}
        />

        {/* 倒计时卡片 - 使用新数据 */}
        <CountdownCard
          events={countdownData}
          onClick={() => openModal('countdown')}
          onMouseEnter={() => handleMouseEnter('countdown')}
          onMouseLeave={() => handleMouseLeave('countdown')}
          layoutId={enableMorph ? 'countdown-card' : undefined}
          hidden={modalOpen.countdown}
        />

        {/* 最新博客卡片 */}
        <BlogCard
          blogPosts={blogPosts}
          loading={loading}
          apiError={apiError}
          onClick={() => openModal('blogs')}
          onMouseEnter={() => handleMouseEnter('blogs')}
          onMouseLeave={() => handleMouseLeave('blogs')}
          hidden={modalOpen.blogs}
          layoutId={enableMorph ? 'blog-card' : undefined}
        />
      </div>


      {/* 模态框 - Activity Details (Skills & Learning) */}
      <ActivityModal
        isOpen={modalOpen.skills}
        onClose={() => closeModal('skills')}
        timelineEvents={myData.timelineEvents}
        layoutId={enableMorph ? 'activity-card' : undefined}
      />

      {/* 模态框 - 个人资料 */}
      <ProfileModal
        isOpen={modalOpen.personal}
        onClose={() => closeModal('personal')}
        layoutId={enableMorph ? 'profile-card' : undefined}
      />


      {/* 模态框 - 我的设备 */}
      <DevicesModal
        isOpen={modalOpen.devices}
        onClose={() => closeModal('devices')}
        devices={devices}
        layoutId={enableMorph ? 'devices-card' : undefined}
      />



      {/* 模态框 - 倒计时 */}
      <CountdownModal
        isOpen={modalOpen.countdown}
        onClose={() => closeModal('countdown')}
        events={countdownData}
        layoutId={enableMorph ? 'countdown-card' : undefined}
      />

      {/* 模态框 - 最新博客 */}
      <BlogModal
        isOpen={modalOpen.blogs}
        onClose={() => closeModal('blogs')}
        blogPosts={blogPosts}
        layoutId={enableMorph ? 'blog-card' : undefined}
      />

    </motion.div >
  );
};

export default Home;
