import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { UserIcon, GlobeAltIcon, UserGroupIcon } from '@heroicons/react/24/outline';

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
      name: "Snowball_233",
      avatar: "https://blog.qwq.my/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F97330394%3Fv%3D4&w=640&q=75",
      url: "https://qwq.my",
      description: "qwq.my"
    },
    {
      name: "苦力怕纸",
      avatar: "https://user.klpbbs.com/data/avatar/000/00/00/01_avatar_big.jpg",
      url: "https://klpz.net/",
      description: "苦力怕论坛站长"
    }
  ]);

  const [moreFriends, setMoreFriends] = useState<Friend[]>([
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

  // iOS风格的卡片样式
  const cardStyle = {
    backgroundColor: 'var(--glass-bg)',
    borderRadius: '20px',
    boxShadow: '0 4px 16px var(--glass-shadow), 0 2px 4px rgba(0,0,0,0.04)',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
    border: '1px solid var(--glass-border)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)'
  };

  // 鼠标悬停时的放大效果
  const hoverStyle = {
    transform: 'scale(1.03)',
    boxShadow: '0 8px 24px var(--glass-shadow), 0 4px 8px rgba(0,0,0,0.06)'
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

    // 根据数字选择颜色组合
    const colorOptions = [
      {
        bg: 'from-blue-400/10 to-blue-600/10 dark:from-blue-700/20 dark:to-blue-900/20',
        border: 'border-blue-200/30 dark:border-blue-700/30',
        shadow: 'shadow-blue-500/5 dark:shadow-blue-800/10',
        text: 'text-blue-600 dark:text-blue-400'
      },
      {
        bg: 'from-purple-400/10 to-purple-600/10 dark:from-purple-700/20 dark:to-purple-900/20',
        border: 'border-purple-200/30 dark:border-purple-700/30',
        shadow: 'shadow-purple-500/5 dark:shadow-purple-800/10',
        text: 'text-purple-600 dark:text-purple-400'
      },
      {
        bg: 'from-teal-400/10 to-teal-600/10 dark:from-teal-700/20 dark:to-teal-900/20',
        border: 'border-teal-200/30 dark:border-teal-700/30',
        shadow: 'shadow-teal-500/5 dark:shadow-teal-800/10',
        text: 'text-teal-600 dark:text-teal-400'
      },
      {
        bg: 'from-pink-400/10 to-pink-600/10 dark:from-pink-700/20 dark:to-pink-900/20',
        border: 'border-pink-200/30 dark:border-pink-700/30',
        shadow: 'shadow-pink-500/5 dark:shadow-pink-800/10',
        text: 'text-pink-600 dark:text-pink-400'
      },
      {
        bg: 'from-amber-400/10 to-amber-600/10 dark:from-amber-700/20 dark:to-amber-900/20',
        border: 'border-amber-200/30 dark:border-amber-700/30',
        shadow: 'shadow-amber-500/5 dark:shadow-amber-800/10',
        text: 'text-amber-600 dark:text-amber-400'
      },
      {
        bg: 'from-indigo-400/10 to-indigo-600/10 dark:from-indigo-700/20 dark:to-indigo-900/20',
        border: 'border-indigo-200/30 dark:border-indigo-700/30',
        shadow: 'shadow-indigo-500/5 dark:shadow-indigo-800/10',
        text: 'text-indigo-600 dark:text-indigo-400'
      },
      {
        bg: 'from-green-400/10 to-green-600/10 dark:from-green-700/20 dark:to-green-900/20',
        border: 'border-green-200/30 dark:border-green-700/30',
        shadow: 'shadow-green-500/5 dark:shadow-green-800/10',
        text: 'text-green-600 dark:text-green-400'
      },
      {
        bg: 'from-red-400/10 to-red-600/10 dark:from-red-700/20 dark:to-red-900/20',
        border: 'border-red-200/30 dark:border-red-700/30',
        shadow: 'shadow-red-500/5 dark:shadow-red-800/10',
        text: 'text-red-600 dark:text-red-400'
      }
    ];

    return colorOptions[Math.abs(hash) % colorOptions.length];
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
                whileHover={{ scale: 1.02 }}
                className="block h-full"
              >
                <div
                  style={cardStyle}
                  className={`h-full bg-gradient-to-br ${getFriendColor(friend.name).bg} backdrop-blur-xl ${getFriendColor(friend.name).border} ${getFriendColor(friend.name).shadow}`}
                >
                  <div className="p-5 flex items-center h-full">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 dark:border-gray-700 border-white shadow-md flex-shrink-0 relative">
                      <img src={friend.avatar} alt={friend.name} className="w-full h-full object-cover" />
                      <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full ${getFriendColor(friend.name).text.replace('text-', 'bg-').replace('dark:', '')}`}></div>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className={`text-lg md:text-xl font-semibold ${getFriendColor(friend.name).text} truncate tracking-tight`}>{friend.name}</h3>
                      {friend.description && (
                        <p className="text-sm dark:text-gray-300 text-gray-600 mt-1 line-clamp-2 leading-relaxed">{friend.description}</p>
                      )}
                    </div>
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
                whileHover={{ scale: 1.02 }}
                className="block h-full"
              >
                <div
                  style={cardStyle}
                  className={`h-full bg-gradient-to-br ${getFriendColor(friend.name).bg} backdrop-blur-xl ${getFriendColor(friend.name).border} ${getFriendColor(friend.name).shadow}`}
                >
                  <div className="p-4 flex items-center h-full">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 dark:border-gray-700 border-white shadow-md flex-shrink-0 relative">
                      <img src={friend.avatar} alt={friend.name} className="w-full h-full object-cover" />
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${getFriendColor(friend.name).text.replace('text-', 'bg-').replace('dark:', '')}`}></div>
                    </div>
                    <div className="ml-3 flex-1">
                      <h3 className={`text-sm font-semibold ${getFriendColor(friend.name).text} truncate tracking-tight`}>{friend.name}</h3>
                      {friend.description && (
                        <p className="text-xs dark:text-gray-300 text-gray-600 mt-0.5 line-clamp-1 leading-relaxed">{friend.description}</p>
                      )}
                    </div>
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
                      <img src={link.avatar} alt={link.name} className="w-full h-full object-cover" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ul className="space-y-4 text-base dark:text-gray-300 text-gray-700 leading-relaxed">
                <li className="flex items-start">
                  <span className="mr-2 text-lg dark:text-blue-400 text-blue-600">•</span>
                  申请友链请将博客必备项目检查完毕并有我站的友链，并加入黑名单。
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
                  暂时不同意路边及其个人网站的友链申请
                </li>
              </ul>
            </div>

            <div className="bg-white/10 dark:bg-gray-900/20 rounded-xl p-5 border border-gray-200/30 dark:border-gray-700/30">
              <h4 className="text-lg font-semibold dark:text-white text-gray-900 mb-3 flex items-center tracking-tight">
                <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                添加方式
              </h4>

              <div className="space-y-3">
                <p className="text-sm dark:text-gray-300 text-gray-700">
                  发送邮箱：<a href="mailto:Email@damesck.net" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Email@damesck.net</a>
                </p>

                <p className="text-sm dark:text-gray-300 text-gray-700 font-medium">发送内容：</p>
                <ul className="pl-5 space-y-1.5">
                  <li className="text-sm dark:text-gray-300 text-gray-700 list-disc">昵称</li>
                  <li className="text-sm dark:text-gray-300 text-gray-700 list-disc">站点标题</li>
                  <li className="text-sm dark:text-gray-300 text-gray-700 list-disc">网站</li>
                  <li className="text-sm dark:text-gray-300 text-gray-700 list-disc">头像</li>
                  <li className="text-sm dark:text-gray-300 text-gray-700 list-disc">描述</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 站点标题 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="text-center mt-12"
      >
        <p className="text-sm dark:text-gray-300 text-gray-600 backdrop-blur-sm py-2 rounded-full bg-gray-50/20 dark:bg-gray-800/20 inline-block px-6 font-medium">站点标题：damesck的小屋</p>
      </motion.div>
    </div>
  );
};

export default Friends; 