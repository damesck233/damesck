// @ts-ignore - 暂时忽略LaptopIcon未导出错误
// @ts-ignore - 暂时忽略找不到../components/Icons错误
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
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
  XMarkIcon
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
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
  borderRadius: '20px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04)',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
  border: '1px solid rgba(255, 255, 255, 0.8)'
};

// 毛玻璃标题区域样式
const cardHeaderStyle = {
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(230,240,255,0.3))',
  borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
  padding: '14px 20px',
  position: 'relative' as const,
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

// 标题悬停效果
const headerHoverStyle = {
  backgroundColor: 'rgba(240, 245, 255, 0.4)',
  boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.05)',
  transform: 'translateY(1px)'
};

// 卡片内容区域样式
const cardBodyStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: '16px 20px',
  backdropFilter: 'blur(8px)',
};

// 鼠标悬停时的放大效果
const hoverStyle = {
  transform: 'scale(1.03)',
  boxShadow: '0 8px 24px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.06)'
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
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '20px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1), 0 1px 8px rgba(0,0,0,0.07)',
  width: '90%',
  maxWidth: '800px',
  maxHeight: '80vh',
  overflow: 'auto',
  border: '1px solid rgba(255, 255, 255, 0.8)',
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

const Home = () => {
  // 计算剩余天数的函数
  const calculateDaysLeft = () => {
    const targetDate = new Date(portfolioData.countdown.targetDate);
    const today = new Date();
    const timeDiff = targetDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft;
  };

  // 实时倒计时状态
  const [daysLeft, setDaysLeft] = useState(calculateDaysLeft());

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
    const timer = setInterval(() => {
      setDaysLeft(calculateDaysLeft());
    }, 86400000); // 每24小时更新一次
    return () => clearInterval(timer);
  }, []);

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

  // 使用新的数据文件替换旧数据
  const mySkills = skills;
  const myLearningProgress = learningProgress;
  const myDevices = devices;
  const myCountdown = countdown;
  const mySocialLinks = socialLinks;

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
            className="h-full backdrop-blur-md bg-white/60"
            style={{
              borderRadius: '20px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04)',
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              ...(hoveredCards.personal ? hoverStyle : {})
            }}
          >
            <div className="flex flex-col items-center justify-center h-full p-8">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
                <img
                  src={personalInfo.avatar}
                  alt="个人头像"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold text-[#2c2c2e] mb-2">
                {personalInfo.name}
              </h2>

              <p className="text-base text-gray-600">
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
                  <h3 className="text-base font-semibold text-[#2c2c2e]">我的技能</h3>
                  <p className="text-xs text-gray-500 mt-0.5">全部技能</p>
                </div>
              </div>
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100">
                <span className="text-[#30D158] font-semibold text-sm">{mySkills.length}</span>
              </div>
            </div>
            <div style={cardBodyStyle} className="h-[calc(100%-64px)] overflow-y-auto">
              <div className="grid grid-cols-1 gap-3 p-1">
                {mySkills.map((skill, index) => (
                  <div key={index} className="mb-2">
                    <div className={`text-sm font-medium mb-1.5 text-${skill.color}-700`}>
                      {skill.category}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {skill.items.map((item, itemIndex) => (
                        <span key={itemIndex} className={`bg-${skill.color}-50 text-${skill.color}-700 px-1.5 py-0.5 text-xs rounded-md`}>
                          {item}
                        </span>
                      ))}
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
                  <h3 className="text-base font-semibold text-[#2c2c2e]">学习进度</h3>
                  <p className="text-xs text-gray-500 mt-0.5">正在学习中</p>
                </div>
              </div>
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100">
                <span className="text-[#5E5CE6] font-semibold text-sm">{myLearningProgress.length}</span>
              </div>
            </div>
            <div style={cardBodyStyle} className="h-[calc(100%-64px)] overflow-y-auto">
              <div className="flex flex-col h-full p-2">
                {myLearningProgress.map((item, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 truncate">{item.name}</span>
                      <span className="text-sm font-semibold text-gray-800">{item.value}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-${item.color}-500 rounded-full`}
                        style={{ width: item.value }}
                      ></div>
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
                  <h3 className="text-base font-semibold text-[#2c2c2e]">我的设备</h3>
                  <p className="text-xs text-gray-500 mt-0.5">浏览全部设备</p>
                </div>
              </div>
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100">
                <span className="text-[#FF9F0A] font-semibold text-sm">{myDevices.length}</span>
              </div>
            </div>
            <div style={cardBodyStyle} className="h-[calc(100%-64px)] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {myDevices.slice(0, 3).map((device, index) => (
                  <div key={index} className="flex flex-col overflow-hidden h-full bg-white/70 rounded-xl p-3 hover:bg-white/90 transition-colors shadow-sm border border-gray-100/50">
                    <div className="w-full h-20 bg-gray-50/50 rounded-lg mb-2 overflow-hidden flex items-center justify-center">
                      <img src={device.image} alt={device.name} className="w-full h-full object-contain p-1 transition-all duration-500 hover:scale-105" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <h4 className="font-semibold text-[#1d1d1f] truncate mb-1">{device.name}</h4>
                      <p className="text-xs text-gray-500 flex-grow line-clamp-2 mb-2">{device.description}</p>
                      <div className="flex gap-1.5">
                        {device.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-0.5 text-2xs rounded-full bg-blue-50 text-blue-600 border border-blue-100/50">
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* {myDevices.length > 3 && (
                <div className="mt-4 flex justify-center">
                  <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    查看全部 {myDevices.length} 个设备
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </button>
                </div>
              )} */}
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
                  <h3 className="text-base font-semibold text-[#2c2c2e]">{myCountdown.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">剩余天数</p>
                </div>
              </div>
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100">
                <span className="text-blue-500 font-semibold text-sm">1</span>
              </div>
            </div>
            <div style={cardBodyStyle} className="h-[calc(100%-64px)]">
              <div className="h-full flex flex-col p-4">
                <h4 className="font-medium text-xl mb-4 text-[#2c2c2e]">{myCountdown.title}</h4>

                <div className="flex items-end mb-4">
                  <div className="text-6xl font-bold text-blue-600">{daysLeft}</div>
                  <div className="text-2xl text-gray-500 ml-2 mb-2">天</div>
                </div>

                <p className="text-gray-500 mb-3 text-sm">距离 {myCountdown.targetDate.replace(/-/g, '年') + '日'}</p>

                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden mt-auto">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                    style={{ width: `${(1 - daysLeft / myCountdown.totalDays) * 100}%` }}
                  ></div>
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
                  <h3 className="text-base font-semibold text-[#2c2c2e]">我的博客文章</h3>
                  <p className="text-xs text-gray-500 mt-0.5">从 blog.damesck.net 获取的最新内容</p>
                </div>
              </div>
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100">
                <span className="text-[#FF375F] font-semibold text-sm">{blogPosts.length || 0}</span>
              </div>
            </div>
            <div style={cardBodyStyle} className="h-[calc(100%-64px)] overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="h-2 w-20 bg-gray-200 rounded mb-2"></div>
                    <div className="h-2 w-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ) : apiError ? (
                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                  <div className="text-red-500 mb-2 font-medium">请求失败 (错误代码: {apiError.code})</div>
                  <div className="text-sm text-gray-700 mb-3">{apiError.message}</div>
                  {apiError.details && (
                    <div className="text-xs text-gray-500 max-w-md">{apiError.details}</div>
                  )}
                  <button
                    onClick={fetchBlogPosts}
                    className="mt-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors"
                  >
                    重试
                  </button>
                </div>
              ) : blogPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {blogPosts.map((blog, index) => (
                    <div key={index} className="bg-gray-50/50 rounded-lg p-3 hover:bg-gray-50/80 transition-colors h-full">
                      <div className="flex flex-col h-full">
                        <div className="flex-grow">
                          <h4 className="font-medium text-base text-[#2c2c2e] truncate">{blog.title}</h4>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{blog.summary}</p>
                          <div className="flex gap-1.5 mt-3 flex-wrap">
                            {blog.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="px-2 py-0.5 text-xs rounded-md bg-blue-50 text-blue-600">
                                {tag.name}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-4 pt-3 border-t border-gray-100 w-full">{blog.date} · {blog.readTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {portfolioData.blogs.map((blog: DefaultBlogPost, index) => (
                    <div key={index} className="bg-gray-50/50 rounded-lg p-3 hover:bg-gray-50/80 transition-colors h-full">
                      <div className="flex flex-col h-full">
                        <div className="flex-grow">
                          <h4 className="font-medium text-base text-[#2c2c2e] truncate">{blog.title}</h4>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{blog.summary}</p>
                          <div className="flex gap-1.5 mt-3 flex-wrap">
                            {blog.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="px-2 py-0.5 text-xs rounded-md bg-blue-50 text-blue-600">
                                {tag.name}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-4 pt-3 border-t border-gray-100 w-full">{blog.date} · {blog.readTime}</p>
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
                    <h2 className="text-2xl font-bold text-[#2c2c2e]">全部技能详情</h2>
                  </div>
                </div>
                <button
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  onClick={() => closeModal('skills')}
                >
                  <XMarkIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mySkills.map((skill, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                    <h3 className={`text-lg font-semibold mb-3 text-${skill.color}-700`}>
                      {skill.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item, itemIndex) => (
                        <span key={itemIndex} className={`px-3 py-1 rounded-md text-sm bg-${skill.color}-50 text-${skill.color}-700`}>
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
                    <h2 className="text-2xl font-bold text-[#2c2c2e]">个人资料详情</h2>
                  </div>
                </div>
                <button
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  onClick={() => closeModal('personal')}
                >
                  <XMarkIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                    <img
                      src={personalInfo.avatar}
                      alt="个人头像"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#2c2c2e] mb-1">
                    {personalInfo.name}
                  </h3>
                  <p className="text-gray-600">
                    {personalInfo.email}
                  </p>
                  <div className="mt-4 py-2 px-4 bg-blue-500 rounded-full text-white text-sm font-medium">
                    damesck.net
                  </div>
                </div>

                <div className="md:w-2/3">
                  <h4 className="text-lg font-medium mb-3 text-[#2c2c2e]">社交链接</h4>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {mySocialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {getSocialIcon(link.icon)}
                        <span className="ml-2 text-gray-700">{link.name}</span>
                      </a>
                    ))}
                  </div>

                  <h4 className="text-lg font-medium mb-3 text-[#2c2c2e]">个人简介</h4>
                  <p className="text-gray-600 mb-4">
                    致不完美的明天_
                  </p>
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
                    <h2 className="text-2xl font-bold text-[#2c2c2e]">学习进度详情</h2>
                  </div>
                </div>
                <button
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  onClick={() => closeModal('stats')}
                >
                  <XMarkIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myLearningProgress.map((item, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                      <span className="text-lg font-bold text-blue-600">{item.value}</span>
                    </div>
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-${item.color}-500 rounded-full`}
                        style={{ width: item.value }}
                      ></div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
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
                    <h2 className="text-2xl font-bold text-[#2c2c2e]">我的设备详情</h2>
                  </div>
                </div>
                <button
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  onClick={() => closeModal('devices')}
                >
                  <XMarkIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myDevices.map((device, index) => (
                  <div key={index} className="bg-white rounded-xl p-5 shadow-sm">
                    <div className="flex items-start">
                      <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden p-2 mr-4">
                        <img src={device.image} alt={device.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold mb-1 text-[#2c2c2e]">{device.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{device.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {device.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-3 py-1 rounded-md text-sm bg-blue-50 text-blue-600">
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-medium mb-2 text-[#2c2c2e]">设备规格</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 购买日期: {device.specs.purchaseDate}</li>
                        <li>• 保修状态: {device.specs.warranty}</li>
                        <li>• 使用状态: {device.specs.condition}</li>
                        {device.specs.details.map((detail, detailIndex) => (
                          <li key={detailIndex}>• {detail}</li>
                        ))}
                      </ul>
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
                    <h2 className="text-2xl font-bold text-[#2c2c2e]">{myCountdown.title}</h2>
                  </div>
                </div>
                <button
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  onClick={() => closeModal('countdown')}
                >
                  <XMarkIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
                  <div className="text-center">
                    <div className="text-8xl font-bold text-blue-600">{daysLeft}</div>
                    <div className="text-2xl text-gray-500 mt-2">天</div>
                  </div>

                  <div className="flex-grow">
                    <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                        style={{ width: `${(1 - daysLeft / myCountdown.totalDays) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>开始日期</span>
                      <span>目标日期: {myCountdown.targetDate}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-medium mb-4 text-[#2c2c2e]">事件详情</h3>
                  <p className="text-gray-600 mb-4">
                    这个重要日期标志着一个重要里程碑。在这段时间里，我们将努力实现设定的目标和计划。
                    倒计时提醒着我们时间的宝贵和任务的紧迫性。
                  </p>

                  <h4 className="font-medium mt-5 mb-2 text-[#2c2c2e]">相关任务</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">已完成的准备工作</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm">进行中的重要任务</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">尚未开始的紧急事项</span>
                    </div>
                  </div>
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
                    <h3 className="text-base font-semibold text-[#2c2c2e]">我的博客文章</h3>
                    <p className="text-xs text-gray-500 mt-0.5">从 blog.damesck.net 获取的最新内容</p>
                  </div>
                </div>
                <button
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  onClick={() => closeModal('blogs')}
                >
                  <XMarkIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {apiError ? (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="text-red-500 mb-2 font-medium">请求失败 (错误代码: {apiError.code})</div>
                  <div className="text-sm text-gray-700 mb-3">{apiError.message}</div>
                  {apiError.details && (
                    <div className="text-xs text-gray-500 max-w-md mb-4">{apiError.details}</div>
                  )}
                  <button
                    onClick={fetchBlogPosts}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                  >
                    重新获取
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogPosts.length > 0 ?
                    blogPosts.map((blog, index) => (
                      <div key={index} className="bg-white rounded-xl p-5 shadow-sm">
                        <h3 className="text-lg font-semibold mb-2 text-[#2c2c2e]">{blog.title}</h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{blog.summary}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-3 py-1 rounded-md text-sm bg-blue-50 text-blue-600">
                              {tag.name}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                          <span className="text-sm text-gray-500">{blog.date}</span>
                          <span className="text-sm text-gray-500">{blog.readTime}</span>
                        </div>

                        <a
                          href={`https://blog.damesck.net/${blog.slug}.html`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          阅读全文
                          <ArrowRightIcon className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    )) :
                    portfolioData.blogs.map((blog: DefaultBlogPost, index) => (
                      <div key={index} className="bg-white rounded-xl p-5 shadow-sm">
                        <h3 className="text-lg font-semibold mb-2 text-[#2c2c2e]">{blog.title}</h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{blog.summary}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-3 py-1 rounded-md text-sm bg-blue-50 text-blue-600">
                              {tag.name}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                          <span className="text-sm text-gray-500">{blog.date}</span>
                          <span className="text-sm text-gray-500">{blog.readTime}</span>
                        </div>

                        <a
                          href="https://blog.damesck.net"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          访问博客
                          <ArrowRightIcon className="w-4 h-4 ml-1" />
                        </a>
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
