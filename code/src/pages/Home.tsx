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
import { blogData } from '../data/blog/data';

// 导入卡片数据
import skills from '../data/cards/skills.json';
import learningProgress from '../data/cards/learningProgress.json';
import devices from '../data/cards/devices.json';
import countdown from '../data/cards/countdown.json';
import myData from '../data/my/data.json';

const { personalInfo, socialLinks } = myData;
import ProfileCard from '../components/home/ProfileCard';
import ProfileModal from '../components/home/modals/ProfileModal';

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
        <ProfileCard onClick={() => openModal('personal')} hidden={modalOpen.personal} />

        {/* 技能展示卡片 - 使用新数据 */}
        <motion.div
          variants={fadeIn}
          custom={1}
          initial="hidden"
          animate="visible"
          className="aspect-square cursor-pointer card-container floating-element"
          onMouseEnter={() => handleMouseEnter('skills')}
          onMouseLeave={() => handleMouseLeave('skills')}
          onClick={() => openModal('skills')}
        >
          <div
            className="h-full"
            style={{
              ...iosCardStyle,
              ...(hoveredCards.skills ? hoverStyle : {})
            }}
          >
            <div
              style={{
                ...cardHeaderStyle
              }}
            >
              <div className="flex items-center">
                <AppleStyleIcon
                  colorScheme="green"
                >
                  <AppleSkillIcon className="w-5 h-5 text-white" />
                </AppleStyleIcon>
                <div className="ml-3">
                  <h3 className="text-base font-semibold dark:text-gray-100 text-[#2c2c2e]">我的技能</h3>
                  <p className="text-xs dark:text-gray-400 text-gray-500 mt-0.5">部分技能</p>
                </div>
              </div>
              <div className="w-6 h-6 flex items-center justify-center rounded-full dark:bg-gray-700 bg-gray-100">
                <span className="text-[#30D158] font-semibold text-sm">{mySkills.length}</span>
              </div>
            </div>
            <div style={cardBodyStyle} className="h-[calc(100%-64px)] overflow-y-auto">
              <div className="flex flex-col h-full p-3">
                {mySkills.map((skill, index) => (
                  <div key={index} className="mb-3.5 group relative">
                    {/* 背景装饰 */}
                    <div
                      className="absolute -left-1.5 top-1 w-[3px] h-[calc(100%-4px)] rounded-full opacity-70"
                      style={{
                        background: skill.color === 'blue' ? 'linear-gradient(to bottom, #3B82F6, #60A5FA)' :
                          skill.color === 'green' ? 'linear-gradient(to bottom, #10B981, #34D399)' :
                            skill.color === 'yellow' ? 'linear-gradient(to bottom, #F59E0B, #FBBF24)' :
                              skill.color === 'orange' ? 'linear-gradient(to bottom, #F97316, #FB923C)' :
                                skill.color === 'indigo' ? 'linear-gradient(to bottom, #4F46E5, #6366F1)' :
                                  skill.color === 'red' ? 'linear-gradient(to bottom, #EF4444, #F87171)' :
                                    skill.color === 'purple' ? 'linear-gradient(to bottom, #8B5CF6, #A78BFA)' :
                                      skill.color === 'pink' ? 'linear-gradient(to bottom, #EC4899, #F472B6)' :
                                        'linear-gradient(to bottom, #3B82F6, #60A5FA)'
                      }}
                    ></div>

                    <div className="pl-3">
                      {/* 分类标题 */}
                      <div className={`text-sm font-medium mb-1.5 flex items-center`}>
                        <div
                          className="w-4 h-4 mr-2 rounded-md flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: skill.color === 'blue' ? 'linear-gradient(135deg, #3B82F6, #60A5FA)' :
                              skill.color === 'green' ? 'linear-gradient(135deg, #10B981, #34D399)' :
                                skill.color === 'yellow' ? 'linear-gradient(135deg, #F59E0B, #FBBF24)' :
                                  skill.color === 'orange' ? 'linear-gradient(135deg, #F97316, #FB923C)' :
                                    skill.color === 'indigo' ? 'linear-gradient(135deg, #4F46E5, #6366F1)' :
                                      skill.color === 'red' ? 'linear-gradient(135deg, #EF4444, #F87171)' :
                                        skill.color === 'purple' ? 'linear-gradient(135deg, #8B5CF6, #A78BFA)' :
                                          skill.color === 'pink' ? 'linear-gradient(135deg, #EC4899, #F472B6)' :
                                            'linear-gradient(135deg, #3B82F6, #60A5FA)',
                            willChange: 'transform',
                            boxShadow: skill.color === 'blue' ? '0 2px 5px rgba(59, 130, 246, 0.3)' :
                              skill.color === 'green' ? '0 2px 5px rgba(16, 185, 129, 0.3)' :
                                skill.color === 'yellow' ? '0 2px 5px rgba(245, 158, 11, 0.3)' :
                                  skill.color === 'orange' ? '0 2px 5px rgba(249, 115, 22, 0.3)' :
                                    skill.color === 'indigo' ? '0 2px 5px rgba(79, 70, 229, 0.3)' :
                                      skill.color === 'red' ? '0 2px 5px rgba(239, 68, 68, 0.3)' :
                                        skill.color === 'purple' ? '0 2px 5px rgba(139, 92, 246, 0.3)' :
                                          skill.color === 'pink' ? '0 2px 5px rgba(236, 72, 153, 0.3)' :
                                            '0 2px 5px rgba(59, 130, 246, 0.3)'
                          }}
                        >
                          <svg className="w-2.5 h-2.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span
                          style={{
                            color: skill.color === 'blue' ? '#3B82F6' :
                              skill.color === 'green' ? '#10B981' :
                                skill.color === 'yellow' ? '#F59E0B' :
                                  skill.color === 'orange' ? '#F97316' :
                                    skill.color === 'indigo' ? '#4F46E5' :
                                      skill.color === 'red' ? '#EF4444' :
                                        skill.color === 'purple' ? '#8B5CF6' :
                                          skill.color === 'pink' ? '#EC4899' : '#3B82F6'
                          }}
                        >
                          {skill.category}
                        </span>
                        <span className="text-xs ml-2 dark:text-gray-400 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          {skill.items.length} 项技能
                        </span>
                      </div>

                      {/* 技能标签 */}
                      <div className="flex flex-wrap gap-1.5 ml-6">
                        {skill.items.map((item, itemIndex) => {
                          const isFirst = itemIndex === 0;
                          const isBadge = itemIndex === 1;

                          return (
                            <span
                              key={itemIndex}
                              className={`
                                text-xs inline-flex items-center px-2 py-1 
                                transition-all duration-300 
                                rounded-md group-hover:translate-y-[-1px]
                                ${isFirst ? 'font-medium' : ''}
                              `}
                              style={{
                                backgroundColor: skill.color === 'blue' ? `rgba(59, 130, 246, ${isFirst ? 0.15 : 0.1})` :
                                  skill.color === 'green' ? `rgba(16, 185, 129, ${isFirst ? 0.15 : 0.1})` :
                                    skill.color === 'yellow' ? `rgba(245, 158, 11, ${isFirst ? 0.15 : 0.1})` :
                                      skill.color === 'orange' ? `rgba(249, 115, 22, ${isFirst ? 0.15 : 0.1})` :
                                        skill.color === 'indigo' ? `rgba(79, 70, 229, ${isFirst ? 0.15 : 0.1})` :
                                          skill.color === 'red' ? `rgba(239, 68, 68, ${isFirst ? 0.15 : 0.1})` :
                                            skill.color === 'purple' ? `rgba(139, 92, 246, ${isFirst ? 0.15 : 0.1})` :
                                              skill.color === 'pink' ? `rgba(236, 72, 153, ${isFirst ? 0.15 : 0.1})` :
                                                `rgba(59, 130, 246, ${isFirst ? 0.15 : 0.1})`,
                                color: skill.color === 'blue' ? '#3B82F6' :
                                  skill.color === 'green' ? '#10B981' :
                                    skill.color === 'yellow' ? '#F59E0B' :
                                      skill.color === 'orange' ? '#F97316' :
                                        skill.color === 'indigo' ? '#4F46E5' :
                                          skill.color === 'red' ? '#EF4444' :
                                            skill.color === 'purple' ? '#8B5CF6' :
                                              skill.color === 'pink' ? '#EC4899' : '#3B82F6',
                                borderColor: skill.color === 'blue' ? 'rgba(59, 130, 246, 0.2)' :
                                  skill.color === 'green' ? 'rgba(16, 185, 129, 0.2)' :
                                    skill.color === 'yellow' ? 'rgba(245, 158, 11, 0.2)' :
                                      skill.color === 'orange' ? 'rgba(249, 115, 22, 0.2)' :
                                        skill.color === 'indigo' ? 'rgba(79, 70, 229, 0.2)' :
                                          skill.color === 'red' ? 'rgba(239, 68, 68, 0.2)' :
                                            skill.color === 'purple' ? 'rgba(139, 92, 246, 0.2)' :
                                              skill.color === 'pink' ? 'rgba(236, 72, 153, 0.2)' :
                                                'rgba(59, 130, 246, 0.2)',
                                borderWidth: isBadge ? '1px' : '0px'
                              }}
                            >
                              {isFirst && (
                                <span className="w-1 h-1 rounded-full mr-1.5" style={{
                                  backgroundColor: skill.color === 'blue' ? '#3B82F6' :
                                    skill.color === 'green' ? '#10B981' :
                                      skill.color === 'yellow' ? '#F59E0B' :
                                        skill.color === 'orange' ? '#F97316' :
                                          skill.color === 'indigo' ? '#4F46E5' :
                                            skill.color === 'red' ? '#EF4444' :
                                              skill.color === 'purple' ? '#8B5CF6' :
                                                skill.color === 'pink' ? '#EC4899' : '#3B82F6'
                                }}></span>
                              )}
                              {item}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 学习进度卡片 - 使用新数据 */}
        <motion.div
          variants={fadeIn}
          custom={2}
          initial="hidden"
          animate="visible"
          className="aspect-square cursor-pointer card-container floating-element"
          onMouseEnter={() => handleMouseEnter('stats')}
          onMouseLeave={() => handleMouseLeave('stats')}
          onClick={() => openModal('stats')}
        >
          <div
            className="h-full"
            style={{
              ...iosCardStyle,
              ...(hoveredCards.stats ? hoverStyle : {})
            }}
          >
            <div
              style={{
                ...cardHeaderStyle
              }}
            >
              <div className="flex items-center">
                <AppleStyleIcon
                  colorScheme="indigo"
                >
                  <AppleLearningIcon className="w-5 h-5 text-white" />
                </AppleStyleIcon>
                <div className="ml-3">
                  <h3 className="text-base font-semibold dark:text-gray-100 text-[#2c2c2e]">学习进度</h3>
                  <p className="text-xs dark:text-gray-400 text-gray-500 mt-0.5">正在学习中</p>
                </div>
              </div>
              <div className="w-6 h-6 flex items-center justify-center rounded-full dark:bg-gray-700 bg-gray-100">
                <span className="text-[#5E5CE6] font-semibold text-sm">{myLearningProgress.length}</span>
              </div>
            </div>
            <div style={cardBodyStyle} className="h-[calc(100%-64px)] overflow-y-auto">
              <div className="flex flex-col h-full p-3">
                {myLearningProgress.map((item, index) => (
                  <div key={index} className="mb-4 group hover:translate-y-[-2px] transition-all duration-300 bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-800/60 rounded-xl p-4 shadow-sm hover:shadow-md dark:shadow-gray-900/10">
                    <div className="flex items-center justify-between mb-2.5">
                      <h4 className="text-base font-medium dark:text-white text-gray-800">{item.name}</h4>
                      <div
                        className="text-xs px-2 py-1 rounded-full font-medium border dark:border-opacity-20 border-opacity-30"
                        style={{
                          backgroundColor: item.color === 'blue' ? 'rgba(59, 130, 246, 0.08)' :
                            item.color === 'green' ? 'rgba(16, 185, 129, 0.08)' :
                              item.color === 'yellow' ? 'rgba(245, 158, 11, 0.08)' :
                                item.color === 'orange' ? 'rgba(249, 115, 22, 0.08)' :
                                  item.color === 'indigo' ? 'rgba(79, 70, 229, 0.08)' :
                                    item.color === 'red' ? 'rgba(239, 68, 68, 0.08)' :
                                      item.color === 'purple' ? 'rgba(139, 92, 246, 0.08)' :
                                        item.color === 'pink' ? 'rgba(236, 72, 153, 0.08)' : 'rgba(59, 130, 246, 0.08)',
                          color: item.color === 'blue' ? '#3B82F6' :
                            item.color === 'green' ? '#10B981' :
                              item.color === 'yellow' ? '#F59E0B' :
                                item.color === 'orange' ? '#F97316' :
                                  item.color === 'indigo' ? '#4F46E5' :
                                    item.color === 'red' ? '#EF4444' :
                                      item.color === 'purple' ? '#8B5CF6' :
                                        item.color === 'pink' ? '#EC4899' : '#3B82F6',
                          borderColor: item.color === 'blue' ? 'rgba(59, 130, 246, 0.2)' :
                            item.color === 'green' ? 'rgba(16, 185, 129, 0.2)' :
                              item.color === 'yellow' ? 'rgba(245, 158, 11, 0.2)' :
                                item.color === 'orange' ? 'rgba(249, 115, 22, 0.2)' :
                                  item.color === 'indigo' ? 'rgba(79, 70, 229, 0.2)' :
                                    item.color === 'red' ? 'rgba(239, 68, 68, 0.2)' :
                                      item.color === 'purple' ? 'rgba(139, 92, 246, 0.2)' :
                                        item.color === 'pink' ? 'rgba(236, 72, 153, 0.2)' : 'rgba(59, 130, 246, 0.2)'
                        }}
                      >
                        {parseInt(item.value) < 30 ? '初学' :
                          parseInt(item.value) < 60 ? '进阶' :
                            parseInt(item.value) < 80 ? '熟练' : '精通'}
                      </div>
                    </div>

                    <p className="text-xs dark:text-gray-400 text-gray-500 mb-3 line-clamp-1">{item.description}</p>

                    <div className="flex items-center">
                      <div className="relative flex-grow mr-3">
                        <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-400 ease-out"
                            style={{
                              width: item.value,
                              backgroundColor: item.color === 'blue' ? '#3B82F6' :
                                item.color === 'green' ? '#10B981' :
                                  item.color === 'yellow' ? '#F59E0B' :
                                    item.color === 'orange' ? '#F97316' :
                                      item.color === 'indigo' ? '#4F46E5' :
                                        item.color === 'red' ? '#EF4444' :
                                          item.color === 'purple' ? '#8B5CF6' :
                                            item.color === 'pink' ? '#EC4899' : '#3B82F6'
                            }}
                          ></div>
                        </div>
                        <div className="absolute -bottom-4 left-0 w-full flex justify-between text-[10px] text-gray-400 dark:text-gray-500 px-0.5">
                          <span>0%</span>
                          <span>50%</span>
                          <span>100%</span>
                        </div>
                      </div>
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 text-sm shadow-sm"
                        style={{
                          backgroundColor: item.color === 'blue' ? '#3B82F6' :
                            item.color === 'green' ? '#10B981' :
                              item.color === 'yellow' ? '#F59E0B' :
                                item.color === 'orange' ? '#F97316' :
                                  item.color === 'indigo' ? '#4F46E5' :
                                    item.color === 'red' ? '#EF4444' :
                                      item.color === 'purple' ? '#8B5CF6' :
                                        item.color === 'pink' ? '#EC4899' : '#3B82F6'
                        }}
                      >
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 我的设备卡片 - 使用新数据 */}
        <motion.div
          variants={fadeIn}
          custom={3}
          initial="hidden"
          animate="visible"
          className="md:col-span-2 cursor-pointer card-container floating-element"
          style={{ height: 'calc(100% - 0px)' }}
          onMouseEnter={() => handleMouseEnter('devices')}
          onMouseLeave={() => handleMouseLeave('devices')}
          onClick={() => openModal('devices')}
        >
          <div
            className="h-full"
            style={{
              ...iosCardStyle,
              ...(hoveredCards.devices ? hoverStyle : {})
            }}
          >
            <div
              style={{
                ...cardHeaderStyle
              }}
            >
              <div className="flex items-center">
                <AppleStyleIcon
                  colorScheme="orange"
                >
                  <AppleDeviceIcon className="w-5 h-5 text-white" />
                </AppleStyleIcon>
                <div className="ml-3">
                  <h3 className="text-base font-semibold dark:text-gray-100 text-[#2c2c2e]">我的设备</h3>
                  <p className="text-xs dark:text-gray-400 text-gray-500 mt-0.5">浏览全部设备</p>
                </div>
              </div>
              <div className="w-6 h-6 flex items-center justify-center rounded-full dark:bg-gray-700 bg-gray-100">
                <span className="text-[#FF9F0A] font-semibold text-sm">{myDevices.length}</span>
              </div>
            </div>
            <div style={cardBodyStyle} className="h-[calc(100%-64px)] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {myDevices.slice(0, 3).map((device, index) => (
                  <div key={index} className="relative flex flex-col overflow-hidden h-full dark:bg-gray-800/70 dark:border-gray-700/50 bg-white/70 rounded-xl hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all shadow-sm border border-gray-100/50 group">
                    {/* 背景装饰 */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="absolute -right-6 -top-6 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl dark:from-blue-600/10 dark:to-purple-600/10"></div>
                      <div className="absolute -left-4 -bottom-4 w-12 h-12 rounded-full bg-gradient-to-tr from-green-500/10 to-yellow-500/10 blur-lg dark:from-green-600/5 dark:to-yellow-600/5"></div>
                    </div>

                    {/* 上部图片与信息区 */}
                    <div className="p-3 pb-2 relative z-10">
                      <div className="flex items-center">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden mr-3 shadow-sm flex-shrink-0">
                          <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-gray-700 dark:to-gray-800 bg-gradient-to-br from-gray-100 to-gray-200"></div>
                          <img src={device.image} alt={device.name} className="w-full h-full object-contain p-1.5 relative z-10 transition-transform duration-300 group-hover:scale-110" style={{ willChange: 'transform' }} />
                        </div>
                        <div className="flex-grow overflow-hidden">
                          <h4 className="font-semibold dark:text-gray-100 text-[#1d1d1f] truncate">{device.name}</h4>
                          <div className="flex items-center mt-0.5">
                            <div className="w-2 h-2 rounded-full mr-1.5 flex-shrink-0"
                              style={{
                                backgroundColor: device.specs.condition === '良好' ? '#34D399' :
                                  device.specs.condition === '一般' ? '#FBBF24' :
                                    device.specs.condition === '需要维修' ? '#F87171' : '#60A5FA'
                              }}
                            ></div>
                            <span className="text-xs dark:text-gray-400 text-gray-500">{device.specs.condition}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 中部卡片内容 */}
                    <div className="flex-grow px-3 pb-1 flex flex-col relative z-10">
                      <p className="text-xs dark:text-gray-400 text-gray-500 line-clamp-2 mb-2">{device.description}</p>

                      {/* 信息卡片 */}
                      <div className="mt-auto mb-2">
                        <div className="w-full dark:bg-gray-700/40 bg-gray-100/80 rounded-lg p-2 backdrop-blur-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] dark:text-gray-400 text-gray-500">购买日期</span>
                            <span className="text-xs font-medium dark:text-gray-300 text-gray-700">{device.specs.purchaseDate}</span>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-[10px] dark:text-gray-400 text-gray-500">保修状态</span>
                            <span className="text-xs font-medium dark:text-gray-300 text-gray-700">{device.specs.warranty}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 底部标签区域 */}
                    <div className="p-3 pt-0 relative z-10">
                      <div className="flex flex-wrap gap-1.5">
                        {device.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-flex items-center px-2 py-0.5 text-2xs rounded-full backdrop-blur-sm transition-all duration-300 group-hover:translate-y-[-1px] group-hover:shadow-sm"
                            style={{
                              backgroundColor: tagIndex === 0 ? 'rgba(59, 130, 246, 0.1)' :
                                tagIndex === 1 ? 'rgba(16, 185, 129, 0.1)' :
                                  'rgba(99, 102, 241, 0.1)',
                              color: tagIndex === 0 ? '#3B82F6' :
                                tagIndex === 1 ? '#10B981' :
                                  '#6366F1',
                              borderColor: tagIndex === 0 ? 'rgba(59, 130, 246, 0.2)' :
                                tagIndex === 1 ? 'rgba(16, 185, 129, 0.2)' :
                                  'rgba(99, 102, 241, 0.2)',
                              borderWidth: '1px'
                            }}
                          >
                            {tagIndex === 0 && (
                              <svg className="w-2 h-2 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                              </svg>
                            )}
                            {tagIndex === 1 && (
                              <svg className="w-2 h-2 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                              </svg>
                            )}
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 悬停指示器 */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[24px] border-l-transparent border-t-[24px] border-blue-500/70 dark:border-blue-600/70 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 倒计时卡片 - 使用新数据 */}
        <motion.div
          variants={fadeIn}
          custom={4}
          initial="hidden"
          animate="visible"
          className="cursor-pointer card-container floating-element"
          onMouseEnter={() => handleMouseEnter('countdown')}
          onMouseLeave={() => handleMouseLeave('countdown')}
          onClick={() => openModal('countdown')}
        >
          <div
            className="h-full"
            style={{
              ...iosCardStyle,
              ...(hoveredCards.countdown ? hoverStyle : {})
            }}
          >
            <div
              style={{
                ...cardHeaderStyle
              }}
            >
              <div className="flex items-center">
                <AppleStyleIcon
                  colorScheme="teal"
                  size="md"
                >
                  <ClockIcon className="w-5 h-5 text-white" />
                </AppleStyleIcon>
                <div className="ml-3">
                  <h3 className="text-base font-semibold dark:text-gray-100 text-[#2c2c2e]">倒计日</h3>
                  <p className="text-xs dark:text-gray-400 text-gray-500 mt-0.5">剩余天数</p>
                </div>
              </div>
              <div className="w-6 h-6 flex items-center justify-center rounded-full dark:bg-gray-700 bg-gray-100">
                <span className="text-blue-500 font-semibold text-sm">{countdownData.length}</span>
              </div>
            </div>
            <div style={cardBodyStyle} className="h-[calc(100%-64px)]">
              <div className="h-full flex flex-col p-4 relative">
                {/* 背景装饰 */}
                <div className="absolute -top-1 -right-1 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-xl pointer-events-none dark:from-blue-400/5 dark:to-purple-500/5"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-tr from-green-400/10 to-yellow-500/10 rounded-full blur-lg pointer-events-none dark:from-green-400/5 dark:to-yellow-500/5"></div>

                {/* 主倒计时 */}
                <div className="flex justify-between items-start mb-3 relative z-10">
                  <h4 className="font-medium text-lg dark:text-gray-100 text-[#2c2c2e]">{getMainCountdown(countdownData).title}</h4>
                  <span className="text-xs py-0.5 px-2 rounded-full font-medium dark:bg-blue-500/20 dark:text-blue-400 bg-blue-100 text-blue-600">主要</span>
                </div>

                <div className="relative z-10 mb-3 flex items-center">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center text-white shadow-md">
                    <div className="text-3xl font-bold">{daysLeft}</div>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm dark:text-gray-400 text-gray-500 mb-1">距离目标日期</div>
                    <div className="text-sm font-medium dark:text-gray-300 text-gray-700">{getMainCountdown(countdownData).targetDate.replace(/-/g, '年') + '日'}</div>
                  </div>
                </div>

                <div className="h-1.5 w-full dark:bg-gray-700 bg-gray-100 rounded-full overflow-hidden shadow-inner mb-3 relative z-10">
                  <div
                    className="h-full dark:bg-blue-500 bg-blue-500 rounded-full transition-all duration-600"
                    style={{ width: `${calculateProgress(getMainCountdown(countdownData))}%` }}
                  ></div>
                </div>

                {/* 更紧凑的其他倒计时列表 */}
                <div className="relative z-10 flex-1 overflow-hidden">
                  <h5 className="text-xs uppercase dark:text-gray-400 text-gray-500 mb-1.5 font-medium tracking-wider">其他倒计时</h5>
                  <div className="space-y-1.5">
                    {countdownData.filter(item => !item.top).slice(0, 2).map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-1.5"
                            style={{
                              backgroundColor: index === 0 ? '#22C55E' : '#F97316'
                            }}
                          ></div>
                          <span className="text-xs dark:text-gray-300 text-gray-700">{item.title}</span>
                        </div>
                        <span className="text-xs font-medium dark:text-gray-300 text-gray-700">{calculateDaysLeft(item.targetDate)}天</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 最新博客卡片 */}
        <motion.div
          variants={fadeIn}
          custom={5}
          initial="hidden"
          animate="visible"
          className="md:col-span-3 cursor-pointer card-container floating-element"
          style={{ height: '320px' }}
          onMouseEnter={() => handleMouseEnter('blogs')}
          onMouseLeave={() => handleMouseLeave('blogs')}
          onClick={() => openModal('blogs')}
        >
          <div
            className="h-full"
            style={{
              ...iosCardStyle,
              ...(hoveredCards.blogs ? hoverStyle : {})
            }}
          >
            <div
              style={{
                ...cardHeaderStyle
              }}
            >
              <div className="flex items-center">
                <AppleStyleIcon
                  colorScheme="pink"
                  size="md"
                >
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
                    onClick={fetchBlogPosts}
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
      </div>

      {/* 模态框 - 技能详情 */}
      <AnimatePresence>
        {modalOpen.skills && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-md flex items-center justify-center z-[1000]"
            onClick={() => closeModal('skills')}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative overflow-hidden bg-white/60 dark:bg-gray-900/70 dark:border-gray-600/20"
              style={{
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(30px) saturate(200%)',
                width: '90%',
                maxWidth: '900px',
                maxHeight: '85vh'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 云母效果背景层 */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 dark:from-gray-800/20 dark:via-transparent dark:to-gray-800/10 pointer-events-none"></div>

              {/* 噪点纹理 */}
              <div
                className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  backgroundSize: '256px 256px'
                }}
              ></div>

              {/* 动态光影效果 */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-gray-400/30"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-gray-500/20"></div>

              {/* 模态框头部 */}
              <div
                className="relative z-10 border-b border-white/20 dark:border-gray-700/30 p-6 bg-white/40 dark:bg-gray-800/60"
                style={{
                  borderTopLeftRadius: '20px',
                  borderTopRightRadius: '20px',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <AppleStyleIcon
                      colorScheme="green"
                      size="lg"
                    >
                      <AppleSkillIcon className="w-6 h-6 text-white" />
                    </AppleStyleIcon>
                    <div className="ml-3">
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">技能详情</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">我的一些技能</p>
                    </div>
                  </div>
                  <button
                    className="w-10 h-10 rounded-full bg-white/30 hover:bg-white/40 dark:bg-gray-700/50 dark:hover:bg-gray-600/60 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                    onClick={() => closeModal('skills')}
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </button>
                </div>
              </div>

              {/* 模态框内容 */}
              <div
                className="relative z-10 p-6 overflow-y-auto bg-white/20 dark:bg-gray-800/40"
                style={{
                  backdropFilter: 'blur(15px) saturate(150%)',
                  borderBottomLeftRadius: '20px',
                  borderBottomRightRadius: '20px',
                  maxHeight: 'calc(85vh - 120px)'
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mySkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="group relative bg-white/30 dark:bg-gray-800/50 border border-white/15 dark:border-gray-600/30"
                      style={{
                        backdropFilter: 'blur(25px) saturate(180%)',
                        borderRadius: '16px',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                        padding: '20px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {/* 卡片装饰 */}
                      <div
                        className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
                        style={{
                          background: skill.color === 'blue' ? 'linear-gradient(90deg, #3B82F6, #60A5FA)' :
                            skill.color === 'green' ? 'linear-gradient(90deg, #10B981, #34D399)' :
                              skill.color === 'purple' ? 'linear-gradient(90deg, #8B5CF6, #A78BFA)' :
                                'linear-gradient(90deg, #3B82F6, #60A5FA)'
                        }}
                      ></div>

                      {/* 技能分类标题 */}
                      <div className="flex items-center mb-4">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                          style={{
                            background: skill.color === 'blue' ? 'linear-gradient(135deg, #3B82F6, #60A5FA)' :
                              skill.color === 'green' ? 'linear-gradient(135deg, #10B981, #34D399)' :
                                skill.color === 'purple' ? 'linear-gradient(135deg, #8B5CF6, #A78BFA)' :
                                  'linear-gradient(135deg, #3B82F6, #60A5FA)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                          }}
                        >
                          <div className="w-4 h-4 bg-white rounded-sm"></div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                            {skill.category}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {skill.items.length} 项技能
                          </p>
                        </div>
                      </div>

                      {/* 技能标签 */}
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item, itemIndex) => (
                          <motion.span
                            key={itemIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: (index * 0.1) + (itemIndex * 0.05), duration: 0.2 }}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                            style={{
                              background: skill.color === 'blue' ? 'rgba(59, 130, 246, 0.15)' :
                                skill.color === 'green' ? 'rgba(16, 185, 129, 0.15)' :
                                  skill.color === 'purple' ? 'rgba(139, 92, 246, 0.15)' :
                                    'rgba(59, 130, 246, 0.15)',
                              color: skill.color === 'blue' ? '#3B82F6' :
                                skill.color === 'green' ? '#10B981' :
                                  skill.color === 'purple' ? '#8B5CF6' :
                                    '#3B82F6',
                              border: `1px solid ${skill.color === 'blue' ? 'rgba(59, 130, 246, 0.2)' :
                                skill.color === 'green' ? 'rgba(16, 185, 129, 0.2)' :
                                  skill.color === 'purple' ? 'rgba(139, 92, 246, 0.2)' :
                                    'rgba(59, 130, 246, 0.2)'}`,
                              backdropFilter: 'blur(10px)'
                            }}
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 模态框 - 个人资料 */}
      <ProfileModal
        isOpen={modalOpen.personal}
        onClose={() => closeModal('personal')}
      />

      {/* 模态框 - 学习进度 */}
      <AnimatePresence>
        {modalOpen.stats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-md flex items-center justify-center z-[1000]"
            onClick={() => closeModal('stats')}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative overflow-hidden bg-white/60 dark:bg-gray-900/70 dark:border-gray-600/20"
              style={{
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(30px) saturate(200%)',
                width: '90%',
                maxWidth: '900px',
                maxHeight: '85vh'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 云母效果背景层 */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 dark:from-gray-700/10 dark:via-transparent dark:to-gray-700/5 pointer-events-none"></div>

              {/* 噪点纹理 */}
              <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  backgroundSize: '256px 256px'
                }}
              ></div>

              {/* 动态光影效果 */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-gray-400/30"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-gray-500/20"></div>

              {/* 模态框头部 */}
              <div
                className="relative z-10 border-b border-white/20 dark:border-gray-700/30 p-6 bg-white/40 dark:bg-gray-800/60"
                style={{
                  borderTopLeftRadius: '20px',
                  borderTopRightRadius: '20px',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <AppleStyleIcon
                      colorScheme="indigo"
                      size="lg"
                    >
                      <AppleLearningIcon className="w-6 h-6 text-white" />
                    </AppleStyleIcon>
                    <div className="ml-3">
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">学习进度详情</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">我的学习成长轨迹</p>
                    </div>
                  </div>
                  <button
                    className="w-10 h-10 rounded-full bg-white/30 hover:bg-white/40 dark:bg-gray-700/50 dark:hover:bg-gray-600/60 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                    onClick={() => closeModal('stats')}
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </button>
                </div>
              </div>

              {/* 模态框内容 */}
              <div
                className="relative z-10 p-6 overflow-y-auto bg-white/20 dark:bg-gray-800/40"
                style={{
                  backdropFilter: 'blur(15px) saturate(150%)',
                  borderBottomLeftRadius: '20px',
                  borderBottomRightRadius: '20px',
                  maxHeight: 'calc(85vh - 120px)'
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {myLearningProgress.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="group relative bg-white/30 dark:bg-gray-800/50 border border-white/15 dark:border-gray-600/30"
                      style={{
                        backdropFilter: 'blur(25px) saturate(180%)',
                        borderRadius: '16px',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                        padding: '24px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {/* 进度装饰条 */}
                      <div
                        className="absolute top-0 left-0 h-full w-1 rounded-l-2xl"
                        style={{
                          background: item.color === 'blue' ? 'linear-gradient(180deg, #3B82F6, #60A5FA)' :
                            item.color === 'green' ? 'linear-gradient(180deg, #10B981, #34D399)' :
                              item.color === 'yellow' ? 'linear-gradient(180deg, #F59E0B, #FCD34D)' :
                                item.color === 'orange' ? 'linear-gradient(180deg, #F97316, #FB923C)' :
                                  item.color === 'indigo' ? 'linear-gradient(180deg, #4F46E5, #6366F1)' :
                                    item.color === 'red' ? 'linear-gradient(180deg, #EF4444, #F87171)' :
                                      item.color === 'purple' ? 'linear-gradient(180deg, #8B5CF6, #A78BFA)' :
                                        item.color === 'pink' ? 'linear-gradient(180deg, #EC4899, #F472B6)' :
                                          'linear-gradient(180deg, #3B82F6, #60A5FA)'
                        }}
                      ></div>

                      {/* 卡片头部 */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center mr-3 shadow-lg"
                            style={{
                              background: item.color === 'blue' ? 'linear-gradient(135deg, #3B82F6, #60A5FA)' :
                                item.color === 'green' ? 'linear-gradient(135deg, #10B981, #34D399)' :
                                  item.color === 'yellow' ? 'linear-gradient(135deg, #F59E0B, #FCD34D)' :
                                    item.color === 'orange' ? 'linear-gradient(135deg, #F97316, #FB923C)' :
                                      item.color === 'indigo' ? 'linear-gradient(135deg, #4F46E5, #6366F1)' :
                                        item.color === 'red' ? 'linear-gradient(135deg, #EF4444, #F87171)' :
                                          item.color === 'purple' ? 'linear-gradient(135deg, #8B5CF6, #A78BFA)' :
                                            item.color === 'pink' ? 'linear-gradient(135deg, #EC4899, #F472B6)' :
                                              'linear-gradient(135deg, #3B82F6, #60A5FA)'
                            }}
                          >
                            <AppleLearningIcon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{item.name}</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {parseInt(item.value) < 30 ? '🌱 初学阶段' :
                                parseInt(item.value) < 60 ? '📈 进阶阶段' :
                                  parseInt(item.value) < 80 ? '🎯 熟练阶段' : '🏆 精通阶段'}
                            </p>
                          </div>
                        </div>
                        <div
                          className="px-3 py-1.5 rounded-lg text-xs font-medium backdrop-blur-sm"
                          style={{
                            backgroundColor: item.color === 'blue' ? 'rgba(59, 130, 246, 0.15)' :
                              item.color === 'green' ? 'rgba(16, 185, 129, 0.15)' :
                                item.color === 'yellow' ? 'rgba(245, 158, 11, 0.15)' :
                                  item.color === 'orange' ? 'rgba(249, 115, 22, 0.15)' :
                                    item.color === 'indigo' ? 'rgba(79, 70, 229, 0.15)' :
                                      item.color === 'red' ? 'rgba(239, 68, 68, 0.15)' :
                                        item.color === 'purple' ? 'rgba(139, 92, 246, 0.15)' :
                                          item.color === 'pink' ? 'rgba(236, 72, 153, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                            color: item.color === 'blue' ? '#3B82F6' :
                              item.color === 'green' ? '#10B981' :
                                item.color === 'yellow' ? '#F59E0B' :
                                  item.color === 'orange' ? '#F97316' :
                                    item.color === 'indigo' ? '#4F46E5' :
                                      item.color === 'red' ? '#EF4444' :
                                        item.color === 'purple' ? '#8B5CF6' :
                                          item.color === 'pink' ? '#EC4899' : '#3B82F6',
                            border: `1px solid ${item.color === 'blue' ? 'rgba(59, 130, 246, 0.2)' :
                              item.color === 'green' ? 'rgba(16, 185, 129, 0.2)' :
                                item.color === 'yellow' ? 'rgba(245, 158, 11, 0.2)' :
                                  item.color === 'orange' ? 'rgba(249, 115, 22, 0.2)' :
                                    item.color === 'indigo' ? 'rgba(79, 70, 229, 0.2)' :
                                      item.color === 'red' ? 'rgba(239, 68, 68, 0.2)' :
                                        item.color === 'purple' ? 'rgba(139, 92, 246, 0.2)' :
                                          item.color === 'pink' ? 'rgba(236, 72, 153, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`
                          }}
                        >
                          {item.value}
                        </div>
                      </div>

                      {/* 进度显示区域 */}
                      <div className="mb-6">
                        <div className="flex items-end justify-between mb-3">
                          <div className="flex items-baseline">
                            <span
                              className="text-3xl font-light mr-1"
                              style={{
                                color: item.color === 'blue' ? '#3B82F6' :
                                  item.color === 'green' ? '#10B981' :
                                    item.color === 'yellow' ? '#F59E0B' :
                                      item.color === 'orange' ? '#F97316' :
                                        item.color === 'indigo' ? '#4F46E5' :
                                          item.color === 'red' ? '#EF4444' :
                                            item.color === 'purple' ? '#8B5CF6' :
                                              item.color === 'pink' ? '#EC4899' : '#3B82F6'
                              }}
                            >
                              {parseInt(item.value)}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">%</span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">目标: 100%</span>
                        </div>

                        {/* 进度条 */}
                        <div className="relative">
                          <div className="h-2 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: item.value }}
                              transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                              className="h-full rounded-full relative overflow-hidden"
                              style={{
                                background: item.color === 'blue' ? 'linear-gradient(90deg, #3B82F6, #60A5FA)' :
                                  item.color === 'green' ? 'linear-gradient(90deg, #10B981, #34D399)' :
                                    item.color === 'yellow' ? 'linear-gradient(90deg, #F59E0B, #FCD34D)' :
                                      item.color === 'orange' ? 'linear-gradient(90deg, #F97316, #FB923C)' :
                                        item.color === 'indigo' ? 'linear-gradient(90deg, #4F46E5, #6366F1)' :
                                          item.color === 'red' ? 'linear-gradient(90deg, #EF4444, #F87171)' :
                                            item.color === 'purple' ? 'linear-gradient(90deg, #8B5CF6, #A78BFA)' :
                                              item.color === 'pink' ? 'linear-gradient(90deg, #EC4899, #F472B6)' :
                                                'linear-gradient(90deg, #3B82F6, #60A5FA)',
                                boxShadow: `0 0 10px ${item.color === 'blue' ? 'rgba(59, 130, 246, 0.3)' :
                                  item.color === 'green' ? 'rgba(16, 185, 129, 0.3)' :
                                    item.color === 'yellow' ? 'rgba(245, 158, 11, 0.3)' :
                                      item.color === 'orange' ? 'rgba(249, 115, 22, 0.3)' :
                                        item.color === 'indigo' ? 'rgba(79, 70, 229, 0.3)' :
                                          item.color === 'red' ? 'rgba(239, 68, 68, 0.3)' :
                                            item.color === 'purple' ? 'rgba(139, 92, 246, 0.3)' :
                                              item.color === 'pink' ? 'rgba(236, 72, 153, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`
                              }}
                            >
                              {/* 进度条光泽效果 */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            </motion.div>
                          </div>

                          {/* 进度刻度 */}
                          <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                            <span>0</span>
                            <span>25</span>
                            <span>50</span>
                            <span>75</span>
                            <span>100</span>
                          </div>
                        </div>
                      </div>

                      {/* 描述文本 */}
                      <div className="pt-4 border-t border-white/20 dark:border-gray-700/30">
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 模态框 - 我的设备 */}
      <AnimatePresence>
        {modalOpen.devices && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-md flex items-center justify-center z-[1000]"
            onClick={() => closeModal('devices')}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/85 dark:bg-gray-900/85 border border-white/20 dark:border-gray-700/30"
              style={{
                borderRadius: '24px',
                boxShadow: '0 32px 64px rgba(0, 0, 0, 0.15), 0 16px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(40px) saturate(180%)',
                width: '90%',
                maxWidth: '900px',
                maxHeight: '85vh',
                position: 'relative' as const,
                overflow: 'hidden'
              }}
            >
              {/* Mica 效果背景层 */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-white/80 dark:from-gray-800/90 dark:via-gray-800/70 dark:to-gray-800/80"
                style={{
                  zIndex: 1
                }}
              />

              {/* 噪点纹理层 */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
                  zIndex: 2
                }}
              />

              {/* 动态光影效果 */}
              <div
                style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'radial-gradient(circle at 30% 20%, rgba(255, 159, 10, 0.08) 0%, transparent 50%)',
                  zIndex: 3,
                  pointerEvents: 'none'
                }}
              />

              {/* 模态框头部 */}
              <div
                className="flex justify-between items-center p-6 pb-4 bg-gradient-to-br from-white/95 to-white/85 dark:from-gray-800/95 dark:to-gray-800/85"
                style={{
                  position: 'relative',
                  zIndex: 10,
                  borderTopLeftRadius: '24px',
                  borderTopRightRadius: '24px',
                  backdropFilter: 'blur(20px)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="flex items-center">
                  <AppleStyleIcon
                    colorScheme="orange"
                    size="lg"
                  >
                    <AppleDeviceIcon className="w-6 h-6 text-white" />
                  </AppleStyleIcon>
                  <div className="ml-3">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">我的设备详情</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">管理和查看您的所有设备信息</p>
                  </div>
                </div>
                <button
                  className="w-10 h-10 rounded-full bg-gray-100/80 hover:bg-gray-200/80 dark:bg-gray-700/50 dark:hover:bg-gray-600/60 flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/30"
                  onClick={() => closeModal('devices')}
                  style={{
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <XMarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              {/* 模态框主要内容 */}
              <div
                className="p-6 pt-2 bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-800/80"
                style={{
                  position: 'relative',
                  zIndex: 10,
                  backdropFilter: 'blur(20px)',
                  borderBottomLeftRadius: '24px',
                  borderBottomRightRadius: '24px',
                  maxHeight: 'calc(85vh - 120px)',
                  overflowY: 'auto'
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {myDevices.map((device, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="group bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-800/70 border border-white/30 dark:border-gray-600/30 rounded-[20px] overflow-hidden transition-all duration-300"
                      style={{
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)';
                      }}
                    >
                      {/* 装饰性顶部边框 */}
                      <div
                        style={{
                          height: '4px',
                          background: `linear-gradient(90deg, ${appleColors.orange.start}, ${appleColors.orange.end})`,
                          boxShadow: `0 2px 8px ${appleColors.orange.shadow}`
                        }}
                      />

                      <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                        <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                          <img
                            src={device.image}
                            alt={device.name}
                            className="w-full h-full object-contain p-6 transition-all duration-500 group-hover:scale-110"
                            style={{
                              willChange: 'transform',
                              filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))'
                            }}
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
                          <div className="flex items-center mb-2">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                              style={{
                                background: `linear-gradient(135deg, ${appleColors.orange.start}, ${appleColors.orange.end})`,
                                boxShadow: `0 4px 12px ${appleColors.orange.shadow}`
                              }}
                            >
                              <AppleDeviceIcon className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white drop-shadow-lg">{device.name}</h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {device.tags.map((tag, tagIndex) => (
                              <motion.span
                                key={tagIndex}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: (index * 0.1) + (tagIndex * 0.05), duration: 0.3 }}
                                className="px-3 py-1 text-xs rounded-full text-white backdrop-blur-md border border-white/30 hover:border-white/50 transition-all duration-200 bg-white/20 dark:bg-gray-800/40"
                                style={{
                                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                                }}
                              >
                                {tag.name}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-5">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">{device.description}</p>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div
                            className="rounded-xl p-3 flex flex-col items-center justify-center transition-all duration-200 hover:scale-105 bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-800/60 border border-white/30 dark:border-gray-600/30"
                            style={{
                              backdropFilter: 'blur(10px)',
                              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)'
                            }}
                          >
                            <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">购买日期</span>
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{device.specs.purchaseDate}</span>
                          </div>
                          <div
                            className="rounded-xl p-3 flex flex-col items-center justify-center transition-all duration-200 hover:scale-105 bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-800/60 border border-white/30 dark:border-gray-600/30"
                            style={{
                              backdropFilter: 'blur(10px)',
                              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)'
                            }}
                          >
                            <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">保修状态</span>
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{device.specs.warranty}</span>
                          </div>
                        </div>

                        <div className="mb-4 flex items-center p-3 rounded-xl bg-gradient-to-br from-white/70 to-white/50 dark:from-gray-800/70 dark:to-gray-800/50 border border-white/30 dark:border-gray-600/30"
                          style={{
                            backdropFilter: 'blur(10px)'
                          }}
                        >
                          <div
                            className="w-4 h-4 rounded-full mr-3 shadow-lg"
                            style={{
                              backgroundColor: device.specs.condition === '良好' ? '#34D399' :
                                device.specs.condition === '一般' ? '#FBBF24' :
                                  device.specs.condition === '需要维修' ? '#F87171' : '#60A5FA',
                              boxShadow: `0 2px 8px ${device.specs.condition === '良好' ? 'rgba(52, 211, 153, 0.3)' :
                                device.specs.condition === '一般' ? 'rgba(251, 191, 36, 0.3)' :
                                  device.specs.condition === '需要维修' ? 'rgba(248, 113, 113, 0.3)' : 'rgba(96, 165, 250, 0.3)'}`
                            }}
                          ></div>
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">状态: {device.specs.condition}</span>
                        </div>

                        <div className="border-t pt-4 border-gray-200/50 dark:border-gray-600/30">
                          <h4 className="text-sm font-semibold mb-3 text-gray-800 dark:text-gray-200 flex items-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                            设备详情
                          </h4>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
                            {device.specs.details.map((detail, detailIndex) => (
                              <motion.li
                                key={detailIndex}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (index * 0.1) + (detailIndex * 0.05), duration: 0.3 }}
                                className="flex items-start p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-200"
                              >
                                <span className="mr-2 text-blue-500 font-bold">•</span>
                                <span className="leading-relaxed">{detail}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 模态框 - 倒计时 */}
      <AnimatePresence>
        {modalOpen.countdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-md flex items-center justify-center z-[1000]"
            onClick={() => closeModal('countdown')}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/85 dark:bg-gray-800/85 border border-white/40 dark:border-gray-600/40"
              style={{
                borderRadius: '24px',
                boxShadow: '0 32px 64px rgba(0, 0, 0, 0.12), 0 16px 32px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.04)',
                backdropFilter: 'blur(40px) saturate(1.8)',
                width: '90%',
                maxWidth: '900px',
                maxHeight: '85vh',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Mica 效果背景层 */}
              <div
                className="bg-white/90 dark:bg-gray-800/90"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1
                }}
              />

              {/* 噪点纹理层 */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
                  zIndex: 2
                }}
              />

              {/* 动态光影效果 */}
              <div
                style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'radial-gradient(circle at 30% 20%, rgba(100, 210, 255, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(94, 92, 230, 0.06) 0%, transparent 50%)',
                  zIndex: 3,
                  pointerEvents: 'none'
                }}
              />

              {/* 模态框头部 */}
              <div
                className="flex justify-between items-center p-6 pb-4 bg-white/95 dark:bg-gray-800/95"
                style={{
                  position: 'relative',
                  zIndex: 10,
                  borderTopLeftRadius: '24px',
                  borderTopRightRadius: '24px',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 1px 0 rgba(255, 255, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                }}
              >
                <div className="flex items-center">
                  <AppleStyleIcon
                    colorScheme="teal"
                    size="md"
                  >
                    <ClockIcon className="w-5 h-5 text-white" />
                  </AppleStyleIcon>
                  <div className="ml-3">
                    <h2 className="text-2xl font-bold dark:text-gray-100 text-[#2c2c2e]">倒计日</h2>
                  </div>
                </div>
                <button
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'rgba(0, 0, 0, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.08)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  onClick={() => closeModal('countdown')}
                >
                  <XMarkIcon className="w-5 h-5 dark:text-gray-300 text-gray-600" />
                </button>
              </div>

              {/* 模态框主要内容 */}
              <div
                className="p-6 pt-2 bg-white/90 dark:bg-gray-800/90"
                style={{
                  position: 'relative',
                  zIndex: 10,
                  backdropFilter: 'blur(20px)',
                  borderBottomLeftRadius: '24px',
                  borderBottomRightRadius: '24px',
                  maxHeight: 'calc(85vh - 120px)',
                  overflowY: 'auto'
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="rounded-2xl overflow-hidden shadow-lg mb-6 bg-white/95 dark:bg-gray-800/95 border border-white/30 dark:border-gray-600/30"
                  style={{
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.04)'
                  }}
                >
                  <div className="relative p-6 pb-4">
                    {/* 装饰性顶部边框 */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: `linear-gradient(90deg, ${appleColors.teal.start}, ${appleColors.teal.end})`,
                        boxShadow: `0 2px 8px ${appleColors.teal.shadow}`
                      }}
                    />

                    {/* 背景装饰 */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-green-400/10 to-yellow-500/10 rounded-full blur-xl pointer-events-none"></div>

                    {/* 主倒计时显示 */}
                    <div className="flex flex-col items-center md:flex-row md:items-start mb-6 relative">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                        className="relative w-32 h-32 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg mb-4 md:mb-0 overflow-hidden group"
                        style={{
                          background: `linear-gradient(135deg, ${appleColors.teal.start}, ${appleColors.teal.end})`,
                          boxShadow: `0 8px 24px ${appleColors.teal.shadow}, 0 4px 12px rgba(0, 0, 0, 0.1)`
                        }}
                      >
                        <div className="absolute inset-0 backdrop-blur-sm bg-white/5"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                        <div className="z-10 text-center">
                          <div className="text-6xl font-bold drop-shadow-lg">{daysLeft}</div>
                          <div className="text-sm font-medium text-center text-white/90">剩余天数</div>
                        </div>
                      </motion.div>

                      <div className="md:ml-6 flex-grow">
                        <motion.h3
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                          className="text-2xl font-bold text-center md:text-left mb-3 dark:text-gray-100 text-gray-800"
                        >
                          {getMainCountdown(countdownData).title}
                        </motion.h3>

                        <motion.div
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                          className="h-3 w-full rounded-full overflow-hidden mb-3 shadow-inner"
                          style={{
                            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.1) 100%)',
                            border: '1px solid rgba(255, 255, 255, 0.3)'
                          }}
                        >
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${calculateProgress(getMainCountdown(countdownData))}%`,
                              background: `linear-gradient(90deg, ${appleColors.teal.start}, ${appleColors.teal.end})`,
                              boxShadow: `0 0 12px ${appleColors.teal.shadow}`
                            }}
                          ></div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                          className="flex justify-between text-sm dark:text-gray-400 text-gray-600 mb-4"
                        >
                          <span>开始日期: {getMainCountdown(countdownData).Startdate}</span>
                          <span>目标日期: {getMainCountdown(countdownData).targetDate}</span>
                        </motion.div>

                        <div className="grid grid-cols-3 gap-3 mt-4">
                          {[
                            {
                              label: '已过天数',
                              value: getMainCountdown(countdownData)?.Startdate ? calculatePassedDays(getMainCountdown(countdownData).Startdate) : 0,
                              color: appleColors.green
                            },
                            {
                              label: '总天数',
                              value: (getMainCountdown(countdownData)?.Startdate && getMainCountdown(countdownData)?.targetDate) ?
                                calculateTotalDays(getMainCountdown(countdownData).Startdate, getMainCountdown(countdownData).targetDate) : 0,
                              color: appleColors.blue
                            },
                            {
                              label: '完成度',
                              value: `${Math.round(calculateProgress(getMainCountdown(countdownData)))}%`,
                              color: appleColors.purple
                            }
                          ].map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                              className="rounded-lg p-3 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 group"
                              style={{
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = `0 8px 24px ${item.color.shadow}`;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                              }}
                            >
                              <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</span>
                              <span
                                className="text-lg font-medium"
                                style={{ color: item.color.start }}
                              >
                                {item.value}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 其他倒计时列表 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="rounded-2xl overflow-hidden bg-white/95 dark:bg-gray-800/95 border border-white/30 dark:border-gray-600/30"
                  style={{
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.04)'
                  }}
                >
                  <div className="px-6 pt-4 pb-6">
                    <motion.h4
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                      className="text-lg font-medium mb-4 dark:text-gray-100 text-gray-800 flex items-center"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                        style={{
                          background: `linear-gradient(135deg, ${appleColors.teal.start}, ${appleColors.teal.end})`,
                          boxShadow: `0 4px 12px ${appleColors.teal.shadow}`
                        }}
                      >
                        <CalendarIcon className="w-4 h-4 text-white" />
                      </div>
                      所有倒计时
                    </motion.h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* 主倒计时卡片 */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.0, duration: 0.5 }}
                        className="rounded-xl p-4 relative overflow-hidden group cursor-pointer"
                        style={{
                          background: 'linear-gradient(135deg, rgba(100, 210, 255, 0.1) 0%, rgba(94, 92, 230, 0.1) 100%)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(100, 210, 255, 0.2)',
                          boxShadow: '0 8px 24px rgba(100, 210, 255, 0.1)'
                        }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* 装饰性左边框 */}
                        <div
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: '4px',
                            background: `linear-gradient(180deg, ${appleColors.teal.start}, ${appleColors.teal.end})`,
                            boxShadow: `2px 0 8px ${appleColors.teal.shadow}`
                          }}
                        />

                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition-all duration-300"></div>
                        <div className="flex items-center justify-between mb-3 relative">
                          <h5 className="font-semibold text-blue-700 dark:text-blue-400">{getMainCountdown(countdownData).title}</h5>
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.2, duration: 0.3 }}
                            className="py-1 px-3 text-xs rounded-full text-white"
                            style={{
                              background: `linear-gradient(135deg, ${appleColors.teal.start}, ${appleColors.teal.end})`,
                              boxShadow: `0 2px 8px ${appleColors.teal.shadow}`
                            }}
                          >
                            主要
                          </motion.span>
                        </div>
                        <div className="flex items-center justify-between relative">
                          <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-blue-700 dark:text-blue-400">{daysLeft}</span>
                            <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">天</span>
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">{getMainCountdown(countdownData).targetDate}</span>
                        </div>
                        <div className="mt-3 h-2 w-full rounded-full overflow-hidden relative"
                          style={{
                            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.1) 100%)',
                            border: '1px solid rgba(255, 255, 255, 0.3)'
                          }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${calculateProgress(getMainCountdown(countdownData))}%` }}
                            transition={{ delay: 1.3, duration: 1.2, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${appleColors.teal.start}, ${appleColors.teal.end})`,
                              boxShadow: `0 0 12px ${appleColors.teal.shadow}`
                            }}
                          ></motion.div>
                        </div>
                      </motion.div>

                      {/* 其他倒计时卡片 */}
                      {countdownData.filter(item => !item.top).map((item, index) => {
                        const colors = [appleColors.green, appleColors.orange];
                        const color = colors[index % colors.length];

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
                            className="rounded-xl p-4 relative overflow-hidden group cursor-pointer"
                            style={{
                              background: `linear-gradient(135deg, ${color.start}15, ${color.end}10)`,
                              backdropFilter: 'blur(10px)',
                              border: `1px solid ${color.start}30`,
                              boxShadow: `0 8px 24px ${color.shadow}`
                            }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {/* 装饰性左边框 */}
                            <div
                              style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: '4px',
                                background: `linear-gradient(180deg, ${color.start}, ${color.end})`,
                                boxShadow: `2px 0 8px ${color.shadow}`
                              }}
                            />

                            <div className="flex items-center justify-between mb-3">
                              <h5 className="font-semibold" style={{ color: color.start }}>
                                {item.title}
                              </h5>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-baseline">
                                <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">{calculateDaysLeft(item.targetDate)}</span>
                                <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">天</span>
                              </div>
                              <span className="text-xs text-gray-600 dark:text-gray-400">{item.targetDate}</span>
                            </div>
                            <div className="mt-3 h-2 w-full rounded-full overflow-hidden"
                              style={{
                                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.1) 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.3)'
                              }}
                            >
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${calculateProgress(item)}%` }}
                                transition={{ delay: 1.4 + index * 0.1, duration: 1.2, ease: "easeOut" }}
                                className="h-full rounded-full"
                                style={{
                                  background: `linear-gradient(90deg, ${color.start}, ${color.end})`,
                                  boxShadow: `0 0 12px ${color.shadow}`
                                }}
                              ></motion.div>
                            </div>
                          </motion.div>
                        );
                      })}

                      {/* 添加新倒计时按钮卡片 */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.3, duration: 0.5 }}
                        className="rounded-xl flex items-center justify-center p-4 cursor-pointer group transition-all duration-300"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
                          backdropFilter: 'blur(10px)',
                          border: '2px dashed rgba(0, 0, 0, 0.1)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                        }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = appleColors.blue.start + '50';
                          e.currentTarget.style.boxShadow = `0 8px 24px ${appleColors.blue.shadow}`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${appleColors.blue.start}, ${appleColors.blue.end})`,
                            boxShadow: `0 4px 12px ${appleColors.blue.shadow}`
                          }}
                        >
                          <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors font-medium">添加新倒计时</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* 底部提示区 */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="px-6 py-3 text-xs text-gray-500 dark:text-gray-400 border-t border-white/30 dark:border-gray-600/30 bg-white/70 dark:bg-gray-800/70"
                    style={{
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    💡 提示: 您可以点击每个倒计时卡片查看详细信息，或者添加新的倒计时事件。
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 模态框 - 最新博客 */}
      <AnimatePresence>
        {modalOpen.blogs && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-md flex items-center justify-center z-[1000]"
            onClick={() => closeModal('blogs')}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                borderRadius: '24px',
                boxShadow: '0 32px 64px rgba(0, 0, 0, 0.12), 0 16px 32px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(40px)',
                width: '90%',
                maxWidth: '900px',
                maxHeight: '85vh',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Mica 效果背景层 */}
              <div
                className="absolute inset-0 bg-white/90 dark:bg-gray-800/90"
                style={{
                  zIndex: 1
                }}
              />

              {/* 噪点纹理层 */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
                  zIndex: 2
                }}
              />

              {/* 动态光影效果 */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at 30% 20%, rgba(255, 105, 180, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(138, 43, 226, 0.06) 0%, transparent 50%)',
                  zIndex: 3
                }}
              />

              {/* 模态框头部 */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex justify-between items-center p-6 pb-4 bg-white/95 dark:bg-gray-800/95"
                style={{
                  position: 'relative',
                  zIndex: 10,
                  borderTopLeftRadius: '24px',
                  borderTopRightRadius: '24px',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 1px 0 rgba(255, 255, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                }}
              >
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                    style={{
                      background: `linear-gradient(135deg, ${appleColors.pink.start}, ${appleColors.pink.end})`,
                      boxShadow: `0 8px 20px ${appleColors.pink.shadow}, 0 4px 8px rgba(0, 0, 0, 0.1)`
                    }}
                  >
                    <DocumentTextIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="text-lg font-semibold text-gray-800"
                    >
                      我的博客文章
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="text-sm text-gray-600 mt-1"
                    >
                      从 blog.damesck.net 获取的最新内容
                    </motion.p>
                  </div>
                </div>
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 bg-white/90 dark:bg-gray-700/90 border border-white/50 dark:border-gray-600/50"
                  style={{
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                  onClick={() => closeModal('blogs')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow = `0 8px 24px ${appleColors.red.shadow}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <XMarkIcon className="w-5 h-5 text-gray-600" />
                </motion.button>
              </motion.div>

              {/* 主内容区域 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="bg-white/95 dark:bg-gray-800/95"
                style={{
                  position: 'relative',
                  zIndex: 10,
                  backdropFilter: 'blur(20px)',
                  borderBottomLeftRadius: '24px',
                  borderBottomRightRadius: '24px',
                  maxHeight: 'calc(85vh - 120px)',
                  overflowY: 'auto'
                }}
              >
                {apiError ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="flex flex-col items-center justify-center p-8 text-center"
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                      style={{
                        background: `linear-gradient(135deg, ${appleColors.red.start}, ${appleColors.red.end})`,
                        boxShadow: `0 8px 20px ${appleColors.red.shadow}`
                      }}
                    >
                      <XMarkIcon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-red-600 mb-2 font-semibold text-lg">请求失败 (错误代码: {apiError.code})</div>
                    <div className="text-sm text-gray-700 mb-3 max-w-md">{apiError.message}</div>
                    {apiError.details && (
                      <div className="text-xs text-gray-500 max-w-md mb-6 leading-relaxed">{apiError.details}</div>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={fetchBlogPosts}
                      className="px-6 py-3 text-white rounded-xl text-sm font-medium transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${appleColors.blue.start}, ${appleColors.blue.end})`,
                        boxShadow: `0 8px 20px ${appleColors.blue.shadow}`
                      }}
                    >
                      重新获取
                    </motion.button>
                  </motion.div>
                ) : (
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {blogPosts.length > 0 ?
                        blogPosts.slice(0, 4).map((blog, index) => {
                          const colors = [appleColors.blue, appleColors.green, appleColors.purple, appleColors.orange];
                          const color = colors[index % colors.length];

                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                              className="rounded-xl p-4 h-full flex flex-col cursor-pointer group relative overflow-hidden"
                              style={{
                                background: `linear-gradient(135deg, ${color.start}10, ${color.end}08)`,
                                backdropFilter: 'blur(10px)',
                                border: `1px solid ${color.start}20`,
                                boxShadow: `0 8px 24px ${color.shadow}`
                              }}
                              whileHover={{ scale: 1.02, y: -4 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {/* 装饰性左边框 */}
                              <div
                                style={{
                                  position: 'absolute',
                                  left: 0,
                                  top: 0,
                                  bottom: 0,
                                  width: '4px',
                                  background: `linear-gradient(180deg, ${color.start}, ${color.end})`,
                                  boxShadow: `2px 0 8px ${color.shadow}`
                                }}
                              />

                              {/* 渐变图标背景 */}
                              <div className="flex items-center mb-3">
                                <div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                                  style={{
                                    background: `linear-gradient(135deg, ${color.start}, ${color.end})`,
                                    boxShadow: `0 4px 12px ${color.shadow}`
                                  }}
                                >
                                  <DocumentTextIcon className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-sm text-gray-800 line-clamp-2 leading-tight">
                                    {blog.title}
                                  </h4>
                                </div>
                              </div>

                              <p className="text-xs text-gray-600 line-clamp-4 mb-auto leading-relaxed">
                                {blog.summary}
                              </p>

                              <div className="mt-4 pt-3 border-t border-gray-200/50">
                                <div className="flex gap-1 flex-wrap mb-2">
                                  {blog.tags.slice(0, 2).map((tag, tagIndex) => (
                                    <motion.span
                                      key={tagIndex}
                                      initial={{ opacity: 0, scale: 0 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: 1.0 + index * 0.1 + tagIndex * 0.05, duration: 0.3 }}
                                      className="px-2 py-1 text-xs rounded-md text-white font-medium"
                                      style={{
                                        background: `linear-gradient(135deg, ${color.start}80, ${color.end}60)`,
                                        boxShadow: `0 2px 8px ${color.shadow}`
                                      }}
                                    >
                                      {tag.name}
                                    </motion.span>
                                  ))}
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                  <span>{blog.date}</span>
                                  <span className="flex items-center">
                                    <ClockIcon className="w-3 h-3 mr-1" />
                                    {blog.readTime}
                                  </span>
                                </div>
                              </div>

                              {/* 悬停时的光效 */}
                              <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                style={{
                                  background: `radial-gradient(circle at 50% 50%, ${color.start}15 0%, transparent 70%)`
                                }}
                              />
                            </motion.div>
                          );
                        }) :
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8, duration: 0.5 }}
                          className="col-span-full flex flex-col items-center justify-center p-8 text-center"
                        >
                          <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                            style={{
                              background: `linear-gradient(135deg, ${appleColors.indigo.start}, ${appleColors.indigo.end})`,
                              boxShadow: `0 8px 20px ${appleColors.indigo.shadow}`
                            }}
                          >
                            <DocumentTextIcon className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-sm text-gray-600 font-medium">暂无博客数据</p>
                          <p className="text-xs text-gray-500 mt-2">请稍后再试或检查网络连接</p>
                        </motion.div>
                      }
                    </div>

                    {/* 底部提示区 */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                      className="mt-6 pt-4 border-t border-gray-200/50 text-center"
                    >
                      <p className="text-xs text-gray-500">
                        💡 点击卡片可查看完整文章内容
                      </p>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;
