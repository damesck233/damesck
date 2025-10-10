import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { UserIcon, GlobeAltIcon, UserGroupIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import StatusIndicator, { refreshAllStatusIndicators } from '../components/StatusIndicator';
import FeishuWebhook from '../components/FeishuWebhook';

// 友情链接数据接口
interface Friend {
  name: string;
  avatar: string;
  url: string;
  description: string;
}

// Apple风格的淡入动画
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: custom * 0.05
    }
  })
};

const Friends = () => {
  // 各种分类的友情链接
  const [myFriends, setMyFriends] = useState<Friend[]>([
    {
      name: "damesck",
      avatar: "https://api.damesck.net/avatar.png",
      url: "https://damesck.net",
      description: "damesck"
    }
  ]);

  const [moreFriends, setMoreFriends] = useState<Friend[]>([
    {
      name: "Snowball_233",
      avatar: "https://user.klpbbs.com/data/avatar/001/08/24/63_avatar_big.jpg",
      url: "https://qwq.my",
      description: "qwq.my"
    },
    {
      name: "御坂秋生の小窝",
      avatar: "https://webstatic.akio.top/user/NiuBoss123.jpg",
      url: "https://www.akio.top/",
      description: "不努力就只能听到别人的好消息"
    },
    {
      name: "iVampireSP 的物语",
      avatar: "https://nwl.im/avatar",
      url: "https://ivampiresp.com",
      description: "比起千言万语，更重要的是心灵相通吧。"
    },
    {
      name: "Bingxin Home",
      avatar: "https://blog.byteloid.one/img/march7th.webp",
      url: "https://byteloid.one",
      description: "相聚于此乐土。"
    },
    {
      name: "M397749490",
      avatar: "https://M397749490.com/logo.png",
      url: "https://M397749490.com",
      description: "M397749490.com"
    },
    {
      name: "Mugzx's Blog",
      avatar: "https://www.mugzx.top/api/avatar.png",
      url: "https://blog.mugzx.top",
      description: "向上革命，向下实践。"
    }
  ]);

  const [myLinks, setMyLinks] = useState<Friend[]>([
    {
      name: "海猫工艺丨Vastsea",
      avatar: "/friends/vastsea.jpg",
      url: "#",
      description: "海猫工艺官方网站"
    }
  ]);

  // 存储头像加载错误状态的对象
  const [avatarErrors, setAvatarErrors] = useState<Record<string, boolean>>({});

  // 处理头像加载错误
  const handleAvatarError = (friendName: string) => {
    setAvatarErrors(prev => ({
      ...prev,
      [friendName]: true
    }));
  };

  // 生成头像首字母
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  // 添加刷新状态
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  // 飞书机器人状态管理
  const [showFeishuWebhook, setShowFeishuWebhook] = useState(false);

  // 处理刷新按钮点击
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    refreshAllStatusIndicators();

    // 5秒后自动重置刷新状态
    setTimeout(() => {
      setIsRefreshing(false);
      setRefreshCount(prev => prev + 1);
    }, 5000);
  }, []);

  // iOS风格的卡片样式
  const cardStyle = {
    backgroundColor: 'var(--glass-bg)',
    borderRadius: '22px',
    boxShadow: '0 5px 20px var(--glass-shadow), 0 2px 6px rgba(0,0,0,0.05)',
    overflow: 'hidden',
    transition: 'all 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
    border: '1px solid var(--glass-border)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)'
  };

  // 鼠标悬停时的放大效果
  const hoverStyle = {
    transform: 'translateY(-5px) scale(1.02)',
    boxShadow: '0 10px 30px var(--glass-shadow), 0 5px 10px rgba(0,0,0,0.08)'
  };

  // 不同类型卡片的颜色变量
  const cardColors = {
    primary: {
      bg: 'from-blue-400/10 to-blue-600/10 dark:from-blue-700/20 dark:to-blue-900/20',
      border: 'border-blue-200/30 dark:border-blue-700/30',
      shadow: 'shadow-blue-500/5 dark:shadow-blue-800/10'
    },
    secondary: {
      bg: 'from-purple-400/10 to-purple-600/10 dark:from-purple-700/20 dark:to-purple-900/20',
      border: 'border-purple-200/30 dark:border-purple-700/30',
      shadow: 'shadow-purple-500/5 dark:shadow-purple-800/10'
    },
    tertiary: {
      bg: 'from-teal-400/10 to-teal-600/10 dark:from-teal-700/20 dark:to-teal-900/20',
      border: 'border-teal-200/30 dark:border-teal-700/30',
      shadow: 'shadow-teal-500/5 dark:shadow-teal-800/10'
    }
  };

  // 根据朋友名称生成唯一颜色
  const getFriendColor = (name: string) => {
    // 根据名称生成一个数字
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    // 根据数字选择颜色组合 - 优化后的柔和色彩方案
    const colorOptions = [
      // 蓝色系
      {
        bg: 'from-blue-400/15 to-blue-600/15 dark:from-blue-700/25 dark:to-blue-900/25',
        border: 'border-blue-200/40 dark:border-blue-700/40',
        shadow: 'shadow-blue-500/10 dark:shadow-blue-800/15',
        text: 'text-blue-600 dark:text-blue-400'
      },
      // 紫色系
      {
        bg: 'from-purple-400/15 to-purple-600/15 dark:from-purple-700/25 dark:to-purple-900/25',
        border: 'border-purple-200/40 dark:border-purple-700/40',
        shadow: 'shadow-purple-500/10 dark:shadow-purple-800/15',
        text: 'text-purple-600 dark:text-purple-400'
      },
      // 青色系
      {
        bg: 'from-teal-400/15 to-teal-600/15 dark:from-teal-700/25 dark:to-teal-900/25',
        border: 'border-teal-200/40 dark:border-teal-700/40',
        shadow: 'shadow-teal-500/10 dark:shadow-teal-800/15',
        text: 'text-teal-600 dark:text-teal-400'
      },
      // 粉色系
      {
        bg: 'from-pink-400/15 to-pink-600/15 dark:from-pink-700/25 dark:to-pink-900/25',
        border: 'border-pink-200/40 dark:border-pink-700/40',
        shadow: 'shadow-pink-500/10 dark:shadow-pink-800/15',
        text: 'text-pink-600 dark:text-pink-400'
      },
      // 琥珀色系
      {
        bg: 'from-amber-400/15 to-amber-600/15 dark:from-amber-700/25 dark:to-amber-900/25',
        border: 'border-amber-200/40 dark:border-amber-700/40',
        shadow: 'shadow-amber-500/10 dark:shadow-amber-800/15',
        text: 'text-amber-600 dark:text-amber-400'
      },
      // 靛蓝色系
      {
        bg: 'from-indigo-400/15 to-indigo-600/15 dark:from-indigo-700/25 dark:to-indigo-900/25',
        border: 'border-indigo-200/40 dark:border-indigo-700/40',
        shadow: 'shadow-indigo-500/10 dark:shadow-indigo-800/15',
        text: 'text-indigo-600 dark:text-indigo-400'
      },
      // 绿色系
      {
        bg: 'from-green-400/15 to-emerald-600/15 dark:from-green-700/25 dark:to-emerald-900/25',
        border: 'border-green-200/40 dark:border-emerald-700/40',
        shadow: 'shadow-green-500/10 dark:shadow-emerald-800/15',
        text: 'text-green-600 dark:text-emerald-400'
      },
      // 赤色系
      {
        bg: 'from-red-400/15 to-red-600/15 dark:from-red-700/25 dark:to-red-900/25',
        border: 'border-red-200/40 dark:border-red-700/40',
        shadow: 'shadow-red-500/10 dark:shadow-red-800/15',
        text: 'text-red-600 dark:text-red-400'
      },
      // 天蓝色系
      {
        bg: 'from-sky-400/15 to-blue-500/15 dark:from-sky-700/25 dark:to-blue-800/25',
        border: 'border-sky-200/40 dark:border-sky-700/40',
        shadow: 'shadow-sky-500/10 dark:shadow-sky-800/15',
        text: 'text-sky-600 dark:text-sky-400'
      },
      // 玫瑰红色系
      {
        bg: 'from-rose-400/15 to-pink-500/15 dark:from-rose-700/25 dark:to-pink-800/25',
        border: 'border-rose-200/40 dark:border-rose-700/40',
        shadow: 'shadow-rose-500/10 dark:shadow-rose-800/15',
        text: 'text-rose-600 dark:text-rose-400'
      },
      // 石板蓝色系
      {
        bg: 'from-slate-400/15 to-slate-500/15 dark:from-slate-700/25 dark:to-slate-800/25',
        border: 'border-slate-200/40 dark:border-slate-700/40',
        shadow: 'shadow-slate-500/10 dark:shadow-slate-800/15',
        text: 'text-slate-600 dark:text-slate-400'
      },
      // 青柠色系
      {
        bg: 'from-lime-400/15 to-green-500/15 dark:from-lime-700/25 dark:to-green-800/25',
        border: 'border-lime-200/40 dark:border-lime-700/40',
        shadow: 'shadow-lime-500/10 dark:shadow-lime-800/15',
        text: 'text-lime-600 dark:text-lime-400'
      }
    ];

    // 使用名称的每个字符来生成一个更独特的哈希值
    const nameSum = name.split('').reduce((sum, char, index) => {
      return sum + char.charCodeAt(0) * (index + 1);
    }, 0);

    // 结合两种哈希方法以提高唯一性
    const combinedHash = (hash + nameSum) % colorOptions.length;
    return colorOptions[Math.abs(combinedHash)];
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* 页面标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold dark:text-white text-gray-900 mb-4 tracking-tight">朋友们</h1>
        <p className="text-lg dark:text-gray-300 text-gray-600 font-medium">海内存知己，天涯若比邻</p>

        {/* 状态指示器说明 */}
        <div className="mt-4 flex flex-wrap items-center gap-4 bg-gray-100/40 dark:bg-gray-800/40 p-3 rounded-xl backdrop-blur-md border border-gray-200/30 dark:border-gray-700/30">
          <p className="text-sm dark:text-gray-300 text-gray-600">网站状态指示：</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <div className="relative h-5 w-5 flex items-center justify-center mr-1.5">
                <div className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-green-400/90 to-green-600/90 shadow-md shadow-green-500/20 dark:shadow-green-900/30 ring-1 ring-green-200/60 dark:ring-green-800/60 backdrop-blur-md"></div>
                <div className="absolute w-1.5 h-1.5 rounded-full bg-white/90 dark:bg-green-200/90 backdrop-blur-sm"></div>
              </div>
              <span className="text-xs dark:text-gray-300 text-gray-600">畅通</span>
            </div>

            <div className="flex items-center">
              <div className="relative h-5 w-5 flex items-center justify-center mr-1.5">
                <div className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400/90 to-amber-500/90 shadow-md shadow-yellow-500/20 dark:shadow-yellow-900/30 ring-1 ring-yellow-200/60 dark:ring-yellow-800/60 backdrop-blur-md"></div>
                <div className="absolute w-1.5 h-1.5 rounded-full bg-white/90 dark:bg-yellow-200/90 backdrop-blur-sm"></div>
              </div>
              <span className="text-xs dark:text-gray-300 text-gray-600">良好</span>
            </div>

            <div className="flex items-center">
              <div className="relative h-5 w-5 flex items-center justify-center mr-1.5">
                <div className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-orange-400/90 to-red-500/90 shadow-md shadow-orange-500/20 dark:shadow-orange-900/30 ring-1 ring-orange-200/60 dark:ring-orange-800/60 backdrop-blur-md"></div>
                <div className="absolute w-1.5 h-1.5 rounded-full bg-white/90 dark:bg-orange-200/90 backdrop-blur-sm"></div>
              </div>
              <span className="text-xs dark:text-gray-300 text-gray-600">较慢</span>
            </div>

            <div className="flex items-center">
              <div className="relative h-5 w-5 flex items-center justify-center mr-1.5">
                <div className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-red-500/90 to-red-700/90 shadow-md shadow-red-500/20 dark:shadow-red-900/30 ring-1 ring-red-200/60 dark:ring-red-800/60 backdrop-blur-md"></div>
                <div className="absolute w-3 h-3 flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-2 h-2 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <span className="text-xs dark:text-gray-300 text-gray-600">无法访问</span>
            </div>
          </div>
          <div className="flex items-center ml-auto">
            <div className="flex items-center mr-3">
              <ExclamationCircleIcon className="w-3.5 h-3.5 text-amber-500 mr-1" />
              <p className="text-xs text-gray-500 dark:text-gray-400">头像加载失败会显示首字母</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mr-2">状态每24小时自动更新一次</p>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`text-xs px-3 py-1.5 rounded-full flex items-center transition-all duration-300 shadow-sm backdrop-blur-sm
                ${isRefreshing
                  ? 'bg-gray-400/80 text-gray-100 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500/90 to-blue-600/90 hover:from-blue-600/90 hover:to-blue-700/90 text-white hover:shadow transform hover:-translate-y-0.5'
                }`}
            >
              <svg
                className={`w-3 h-3 mr-1.5 ${isRefreshing ? 'animate-spin' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {isRefreshing ? '刷新中...' : '刷新状态'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* 友链列表容器 */}
      <div className="space-y-16">
        {/* 置顶朋友 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* 分区标题 */}
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold dark:text-white text-gray-900 tracking-tight">置顶</h2>
            <div className="h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent ml-4 flex-grow"></div>
          </div>

          {/* 置顶友链卡片 - 大尺寸设计 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myFriends.map((friend, index) => (
              <motion.a
                key={index}
                href={friend.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeIn}
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="block h-full"
                style={{ willChange: 'transform' }}
              >
                <div
                  style={cardStyle}
                  className={`h-full bg-gradient-to-br ${getFriendColor(friend.name).bg} backdrop-blur-xl ${getFriendColor(friend.name).border} ${getFriendColor(friend.name).shadow}`}
                >
                  <div className="p-5 flex items-center h-full">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 dark:border-gray-700 border-white shadow-md flex-shrink-0 relative">
                      {avatarErrors[friend.name] ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                          <div className="flex flex-col items-center justify-center">
                            <span className="text-xl font-bold text-gray-500 dark:text-gray-400">
                              {getInitials(friend.name)}
                            </span>
                            <ExclamationCircleIcon className="w-5 h-5 text-amber-500 mt-1" />
                          </div>
                        </div>
                      ) : (
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                          style={{ willChange: 'transform' }}
                          onError={() => handleAvatarError(friend.name)}
                        />
                      )}
                      <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full ${getFriendColor(friend.name).text.replace('text-', 'bg-').replace('dark:', '')}`}></div>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className={`text-lg md:text-xl font-semibold ${getFriendColor(friend.name).text} truncate tracking-tight`}>{friend.name}</h3>
                      {friend.description && (
                        <p className="text-sm dark:text-gray-300 text-gray-600 mt-1 line-clamp-2 leading-relaxed">{friend.description}</p>
                      )}
                    </div>
                    <StatusIndicator url={friend.url} avatarUrl={friend.avatar} />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* 朋友列表 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* 分区标题 */}
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold dark:text-white text-gray-900 tracking-tight">朋友们</h2>
            <div className="h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent ml-4 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {moreFriends.map((friend, index) => (
              <motion.a
                key={index}
                href={friend.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeIn}
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="block h-full"
                style={{ willChange: 'transform' }}
              >
                <div
                  style={cardStyle}
                  className={`h-full bg-gradient-to-br ${getFriendColor(friend.name).bg} backdrop-blur-xl ${getFriendColor(friend.name).border} ${getFriendColor(friend.name).shadow}`}
                >
                  <div className="p-4 flex items-center h-full">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 dark:border-gray-700 border-white shadow-md flex-shrink-0 relative">
                      {avatarErrors[friend.name] ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                          <div className="flex flex-col items-center justify-center">
                            <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                              {getInitials(friend.name)}
                            </span>
                            <ExclamationCircleIcon className="w-3 h-3 text-amber-500 mt-0.5" />
                          </div>
                        </div>
                      ) : (
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                          style={{ willChange: 'transform' }}
                          onError={() => handleAvatarError(friend.name)}
                        />
                      )}
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${getFriendColor(friend.name).text.replace('text-', 'bg-').replace('dark:', '')}`}></div>
                    </div>
                    <div className="ml-3 flex-1">
                      <h3 className={`text-sm font-semibold ${getFriendColor(friend.name).text} truncate tracking-tight`}>{friend.name}</h3>
                      {friend.description && (
                        <p className="text-xs dark:text-gray-300 text-gray-600 mt-0.5 line-clamp-1 leading-relaxed">{friend.description}</p>
                      )}
                    </div>
                    <StatusIndicator url={friend.url} avatarUrl={friend.avatar} />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* 我的收藏 - 已注释掉 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12"
        >
          {/* <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-6 tracking-tight">我的收藏</h2> */}

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {myLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeIn}
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.02 }}
                className="block h-full"
              >
                <div 
                  style={cardStyle} 
                  className={`h-full bg-gradient-to-br ${getFriendColor(link.name).bg} backdrop-blur-xl ${getFriendColor(link.name).border} ${getFriendColor(link.name).shadow}`}
                >
                  <div className="p-4 flex items-center h-full">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 dark:border-gray-700 border-white shadow-md flex-shrink-0 relative">
                      {avatarErrors[link.name] ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                          <div className="flex flex-col items-center justify-center">
                            <span className="text-base font-bold text-gray-500 dark:text-gray-400">
                              {getInitials(link.name)}
                            </span>
                            <ExclamationCircleIcon className="w-4 h-4 text-amber-500 mt-0.5" />
                          </div>
                        </div>
                      ) : (
                        <img 
                          src={link.avatar} 
                          alt={link.name} 
                          className="w-full h-full object-cover"
                          onError={() => handleAvatarError(link.name)}
                        />
                      )}
                      <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full ${getFriendColor(link.name).text.replace('text-', 'bg-').replace('dark:', '')}`}></div>
                    </div>
                    <div className="ml-3 flex-1">
                      <h3 className={`text-base font-semibold ${getFriendColor(link.name).text} truncate tracking-tight`}>{link.name}</h3>
                      {link.description && (
                        <p className="text-xs dark:text-gray-300 text-gray-600 mt-1 line-clamp-2 leading-relaxed">{link.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div> */}
        </motion.div>

        {/* 申请友链说明 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className={`bg-gradient-to-br from-gray-100/30 to-gray-200/30 dark:from-gray-800/30 dark:to-gray-900/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/30 shadow-sm`}
          style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
        >
          {/* 申请友链标题 */}
          <div className="flex items-center mb-6">
            <h3 className="text-xl font-bold dark:text-white text-gray-900 tracking-tight flex items-center">
              <UserIcon className="w-5 h-5 mr-2 dark:text-blue-400 text-blue-600" />
              申请友链须知
            </h3>
            <div className="h-0.5 bg-gradient-to-r from-teal-500/50 to-transparent ml-4 flex-grow"></div>
          </div>

          <ul className="space-y-4 text-base dark:text-gray-300 text-gray-700 leading-relaxed max-w-3xl mx-auto">
            <li className="flex items-start">
              <span className="mr-2 text-lg dark:text-blue-400 text-blue-600">•</span>
              申请友链前请务必确保贵站有我站的友链，若审批通过后移除本站链接，本站也将移除友链，并加入黑名单。
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-lg dark:text-purple-400 text-purple-600">•</span>
              若站点长时间无法访问，我会删除您的友链，恢复后可再次申请。
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-lg dark:text-teal-400 text-teal-600">•</span>
              请保证您的网站不存在被治安管制的内容及违法内容，没有过多广告、无恶意软件、脚本，且链文章原创出处。
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-lg dark:text-blue-400 text-blue-600">•</span>
              请保站点全局启用HTTPS
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-lg dark:text-purple-400 text-purple-600">•</span>
              您需要有自己的独立域名，暂且不同公开子域名或免费域名类的友链申请（如github.io、vercel.app、eu.org、js.cool、tk、ml、cf等）
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-lg dark:text-teal-400 text-teal-600">•</span>
              暂时不同意商业及非个人的网站的友链申请
            </li>
          </ul>
        </motion.div>
      </div>

      {/* 友链申请与站点信息 - 左右并排布局 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-12 mb-8"
      >
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white text-gray-900 tracking-tight flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"></path>
              <path d="M12 13V9"></path>
              <path d="M12 17h.01"></path>
            </svg>
            友链申请与站点信息
          </h2>
          <div className="h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent ml-4 flex-grow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 左侧：添加方式 */}
          <div className="bg-gradient-to-br from-gray-100/30 to-gray-200/30 dark:from-gray-800/30 dark:to-gray-900/30 
                        backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/30 
                        shadow-sm h-full transform hover:scale-[1.01] transition-all duration-300"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              willChange: 'transform'
            }}>
            <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-4 tracking-tight flex items-center">
              <svg className="w-5 h-5 mr-2 text-teal-600 dark:text-teal-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              提交申请
            </h3>
            <div className="h-0.5 bg-gradient-to-r from-teal-500/50 to-transparent mb-6"></div>

            <div className="space-y-4">

              <div className="bg-white/10 dark:bg-gray-900/20 rounded-xl p-4 border border-gray-200/30 dark:border-gray-700/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium dark:text-white text-gray-900">站内提交</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">快速提交友链申请</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowFeishuWebhook(true)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg transform hover:scale-105"
                    style={{ willChange: 'transform' }}
                  >
                    提交申请
                  </button>
                </div>
              </div>

              <p className="text-base dark:text-gray-300 text-gray-700 font-medium mt-4">需要提供的信息：</p>
              <div className="space-y-2.5">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  <p className="text-sm dark:text-gray-300 text-gray-700">昵称</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
                  <p className="text-sm dark:text-gray-300 text-gray-700">站点标题</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-500"></div>
                  <p className="text-sm dark:text-gray-300 text-gray-700">网站</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <p className="text-sm dark:text-gray-300 text-gray-700">头像</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  <p className="text-sm dark:text-gray-300 text-gray-700">描述</p>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：站点信息 */}
          <div className="bg-gradient-to-br from-gray-100/30 to-gray-200/30 dark:from-gray-800/30 dark:to-gray-900/30 
                        backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/30 
                        shadow-sm h-full transform hover:scale-[1.01] transition-all duration-300"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)'
            }}>
            <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-4 tracking-tight flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 3a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5z"></path>
                <path d="M12 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
              </svg>
              站点信息
            </h3>
            <div className="h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent mb-6"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center bg-white/10 dark:bg-gray-900/20 rounded-xl p-4 border border-gray-200/30 dark:border-gray-700/30">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100/50 dark:bg-blue-900/30">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">站点标题</p>
                  <p className="font-medium dark:text-white text-gray-900">damesck的小屋</p>
                </div>
              </div>

              <div className="flex items-center bg-white/10 dark:bg-gray-900/20 rounded-xl p-4 border border-gray-200/30 dark:border-gray-700/30">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-purple-100/50 dark:bg-purple-900/30">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">站点描述</p>
                  <p className="font-medium dark:text-white text-gray-900">致不完美的明天_</p>
                </div>
              </div>

              <div className="flex items-center bg-white/10 dark:bg-gray-900/20 rounded-xl p-4 border border-gray-200/30 dark:border-gray-700/30">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-amber-100/50 dark:bg-amber-900/30">
                  <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="5"></circle>
                    <path d="M20 21a8 8 0 0 0-16 0"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">URL</p>
                  <p className="font-medium dark:text-white text-gray-900">damesck.net</p>
                </div>
              </div>

              <div className="flex items-center bg-white/10 dark:bg-gray-900/20 rounded-xl p-4 border border-gray-200/30 dark:border-gray-700/30">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-teal-100/50 dark:bg-teal-900/30">
                  <svg className="w-5 h-5 text-teal-600 dark:text-teal-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">头像</p>
                  <a href="https://api.damesck.net/avatar.png" className="font-medium text-blue-600 dark:text-blue-400 hover:underline transition-colors" target="_blank" rel="noopener noreferrer">点击下载</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 飞书机器人弹窗 */}
      <AnimatePresence>
        {showFeishuWebhook && (
          <FeishuWebhook
            isOpen={showFeishuWebhook}
            onClose={() => setShowFeishuWebhook(false)}
            type="friend"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Friends;