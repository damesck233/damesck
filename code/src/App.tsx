import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, lazy, Suspense, memo, useRef } from 'react'
import {
  HomeIcon,
  BriefcaseIcon,
  BeakerIcon,
  PencilIcon,
  PhoneIcon,
  Bars3Icon,
  XMarkIcon,
  UserGroupIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

// Apple风格的缓动函数
const appleEaseOut = [0.22, 1, 0.36, 1]; // 更精细的Apple风格缓出效果
const appleEaseIn = [0.64, 0, 0.78, 0]; // Apple风格缓入效果
const appleEaseInOut = [0.4, 0, 0.2, 1]; // Apple风格曲线

// 使用 lazy 加载页面组件，但预加载以提高速度
const Home = lazy(() => import('./pages/Home'));
const Blog = lazy(() => import('./pages/Blog'))
const Contact = lazy(() => import('./pages/Contact'))
const Friends = lazy(() => import('./pages/Friends'))
const Travels = lazy(() => import('./pages/Travels'))
import WebWalker from './components/WebWalker'
import DynamicIslandNav from './components/DynamicIslandNav'
import RestrictedAccess from './components/RestrictedAccess'
import { preloadResourcesWithMinTime } from './utils/preloader'

// 将背景图片组件分离，减少重渲染
const BackgroundImage = memo(({ bgUrl }: { bgUrl: string }) => (
  <div
    className="fixed inset-0 w-full h-full z-[-1] animate-element bg-image"
    style={{
      backgroundImage: `url(${bgUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
  >
    {/* 亮色模式使用粉色遮罩，暗色模式使用深蓝色遮罩 */}
    <div className="absolute inset-0 bg-pink-200/30 dark:bg-slate-900/60"></div>
  </div>
));

// 将菜单组件分离 - 已替换为 DynamicIslandNav
// const Menu = ... 移除
// const NavigationBar = ... 移除

// 将页面内容组件分离
const PageContent = memo(() => (
  // 增加顶部内边距，防止内容被灵动岛遮挡 (pt-20 ~ pt-24)
  <main className="flex-grow px-4 md:px-6 lg:px-8 pt-20 md:pt-24 pb-8">
    <Suspense fallback={
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
        <span className="ml-2 text-blue-500 dark:text-blue-400">加载中...</span>
      </div>
    }>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/travels" element={<RestrictedAccess />} />
      </Routes>
    </Suspense>
  </main>
));

function App() {
  const [bgImageUrl, setBgImageUrl] = useState('');
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [themeInitialized, setThemeInitialized] = useState(false);
  const componentsPreloaded = useRef(false);


  // 立即初始化主题模式，不等待其他资源
  useEffect(() => {
    // 检查本地存储中的主题设置
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // 如果没有本地设置但系统是暗黑模式，则使用暗黑模式
      document.documentElement.classList.add('dark');
    }

    setThemeInitialized(true);
  }, []);

  // 提前预加载组件
  useEffect(() => {
    if (!componentsPreloaded.current) {
      // 立即开始预加载主要组件
      const preloadPromises = [
        import('./pages/Home'),
        import('./pages/Contact'),
        import('./pages/Friends'),
        import('./pages/Travels')
      ];

      // 使用Promise.all并行加载
      Promise.all(preloadPromises).catch(err => {
        console.warn('组件预加载错误:', err);
      });

      componentsPreloaded.current = true;
    }
  }, []);

  useEffect(() => {
    if (!themeInitialized) return; // 等待主题初始化

    // 预缓存背景图片 URL
    const bgUrl = 'https://www.loliapi.com/acg/';
    setBgImageUrl(bgUrl);
  }, [themeInitialized]); // 依赖于主题初始化

  return (
    <Router>
      {/* WebWalker组件放在最外层，管理所有动画效果 */}
      <WebWalker />

      {/* 背景图片可以放在外部，确保在组件间过渡时保持显示 */}
      {bgImageUrl && <BackgroundImage bgUrl={bgImageUrl} />}

      {/* 主内容区域 - 使用Apple风格的动画 */}
      <motion.div
        key="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: appleEaseOut,
          delay: 0.1,
          opacity: { duration: 1.2 }
        }}
        className="min-h-screen flex flex-col relative"
        style={{ minHeight: '100vh' }}
        ref={mainContentRef}
      >
        {/* 顶部导航栏 - Dynamic Island */}
        <DynamicIslandNav />


        {/* 分离的页面内容组件 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: appleEaseOut,
            delay: 0.2
          }}
          className="flex-grow flex flex-col min-h-0"
        >
          <PageContent />
        </motion.div>

        {/* 底部栏 */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: appleEaseOut,
            delay: 0.5
          }}
          className="dark:bg-gray-900/40 dark:border-gray-800/30 bg-white/20 backdrop-blur-md border-t border-white/30 p-4 mt-auto shadow-md"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-3 text-base font-medium text-gray-700 dark:text-gray-200">
              <span className="text-gray-800 dark:text-white">©️ 2025</span>
              <span className="mx-1 text-gray-500 dark:text-gray-400">|</span>
              <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">damesck.net</a>
              <span className="mx-1 text-gray-500 dark:text-gray-400">|</span>
              <a href="https://github.com/damesck233/damesck" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GitHub</a>
              {/* <span className="mx-1 text-gray-500 dark:text-gray-400">|</span>
              <a href="https://qwq.my" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">雪球qwq.my</a> */}
            </div>
          </div>
        </motion.footer>
      </motion.div>
    </Router>
  )
}

export default App