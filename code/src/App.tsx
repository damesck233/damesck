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
const About = lazy(() => import('./pages/About'))
import WebWalker from './components/WebWalker'
import DynamicIslandNav from './components/DynamicIslandNav'
import RestrictedAccess from './components/RestrictedAccess'
import ScrollToTop from './components/ScrollToTop'
import { preloadResourcesWithMinTime } from './utils/preloader'
const bgImage = 'https://img.klpz.net/file/tc/2026/03/13/69b3cbfa2648f_1773390842.webp'
const bgPlaceholder = 'data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAADwAwCdASoUAA0APzmEuVOvKKWisAgB4CcJZgCdEf/gPjzNvF5J8s1wAPfa9nR9ymMZZjBVj6isAgWQSgCrEdElEDGRKAq8rb0S2RWQUQoT7MFnf4HPdmIsTiW+I5Tryd7G1yX8IYDqAAAA'

// 将背景图片组件分离，减少重渲染
const BackgroundImage = memo(() => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = bgImage;
    img.onload = () => setLoaded(true);
  }, []);

  const bgStyle: React.CSSProperties = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="fixed inset-0 w-full h-full z-[-1]">
      {/* 底层：高清图，始终存在 */}
      <div
        className="absolute inset-0"
        style={{ ...bgStyle, backgroundImage: `url(${bgImage})` }}
      />
      {/* 顶层：模糊占位图，高清图加载完后淡出 */}
      <div
        className="absolute inset-0"
        style={{
          ...bgStyle,
          backgroundImage: `url(${bgPlaceholder})`,
          filter: 'blur(8px)',
          transform: 'scale(1.05)',
          opacity: loaded ? 0 : 1,
          transition: 'opacity 0.6s ease',
        }}
      />
      {/* 亮色模式使用粉色遮罩，暗色模式使用深蓝色遮罩 */}
      <div className="absolute inset-0 bg-white/20 dark:bg-gray-900/55"></div>
    </div>
  );
});

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
        <Route path="/travels" element={<Travels />} />
          <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  </main>
));

function App() {
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

      preloadPromises.push(import('./pages/About'));
      // 使用Promise.all并行加载
      Promise.all(preloadPromises).catch(err => {
        console.warn('组件预加载错误:', err);
      });

      componentsPreloaded.current = true;
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      {/* WebWalker组件放在最外层，管理所有动画效果 */}
      <WebWalker />

      {/* 背景图片可以放在外部，确保在组件间过渡时保持显示 */}
      <BackgroundImage />

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

        {/* 底部胶囊 */}
        <motion.footer
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: appleEaseOut,
            delay: 0.5
          }}
          className="flex justify-center px-4 pb-6 mt-auto"
        >
          <div className="inline-flex flex-wrap justify-center items-center gap-x-1.5 gap-y-1 px-5 py-2 min-h-10 bg-white/30 dark:bg-[#1c1c1e]/30 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg shadow-black/5 rounded-full text-sm text-gray-500 dark:text-gray-400 text-center">
            <span>Designed By damesck · Copyright © 2026</span>
            <a href="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">damesck.net</a>
            <span>All Right Reserved.</span>
          </div>
        </motion.footer>
      </motion.div>
    </Router>
  )
}

export default App