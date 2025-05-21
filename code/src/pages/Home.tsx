// @ts-ignore - 暂时忽略LaptopIcon未导出错误
// @ts-ignore - 暂时忽略找不到../components/Icons错误
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CodeBracketIcon,
  WrenchScrewdriverIcon,
  DocumentTextIcon,
  CalendarIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  BookOpenIcon,
  EnvelopeIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  ClockIcon as WatchIcon,
  ArrowRightIcon,
  XMarkIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

// 导入旧数据用于兼容
import portfolioData from '../data/portfolioData.json';

// 导入博客数据
import { blogData } from '../data/blog/data';

// 导入卡片数据
import personalInfo from '../data/cards/personalInfo.json';
import skills from '../data/cards/skills.json';
import learningProgress from '../data/cards/learningProgress.json';
import devices from '../data/cards/devices.json';
import countdown from '../data/cards/countdown.json';
import socialLinks from '../data/cards/socialLinks.json';

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

// 定义默认博客文章类型（来自portfolioData）
interface DefaultBlogPost {
  title: string;
  summary: string;
  date: string;
  readTime: string;
  tags: Array<{
    name: string;
    color: string;
  }>;
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

// Apple风格的主题颜色
const appleColors = {
  blue: { start: '#0A84FF', end: '#0066CC', shadow: 'rgba(10, 132, 255, 0.3)' },
  green: { start: '#30D158', end: '#248A3D', shadow: 'rgba(48, 209, 88, 0.3)' },
  indigo: { start: '#5E5CE6', end: '#3634A3', shadow: 'rgba(94, 92, 230, 0.3)' },
  orange: { start: '#FF9F0A', end: '#C67608', shadow: 'rgba(255, 159, 10, 0.3)' },
  pink: { start: '#FF375F', end: '#C31C3D', shadow: 'rgba(255, 55, 95, 0.3)' },
  purple: { start: '#BF5AF2', end: '#8944AB', shadow: 'rgba(191, 90, 242, 0.3)' },
  red: { start: '#FF453A', end: '#D70015', shadow: 'rgba(255, 69, 58, 0.3)' },
  teal: { start: '#64D2FF', end: '#5AC8FA', shadow: 'rgba(100, 210, 255, 0.3)' },
  yellow: { start: '#FFD60A', end: '#D6AD00', shadow: 'rgba(255, 214, 10, 0.3)' },
};

// 添加Apple风格的图标组件
const AppleStyleIcon = ({
  children,
  colorScheme = 'blue',
  customColors = null,
  size = 'md'
}: {
  children: React.ReactNode;
  colorScheme?: keyof typeof appleColors | 'custom';
  customColors?: { start: string; end: string; shadow: string } | null;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const colors = colorScheme === 'custom' && customColors
    ? customColors
    : appleColors[colorScheme as keyof typeof appleColors];

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const iconSizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div
      className={`relative ${sizeClasses[size]} rounded-xl flex items-center justify-center`}
      style={{
        background: `linear-gradient(135deg, ${colors.start}, ${colors.end})`,
        boxShadow: `0 4px 10px ${colors.shadow}`,
      }}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-40 bg-white/30"
        style={{
          backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.4) 0%, transparent 50%)'
        }}
      ></div>
      <div className={`${iconSizeClasses[size]} text-white`}>
        {children}
      </div>
    </div>
  );
};

