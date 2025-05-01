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
  UserGroupIcon
} from '@heroicons/react/24/outline'

// Apple风格的缓动函数
const appleEaseOut = [0.22, 1, 0.36, 1]; // 更精细的Apple风格缓出效果
const appleEaseIn = [0.64, 0, 0.78, 0]; // Apple风格缓入效果
const appleEaseInOut = [0.4, 0, 0.2, 1]; // Apple风格曲线

// 使用 lazy 加载页面组件，但预加载以提高速度
const Home = lazy(() => {
  const homePromise = import('./pages/Home');
  return homePromise;
});
const Blog = lazy(() => import('./pages/Blog'))
const Contact = lazy(() => import('./pages/Contact'))
const Friends = lazy(() => import('./pages/Friends'))
import Loading from './components/Loading'
import WebWalker from './components/WebWalker'
import ThemeToggle from './components/ThemeToggle'
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
    <div className="absolute inset-0 bg-gradient-to-br dark:from-blue-900/40 dark:to-blue-800/40 from-blue-400/30 to-blue-600/30"></div>
  </div>
));

// 将菜单组件分离
const Menu = memo(({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="fixed top-[50px] right-4 z-50 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden w-64 border dark:border-white/10 border-white/20 dark:bg-gray-900/95 bg-white/95"
      >
        <div className="p-2">
          {/* 导航链接 */}
          <div className="divide-y dark:divide-gray-700/30 divide-gray-100/30">
            <NavLink to="/" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-blue-100/50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'}`} onClick={onClose}>
              <HomeIcon className="w-4 h-4" /> 首页
            </NavLink>
            <NavLink to="http://blog.damesck.net/" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-blue-100/50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'}`} onClick={onClose}>
              <PencilIcon className="w-4 h-4" /> 博客
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-blue-100/50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'}`} onClick={onClose}>
              <PhoneIcon className="w-4 h-4" /> 联系方式
            </NavLink>
          </div>

          {/* 功能区 */}
          <div className="mt-3 pt-3 border-t dark:border-gray-700/30 border-gray-200/30">
            <h3 className="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400">更多</h3>
            <div className="mt-1 space-y-1">
              <a href="#" className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50">
                <svg className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                </svg>
                damesck.cc
              </a>
              <NavLink to="/friends" className={({ isActive }) => `flex items-center px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-blue-100/50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'}`} onClick={onClose}>
                <UserGroupIcon className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                友情链接
              </NavLink>
            </div>
          </div>

          {/* 选项 */}
          <div className="mt-3 pt-3 border-t dark:border-gray-700/30 border-gray-200/30">
            <h3 className="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400">我的</h3>
            <div className="mt-1 space-y-1">
              <a href="#" className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50">
                <svg className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 14h4v4h-4z"></path>
                  <path d="M10 14h4v4h-4z"></path>
                  <path d="M17 14h4v4h-4z"></path>
                  <path d="M10 7h4v4h-4z"></path>
                  <path d="M17 7h4v4h-4z"></path>
                  <path d="M3 7h4v4h-4z"></path>
                </svg>
                管理后台(没写呢)
              </a>
              <a href="#" className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50">
                <svg className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 9l3 3l-3 3"></path>
                  <path d="M13 15h3a1 1 0 0 0 1 -1v-4a1 1 0 0 0 -1 -1h-3"></path>
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                </svg>
                关于网站
              </a>
              <a href="https://qwq.my" className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50">
                <svg className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
                雪球qwq.my
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
));

// 将页面内容组件分离
const PageContent = memo(() => (
  <main className="flex-grow p-4 md:p-6 lg:p-8">
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
      </Routes>
    </Suspense>
  </main>
));

// 导航栏组件单独提取，以便单独控制其动画
const NavigationBar = memo(({ isVisible, toggleMenu, menuOpen }: { isVisible: boolean; toggleMenu: () => void; menuOpen: boolean }) => (
  <motion.nav
    initial={{ opacity: 0, y: -20 }}
    animate={{
      opacity: isVisible ? 1 : 0,
      y: isVisible ? 0 : -20
    }}
    transition={{
      duration: 0.8,
      ease: appleEaseOut,
      delay: 0.3 // 在主内容开始显示后，导航栏再显示
    }}
    className="py-3 px-4 flex justify-between items-center backdrop-blur-xl sticky top-0 z-50 shadow-sm relative dark:bg-gray-900/20 dark:border-gray-700/10 bg-white/8 border-b border-white/10"
  >
    {/* 顶部亮光效果 */}
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

    {/* 左侧Logo */}
    <div className="flex items-center gap-2">
      <img src="/logo.png" alt="Logo" className="w-6 h-6 rounded-full" />
      <span className="text-base font-semibold dark:text-white/90 text-white/90">damesck</span>
    </div>

    {/* 中间区域可以留空 */}
    <div className="flex-1"></div>

    {/* 右侧区域：主题切换、用户头像和菜单按钮 */}
    <div className="flex items-center gap-3">
      {/* 主题切换按钮 */}
      <ThemeToggle className="mr-1" />

      {/* 菜单按钮 */}
      <button
        onClick={toggleMenu}
        className="p-1 rounded-full dark:bg-white/5 dark:hover:bg-white/10 bg-white/10 hover:bg-white/15 transition-colors"
      >
        {menuOpen ? (
          <XMarkIcon className="h-5 w-5 text-white dark:text-gray-200" />
        ) : (
          <Bars3Icon className="h-5 w-5 text-white dark:text-gray-200" />
        )}
      </button>
    </div>
  </motion.nav>
));

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPreRendering, setIsPreRendering] = useState(false);
  const [bgImageUrl, setBgImageUrl] = useState('');
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [themeInitialized, setThemeInitialized] = useState(false);
  const componentsPreloaded = useRef(false);
  // 添加控制导航栏显示的状态
  const [navbarVisible, setNavbarVisible] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
      import('./pages/Home');

      componentsPreloaded.current = true;
    }
  }, []);

  useEffect(() => {
    if (!themeInitialized) return; // 等待主题初始化

    // 确保加载组件显示足够长时间以完成动画，但不要太长
    const minLoadingTime = 2000; // 减少到2秒
    const startTime = Date.now();

    // 预加载超时缩短
    const timer = setTimeout(() => {
      console.log('强制显示内容：预加载超时');
      setIsLoading(false);
      // 内容显示后，延迟显示导航栏
      setTimeout(() => setNavbarVisible(true), 300);
    }, 3500); // 减少超时时间

    // 预缓存背景图片 URL
    const bgUrl = 'https://www.loliapi.com/acg/';

    // 优化预加载，并行处理更多资源
    try {
      console.log('开始预加载资源...');
      const imagesToPreload = [
        bgUrl,  // 背景图片
        '/logo.png',  // Logo
        '/logo.svg',  // SVG Logo for loading screen
      ];

      // 设置背景图片 URL
      setBgImageUrl(bgUrl);

      // 更提前显示预渲染内容
      setTimeout(() => {
        console.log('开始预渲染主内容');
        setIsPreRendering(true);

        // 确保主内容已经渲染但处于隐藏状态
        if (mainContentRef.current) {
          mainContentRef.current.style.visibility = 'hidden';
          mainContentRef.current.style.opacity = '0';
          // 确保DOM已完全加载
          mainContentRef.current.style.display = 'block';
        }
      }, 1000); // 减少到1秒

      preloadResourcesWithMinTime(imagesToPreload, 1000)
        .then(() => {
          const elapsed = Date.now() - startTime;
          const remainingTime = Math.max(0, minLoadingTime - elapsed);

          // 内容准备就绪后立即开始过渡
          setTimeout(() => {
            console.log('预加载完成，显示主页面');
            clearTimeout(timer);

            // 已预渲染的内容可见性变更
            if (mainContentRef.current) {
              mainContentRef.current.style.visibility = 'visible';
              mainContentRef.current.style.opacity = '1';
            }

            setIsLoading(false);

            // 内容显示后，延迟显示导航栏
            setTimeout(() => setNavbarVisible(true), 300);
          }, Math.max(100, remainingTime)); // 确保至少有100ms的延迟以允许UI更新
        })
        .catch(error => {
          console.error('预加载过程出错:', error);
          // 确保出错时也会显示页面
          if (mainContentRef.current) {
            mainContentRef.current.style.visibility = 'visible';
            mainContentRef.current.style.opacity = '1';
          }
          setIsLoading(false);

          // 内容显示后，延迟显示导航栏
          setTimeout(() => setNavbarVisible(true), 300);
        });
    } catch (error) {
      console.error('预加载初始化错误:', error);
      // 确保出错时也会显示页面
      setIsLoading(false);

      // 内容显示后，延迟显示导航栏
      setTimeout(() => setNavbarVisible(true), 300);
    }

    return () => clearTimeout(timer);
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
      >
        {/* 顶部导航栏 - 使用单独的动画组件 */}
        <NavigationBar isVisible={navbarVisible} toggleMenu={toggleMenu} menuOpen={menuOpen} />

        {/* 分离的菜单组件 */}
        <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

        {/* 分离的页面内容组件 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: !isLoading ? 1 : 0, y: !isLoading ? 0 : 20 }}
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
          animate={{ opacity: !isLoading ? 1 : 0 }}
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

      {/* 加载动画层 */}
      <AnimatePresence mode="wait">
        {isLoading && <Loading />}
      </AnimatePresence>
    </Router>
  )
}

export default App