// iOS/iCloud风格的卡片样式
const iosCardStyle = {
  backgroundColor: 'var(--card-bg)',
  borderRadius: '20px',
  boxShadow: '0 4px 16px var(--glass-shadow), 0 2px 4px rgba(0,0,0,0.04)',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
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

// 标题悬停效果
const headerHoverStyle = {
  backgroundColor: 'var(--hover-bg)',
  boxShadow: 'inset 0 0 5px var(--glass-shadow), inset 0 0 0 1px rgba(0,0,0,0.05)',
  transform: 'translateY(1px)'
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

// 模态框背景
const modalOverlayStyle = {
  position: 'fixed' as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

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
        // 如果本地数据格式不正确，回退到 portfolioData.blogs
        const fallbackBlogs: BlogPost[] = portfolioData.blogs.map((blog: DefaultBlogPost, index: number) => ({
          cid: index,
          title: blog.title,
          slug: `blog-${index}`,
          created: Date.now(),
          modified: Date.now(),
          text: blog.summary,
          summary: blog.summary,
          date: blog.date,
          readTime: blog.readTime,
          categories: [],
          tags: blog.tags
        }));
        setBlogPosts(fallbackBlogs);
      }
    } catch (error) {
      console.error("加载博客数据时出错:", error);
      // 发生错误时回退到 portfolioData.blogs
      const fallbackBlogs: BlogPost[] = portfolioData.blogs.map((blog: DefaultBlogPost, index: number) => ({
        cid: index,
        title: blog.title,
        slug: `blog-${index}`,
        created: Date.now(),
        modified: Date.now(),
        text: blog.summary,
        summary: blog.summary,
        date: blog.date,
        readTime: blog.readTime,
        categories: [],
        tags: blog.tags
      }));
      setBlogPosts(fallbackBlogs);
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
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
        );
      case 'github':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        );
      case 'chat':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9v5a1 1 0 001 1h1l3 3v-3h2a1 1 0 001-1v-5a1 1 0 00-1-1h-6a1 1 0 00-1 1z"></path>
            <path d="M16 9.36V9a1 1 0 00-1-1H9a1 1 0 00-1 1v5a1 1 0 001 1h1.5"></path>
            <circle cx="16.5" cy="15.5" r="2.5"></circle>
          </svg>
        );
      default:
        return <BookOpenIcon className="w-5 h-5 text-gray-700" />;
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
        {/* 个人信息卡片 - 使用新数据 */}
        <motion.div
          variants={fadeIn}
          custom={0}
          initial="hidden"
          animate="visible"
          className="aspect-square cursor-pointer card-container floating-element"
          onMouseEnter={() => handleMouseEnter('personal')}
          onMouseLeave={() => handleMouseLeave('personal')}
          onClick={() => openModal('personal')}
        >
          <div
            className="h-full backdrop-blur-md dark:bg-gray-800/60 bg-white/60"
            style={{
              borderRadius: '20px',
              boxShadow: '0 4px 16px var(--glass-shadow), 0 2px 4px rgba(0,0,0,0.04)',
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
              border: '1px solid var(--card-border)',
              ...(hoveredCards.personal ? hoverStyle : {})
            }}
          >
            <div className="flex flex-col items-center justify-center h-full p-8">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 dark:border-gray-700 border-white shadow-lg mb-6">
                <img
                  src={personalInfo.avatar}
                  alt="个人头像"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold dark:text-white text-[#2c2c2e] mb-2">
                {personalInfo.name}
              </h2>

              <p className="text-base dark:text-gray-300 text-gray-600">
                {personalInfo.email}
              </p>
            </div>
          </div>
        </motion.div>

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
                  <CodeBracketIcon className="w-5 h-5 text-white" />
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
                  <BookOpenIcon className="w-5 h-5 text-white" />
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
                            className="h-full rounded-full transition-all duration-700 ease-out-quart"
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
                  <ComputerDesktopIcon className="w-5 h-5 text-white" />
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
                          <img src={device.image} alt={device.name} className="w-full h-full object-contain p-1.5 relative z-10 transition-transform duration-500 group-hover:scale-110" />
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
                    className="h-full dark:bg-blue-500 bg-blue-500 rounded-full transition-all duration-1000"
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 px-3 py-2 h-full">
                  {portfolioData.blogs.slice(0, 4).map((blog: DefaultBlogPost, index) => (
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
            style={modalOverlayStyle}
            onClick={() => closeModal('skills')}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={modalContentStyle}
              className="p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <AppleStyleIcon
                    colorScheme="green"
                    size="lg"
                  >
                    <CodeBracketIcon className="w-6 h-6 text-white" />
                  </AppleStyleIcon>
                  <div className="ml-3">
                    <h2 className="text-2xl font-bold dark:text-gray-100 text-[#2c2c2e]">部分技能详情</h2>
                  </div>
                </div>
                <button
                  className="w-8 h-8 rounded-full dark:bg-gray-700 dark:hover:bg-gray-600 bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  onClick={() => closeModal('skills')}
                >
                  <XMarkIcon className="w-5 h-5 dark:text-gray-300 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mySkills.map((skill, index) => (
                  <div key={index} className="dark:bg-gray-800 bg-white rounded-xl p-4 shadow-sm">
                    <h3 className={`text-lg font-semibold mb-3 dark:text-${skill.color}-400 text-${skill.color}-700`}>
                      {skill.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item, itemIndex) => (
                        <span key={itemIndex} className={`px-3 py-1 rounded-md text-sm dark:bg-${skill.color}-900/30 dark:text-${skill.color}-400 bg-${skill.color}-50 text-${skill.color}-700`}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 模态框 - 个人资料 */}
      <AnimatePresence>
        {modalOpen.personal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={modalOverlayStyle}
            onClick={() => closeModal('personal')}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={modalContentStyle}
              className="p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <AppleStyleIcon
                    colorScheme="blue"
                    size="lg"
                  >
                    <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
                  </AppleStyleIcon>
                  <div className="ml-3">
                    <h2 className="text-2xl font-bold dark:text-gray-100 text-[#2c2c2e]">个人资料详情</h2>
                  </div>
                </div>
                <button
                  className="w-8 h-8 rounded-full dark:bg-gray-700 dark:hover:bg-gray-600 bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  onClick={() => closeModal('personal')}
                >
                  <XMarkIcon className="w-5 h-5 dark:text-gray-300 text-gray-600" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 dark:border-gray-700 border-white shadow-lg mb-4">
                    <img
                      src={personalInfo.avatar}
                      alt="个人头像"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold dark:text-gray-100 text-[#2c2c2e] mb-1">
                    {personalInfo.name}
                  </h3>
                  <p className="dark:text-gray-300 text-gray-600">
                    {personalInfo.email}
                  </p>
                  <div className="mt-4 py-2 px-4 bg-blue-500 dark:bg-blue-600 rounded-full text-white text-sm font-medium">
                    damesck.net
                  </div>

                  {/* 工具箱卡片 */}
                  <div className="mt-6 w-full">
                    <h4 className="text-lg font-medium mb-3 dark:text-gray-200 text-[#2c2c2e]">工具箱</h4>
                    <Link
                      to="/tools"
                      className="flex items-center p-3 rounded-xl backdrop-blur-sm transition-all duration-300 hover:translate-y-[-2px] border dark:border-white/10 border-black/5 relative overflow-hidden group"
                      style={{
                        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(6, 182, 212, 0.1))',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      {/* 背景装饰 */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(6, 182, 212, 0.2))'
                        }}
                      ></div>

                      <div className="w-9 h-9 rounded-full flex items-center justify-center mr-3 relative"
                        style={{
                          background: 'linear-gradient(135deg, #0EA5E9, #06B6D4)',
                          boxShadow: '0 2px 5px rgba(14, 165, 233, 0.3)'
                        }}
                      >
                        <div className="text-white">
                          <BeakerIcon className="w-5 h-5" />
                        </div>
                        {/* 顶部亮光效果 */}
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                          <div className="absolute top-0 left-1/4 right-1/4 h-1/2 bg-white/20 blur-sm"></div>
                        </div>
                      </div>

                      <div className="flex-grow">
                        <span className="font-medium dark:text-gray-200 text-gray-800 block">网络工具集</span>
                        <span className="text-xs dark:text-gray-400 text-gray-500 block mt-0.5">
                          子网掩码计算器、IP转换等工具
                        </span>
                      </div>

                      <div className="ml-2">
                        <svg className="w-4 h-4 dark:text-gray-400 text-gray-400 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </Link>
                  </div>

                  {/* 社交链接 - 移动到侧边栏 */}
                  <div className="mt-6 w-full">
                    <h4 className="text-lg font-medium mb-3 dark:text-gray-200 text-[#2c2c2e]">社交链接</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {mySocialLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          className="flex items-center p-3 rounded-xl backdrop-blur-sm transition-all duration-300 hover:translate-y-[-2px] border dark:border-white/10 border-black/5 relative overflow-hidden group"
                          style={{
                            background: index === 0 ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))' :
                              index === 1 ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(219, 39, 119, 0.1))' :
                                index === 2 ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))' :
                                  'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.1))',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                          }}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {/* 背景装饰 */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{
                              background: index === 0 ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2))' :
                                index === 1 ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(219, 39, 119, 0.2))' :
                                  index === 2 ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2))' :
                                    'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(124, 58, 237, 0.2))'
                            }}
                          ></div>

                          <div className="w-9 h-9 rounded-full flex items-center justify-center mr-3 relative"
                            style={{
                              background: index === 0 ? 'linear-gradient(135deg, #3B82F6, #2563EB)' :
                                index === 1 ? 'linear-gradient(135deg, #EC4899, #DB2777)' :
                                  index === 2 ? 'linear-gradient(135deg, #10B981, #059669)' :
                                    'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                              boxShadow: index === 0 ? '0 2px 5px rgba(59, 130, 246, 0.3)' :
                                index === 1 ? '0 2px 5px rgba(236, 72, 153, 0.3)' :
                                  index === 2 ? '0 2px 5px rgba(16, 185, 129, 0.3)' :
                                    '0 2px 5px rgba(139, 92, 246, 0.3)'
                            }}
                          >
                            <div className="text-white">
                              {getSocialIcon(link.icon)}
                            </div>
                            {/* 顶部亮光效果 */}
                            <div className="absolute inset-0 rounded-full overflow-hidden">
                              <div className="absolute top-0 left-1/4 right-1/4 h-1/2 bg-white/20 blur-sm"></div>
                            </div>
                          </div>

                          <div className="flex-grow">
                            <span className="font-medium dark:text-gray-200 text-gray-800 block">{link.name}</span>
                            <span className="text-xs dark:text-gray-400 text-gray-500 block mt-0.5">
                              {link.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                            </span>
                          </div>

                          <div className="ml-2">
                            <svg className="w-4 h-4 dark:text-gray-400 text-gray-400 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3">
                  {/* 个人简介与详细资料 */}
                  <div className="mb-6 overflow-auto">
                    <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text">
                      Me
                    </h2>

                    <h3 className="text-lg font-semibold mb-2 dark:text-gray-200 text-[#2c2c2e]">自我介绍</h3>
                    <p className="dark:text-gray-300 text-gray-600 mb-4">
                      我是 damesck，是一名热爱计算机硬件，网络，软件，编程(<span className="line-through">学不会</span>)的一名大专生<span className="line-through"><small>可能过两年就是本科生了吧</small></span>
                    </p>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

                    <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 inline-block text-transparent bg-clip-text">
                      Contributions
                    </h2>
                    <ul className="space-y-3 mb-4">
                      <li className="flex items-start">
                        <div className="h-2 w-2 rounded-full mt-2 mr-2 bg-gradient-to-r from-orange-500 to-pink-500"></div>
                        <div>
                          <h4 className="font-semibold dark:text-gray-200 text-[#2c2c2e]">程游ucyclub | 程游社区联合创始人</h4>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-2 w-2 rounded-full mt-2 mr-2 bg-gradient-to-r from-blue-500 to-green-500"></div>
                        <div>
                          <h4 className="font-semibold dark:text-gray-200 text-[#2c2c2e]">Vastsea瀚海 | 成员</h4>
                        </div>
                      </li>
                    </ul>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

                    <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-500 via-blue-500 to-indigo-500 inline-block text-transparent bg-clip-text">
                      Positions
                    </h2>
                    <ul className="space-y-3 mb-4">
                      <li className="flex items-start">
                        <div className="h-2 w-2 rounded-full mt-2 mr-2 bg-gradient-to-r from-yellow-500 to-green-500"></div>
                        <div>
                          <h4 className="font-semibold dark:text-gray-200 text-[#2c2c2e]">苦力怕论坛 | 超级版主</h4>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-2 w-2 rounded-full mt-2 mr-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                        <div>
                          <h4 className="font-semibold dark:text-gray-200 text-[#2c2c2e]">程游社区 | 联合创始人</h4>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-2 w-2 rounded-full mt-2 mr-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                        <div>
                          <h4 className="font-semibold dark:text-gray-200 text-[#2c2c2e]">鄂尔多斯市达拉特旗第十中学 | 网络运维与机房运维管理</h4>
                        </div>
                      </li>
                    </ul>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

                    <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-red-500 inline-block text-transparent bg-clip-text">
                      Interest
                    </h2>
                    <p className="dark:text-gray-300 text-gray-600">
                      计算机网络，计算机硬件，轨道交通，旅行，吃
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 模态框 - 学习进度 */}
      <AnimatePresence>
        {modalOpen.stats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={modalOverlayStyle}
            onClick={() => closeModal('stats')}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={modalContentStyle}
              className="p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <AppleStyleIcon
                    colorScheme="indigo"
                    size="lg"
                  >
                    <BookOpenIcon className="w-6 h-6 text-white" />
                  </AppleStyleIcon>
                  <div className="ml-3">
                    <h2 className="text-2xl font-bold dark:text-gray-100 text-[#2c2c2e]">学习进度详情</h2>
                  </div>
                </div>
                <button
                  className="w-8 h-8 rounded-full dark:bg-gray-700 dark:hover:bg-gray-600 bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  onClick={() => closeModal('stats')}
                >
                  <XMarkIcon className="w-5 h-5 dark:text-gray-300 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myLearningProgress.map((item, index) => (
                  <div key={index} className="dark:bg-gray-800 bg-white rounded-xl p-6 shadow-sm hover:shadow transition-all duration-300 hover:translate-y-[-2px]">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2 shadow-sm"
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
                        ></div>
                        <h3 className="text-lg font-medium dark:text-gray-100 text-gray-800">{item.name}</h3>
                      </div>
                      <div
                        className="flex items-center text-xs px-2.5 py-1 rounded-md font-medium"
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
                                        item.color === 'pink' ? '#EC4899' : '#3B82F6'
                        }}
                      >
                        {parseInt(item.value) < 30 ? '初学' :
                          parseInt(item.value) < 60 ? '进阶' :
                            parseInt(item.value) < 80 ? '熟练' : '精通'}
                      </div>
                    </div>

                    <div className="flex items-end gap-5 mb-4">
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className="text-4xl font-light"
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
                        <span className="text-sm dark:text-gray-400 text-gray-500">/ 100</span>
                      </div>

                      <div className="relative h-10 flex-grow">
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
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
                        <div className="absolute bottom-3 left-0 right-0 flex justify-between text-[10px] text-gray-400 dark:text-gray-500">
                          <span>0</span>
                          <span>25</span>
                          <span>50</span>
                          <span>75</span>
                          <span>100</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm dark:text-gray-400 text-gray-600 mt-2 border-t dark:border-gray-700 border-gray-100 pt-3">
                      {item.description}
                    </p>
                  </div>
                ))}
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
            style={modalOverlayStyle}
            onClick={() => closeModal('devices')}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={modalContentStyle}
              className="p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <AppleStyleIcon
                    colorScheme="orange"
                    size="lg"
                  >
                    <ComputerDesktopIcon className="w-6 h-6 text-white" />
                  </AppleStyleIcon>
                  <div className="ml-3">
                    <h2 className="text-2xl font-bold dark:text-gray-100 text-[#2c2c2e]">我的设备详情</h2>
                  </div>
                </div>
                <button
                  className="w-8 h-8 rounded-full dark:bg-gray-700 dark:hover:bg-gray-600 bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  onClick={() => closeModal('devices')}
                >
                  <XMarkIcon className="w-5 h-5 dark:text-gray-300 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myDevices.map((device, index) => (
                  <div key={index} className="dark:bg-gray-800 bg-white rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-all">
                    <div className="relative h-40 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent dark:from-black/50 dark:to-transparent z-10"></div>
                      <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <img src={device.image} alt={device.name} className="w-full h-full object-contain p-4 transition-all duration-500 group-hover:scale-105" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
                        <h3 className="text-xl font-semibold mb-1 text-white drop-shadow-md">{device.name}</h3>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {device.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-2 py-0.5 text-xs rounded-md bg-white/20 text-white backdrop-blur-sm border border-white/20">
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-sm dark:text-gray-300 text-gray-600 mb-4 line-clamp-2">{device.description}</p>

                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="dark:bg-gray-700/50 bg-gray-100/80 rounded-lg p-2 flex flex-col items-center justify-center">
                          <span className="text-xs dark:text-gray-400 text-gray-500">购买日期</span>
                          <span className="text-sm font-medium dark:text-gray-200 text-gray-700">{device.specs.purchaseDate}</span>
                        </div>
                        <div className="dark:bg-gray-700/50 bg-gray-100/80 rounded-lg p-2 flex flex-col items-center justify-center">
                          <span className="text-xs dark:text-gray-400 text-gray-500">保修状态</span>
                          <span className="text-sm font-medium dark:text-gray-200 text-gray-700">{device.specs.warranty}</span>
                        </div>
                      </div>

                      <div className="mb-3 flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2"
                          style={{
                            backgroundColor: device.specs.condition === '良好' ? '#34D399' :
                              device.specs.condition === '一般' ? '#FBBF24' :
                                device.specs.condition === '需要维修' ? '#F87171' : '#60A5FA'
                          }}
                        ></div>
                        <span className="text-sm font-medium dark:text-gray-200 text-gray-700">状态: {device.specs.condition}</span>
                      </div>

                      <div className="dark:border-gray-700 border-t border-gray-100 pt-3 mt-1">
                        <h4 className="text-sm font-medium mb-2 dark:text-gray-100 text-[#2c2c2e]">设备详情</h4>
                        <ul className="text-xs dark:text-gray-400 text-gray-600 space-y-1">
                          {device.specs.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start">
                              <span className="mr-2 text-blue-500 dark:text-blue-400">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
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
            style={modalOverlayStyle}
            onClick={() => closeModal('countdown')}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={modalContentStyle}
              className="p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
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
                  className="w-8 h-8 rounded-full dark:bg-gray-700 dark:hover:bg-gray-600 bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  onClick={() => closeModal('countdown')}
                >
                  <XMarkIcon className="w-5 h-5 dark:text-gray-300 text-gray-600" />
                </button>
              </div>

              <div className="dark:bg-gray-800 bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="relative p-6 pb-4">
                  {/* 背景装饰 */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-green-400/10 to-yellow-500/10 rounded-full blur-xl pointer-events-none"></div>

                  {/* 主倒计时显示 */}
                  <div className="flex flex-col items-center md:flex-row md:items-start mb-6 relative">
                    <div className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex flex-col items-center justify-center text-white shadow-lg mb-4 md:mb-0 overflow-hidden">
                      <div className="absolute inset-0 backdrop-blur-sm bg-white/5"></div>
                      <div className="z-10">
                        <div className="text-6xl font-bold">{daysLeft}</div>
                        <div className="text-sm font-medium text-center text-blue-100">剩余天数</div>
                      </div>
                    </div>

                    <div className="md:ml-6 flex-grow">
                      <h3 className="text-2xl font-bold text-center md:text-left mb-3 dark:text-gray-100 text-gray-800">{getMainCountdown(countdownData).title}</h3>
                      <div className="h-3 w-full dark:bg-gray-700 bg-gray-100 rounded-full overflow-hidden mb-3 shadow-inner">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                          style={{ width: `${calculateProgress(getMainCountdown(countdownData))}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm dark:text-gray-400 text-gray-600">
                        <span>开始日期: {getMainCountdown(countdownData).Startdate}</span>
                        <span>目标日期: {getMainCountdown(countdownData).targetDate}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mt-4">
                        <div className="dark:bg-gray-700/50 bg-gray-100/80 rounded-lg p-2 flex flex-col items-center justify-center">
                          <span className="text-xs dark:text-gray-400 text-gray-500">已过天数</span>
                          <span className="text-lg font-medium dark:text-gray-200 text-gray-700">
                            {getMainCountdown(countdownData)?.Startdate ? calculatePassedDays(getMainCountdown(countdownData).Startdate) : 0}
                          </span>
                        </div>
                        <div className="dark:bg-gray-700/50 bg-gray-100/80 rounded-lg p-2 flex flex-col items-center justify-center">
                          <span className="text-xs dark:text-gray-400 text-gray-500">总天数</span>
                          <span className="text-lg font-medium dark:text-gray-200 text-gray-700">
                            {(getMainCountdown(countdownData)?.Startdate && getMainCountdown(countdownData)?.targetDate) ?
                              calculateTotalDays(getMainCountdown(countdownData).Startdate, getMainCountdown(countdownData).targetDate) : 0}
                          </span>
                        </div>
                        <div className="dark:bg-gray-700/50 bg-gray-100/80 rounded-lg p-2 flex flex-col items-center justify-center">
                          <span className="text-xs dark:text-gray-400 text-gray-500">完成度</span>
                          <span className="text-lg font-medium dark:text-gray-200 text-gray-700">
                            {Math.round(calculateProgress(getMainCountdown(countdownData)))}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 其他倒计时列表 */}
                <div className="border-t dark:border-gray-700 border-gray-100 px-6 pt-4 pb-6">
                  <h4 className="text-lg font-medium mb-4 dark:text-gray-100 text-gray-800 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    所有倒计时
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* 主倒计时卡片 */}
                    <div className="dark:bg-gray-700/30 bg-blue-50 rounded-xl p-4 border dark:border-blue-800/30 border-blue-100 shadow-sm relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition-all duration-300"></div>
                      <div className="flex items-center justify-between mb-3 relative">
                        <h5 className="font-semibold dark:text-blue-300 text-blue-700">{getMainCountdown(countdownData).title}</h5>
                        <span className="py-0.5 px-2 text-xs rounded-full dark:bg-blue-900/40 dark:text-blue-300 bg-blue-100 text-blue-600">主要</span>
                      </div>
                      <div className="flex items-center justify-between relative">
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold dark:text-blue-300 text-blue-700">{daysLeft}</span>
                          <span className="ml-1 text-sm dark:text-gray-400 text-gray-500">天</span>
                        </div>
                        <span className="text-xs dark:text-gray-400 text-gray-600">{getMainCountdown(countdownData).targetDate}</span>
                      </div>
                      <div className="mt-2 h-1.5 w-full dark:bg-gray-600/70 bg-blue-200/70 rounded-full overflow-hidden relative">
                        <div
                          className="h-full bg-blue-500 dark:bg-blue-400 rounded-full transition-all duration-300"
                          style={{ width: `${calculateProgress(getMainCountdown(countdownData))}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* 其他倒计时卡片 */}
                    {countdownData.filter(item => !item.top).map((item, index) => (
                      <div
                        key={index}
                        className="dark:bg-gray-700/30 bg-gray-50 rounded-xl p-4 border dark:border-gray-700/30 border-gray-100 shadow-sm relative overflow-hidden group"
                        style={{
                          background: index === 0 ? 'rgba(16, 185, 129, 0.05)' : 'rgba(249, 115, 22, 0.05)',
                          borderColor: index === 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(249, 115, 22, 0.1)'
                        }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-semibold"
                            style={{
                              color: index === 0 ? '#10B981' : '#F97316'
                            }}
                          >{item.title}</h5>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline">
                            <span className="text-2xl font-bold dark:text-gray-200 text-gray-700">{calculateDaysLeft(item.targetDate)}天</span>
                            <span className="ml-1 text-sm dark:text-gray-400 text-gray-500">天</span>
                          </div>
                          <span className="text-xs dark:text-gray-400 text-gray-600">{item.targetDate}</span>
                        </div>
                        <div className="mt-2 h-1.5 w-full dark:bg-gray-600/40 bg-gray-200/70 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${calculateProgress(item)}%`,
                              background: index === 0 ? '#10B981' : '#F97316'
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}

                    {/* 添加新倒计时按钮卡片 */}
                    <div className="dark:bg-gray-800/50 bg-gray-50 rounded-xl border dark:border-gray-700 border-gray-100 flex items-center justify-center p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group">
                      <svg className="w-6 h-6 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400 mr-2 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span className="text-sm text-gray-500 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300 transition-colors">添加新倒计时</span>
                    </div>
                  </div>
                </div>

                {/* 底部提示区 */}
                <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-3 text-xs text-gray-500 dark:text-gray-400 border-t dark:border-gray-700 border-gray-100">
                  提示: 您可以点击每个倒计时卡片查看详细信息，或者添加新的倒计时事件。
                </div>
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
            style={modalOverlayStyle}
            onClick={() => closeModal('blogs')}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={modalContentStyle}
              className="p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
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
                <button
                  className="w-8 h-8 rounded-full dark:bg-gray-700 dark:hover:bg-gray-600 bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  onClick={() => closeModal('blogs')}
                >
                  <XMarkIcon className="w-5 h-5 dark:text-gray-300 text-gray-600" />
                </button>
              </div>

              {apiError ? (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="text-red-500 mb-2 font-medium">请求失败 (错误代码: {apiError.code})</div>
                  <div className="text-sm dark:text-gray-300 text-gray-700 mb-3">{apiError.message}</div>
                  {apiError.details && (
                    <div className="text-xs dark:text-gray-400 text-gray-500 max-w-md mb-4">{apiError.details}</div>
                  )}
                  <button
                    onClick={fetchBlogPosts}
                    className="mt-2 px-4 py-2 dark:bg-blue-700 dark:hover:bg-blue-600 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                  >
                    重新获取
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 px-3 py-2 h-full">
                  {blogPosts.length > 0 ?
                    blogPosts.slice(0, 4).map((blog, index) => (
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
                    )) :
                    portfolioData.blogs.slice(0, 4).map((blog: DefaultBlogPost, index) => (
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
                    ))
                  }
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;
