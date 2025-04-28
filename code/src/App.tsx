import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, lazy, Suspense, memo } from 'react'
import {
  HomeIcon,
  BriefcaseIcon,
  BeakerIcon,
  PencilIcon,
  PhoneIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'

// 使用 lazy 加载页面组件
const Home = lazy(() => import('./pages/Home'))
const Blog = lazy(() => import('./pages/Blog'))
const Contact = lazy(() => import('./pages/Contact'))
import Loading from './components/Loading'
import WebWalker from './components/WebWalker'
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
    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-blue-600/30"></div>
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
        className="absolute top-[50px] right-4 z-50 bg-white/95 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden w-64 border border-white/20"
      >
        <div className="p-2">
          {/* 导航链接 */}
          <div className="divide-y divide-gray-100/30">
            <NavLink to="/" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-blue-100/50 text-blue-700' : 'text-gray-700 hover:bg-gray-100/50'}`} onClick={onClose}>
              <HomeIcon className="w-4 h-4" /> 首页
            </NavLink>
            <NavLink to="http://blog.damesck.net/" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-blue-100/50 text-blue-700' : 'text-gray-700 hover:bg-gray-100/50'}`} onClick={onClose}>
              <PencilIcon className="w-4 h-4" /> 博客
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-blue-100/50 text-blue-700' : 'text-gray-700 hover:bg-gray-100/50'}`} onClick={onClose}>
              <PhoneIcon className="w-4 h-4" /> 联系方式
            </NavLink>
          </div>

          {/* 功能区 */}
          <div className="mt-3 pt-3 border-t border-gray-200/30">
            <h3 className="px-3 py-1 text-xs font-semibold text-gray-500">其他链接</h3>
            <div className="mt-1 space-y-1">
              <a href="#" className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100/50">
                <svg className="w-4 h-4 mr-2 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                </svg>
                damesck.cc
              </a>
              <a href="#" className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100/50">
                <svg className="w-4 h-4 mr-2 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                  <path d="M3 7l9 6l9 -6"></path>
                </svg>
                朋友
              </a>
            </div>
          </div>

          {/* 选项 */}
          <div className="mt-3 pt-3 border-t border-gray-200/30">
            <h3 className="px-3 py-1 text-xs font-semibold text-gray-500">我的</h3>
            <div className="mt-1 space-y-1">
              <a href="#" className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100/50">
                <svg className="w-4 h-4 mr-2 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 14h4v4h-4z"></path>
                  <path d="M10 14h4v4h-4z"></path>
                  <path d="M17 14h4v4h-4z"></path>
                  <path d="M10 7h4v4h-4z"></path>
                  <path d="M17 7h4v4h-4z"></path>
                  <path d="M3 7h4v4h-4z"></path>
                </svg>
                管理后台(没写呢)
              </a>
              <a href="#" className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100/50">
                <svg className="w-4 h-4 mr-2 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 9l3 3l-3 3"></path>
                  <path d="M13 15h3a1 1 0 0 0 1 -1v-4a1 1 0 0 0 -1 -1h-3"></path>
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                </svg>
                关于网站
              </a>
              <a href="https://qwq.my" className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100/50">
                <svg className="w-4 h-4 mr-2 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-blue-500">加载中...</span>
      </div>
    }>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Suspense>
  </main>
));

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bgImageUrl, setBgImageUrl] = useState('');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // 确保加载组件显示足够长时间以完成动画
    const minLoadingTime = 2500; // 2.5秒
    const startTime = Date.now();

    // 预加载超时
    const timer = setTimeout(() => {
      console.log('强制显示内容：预加载超时');
      setIsLoading(false);
    }, 5000); // 给予更长的超时时间

    // 预缓存背景图片 URL
    const bgUrl = 'https://www.loliapi.com/acg/';

    // 尝试预加载图片
    try {
      console.log('开始预加载资源...');
      const imagesToPreload = [
        bgUrl,  // 背景图片
        '/logo.png',  // Logo
        '/logo.svg',  // SVG Logo for loading screen
      ];

      // 设置背景图片 URL
      setBgImageUrl(bgUrl);

      preloadResourcesWithMinTime(imagesToPreload, 1500)
        .then(() => {
          const elapsed = Date.now() - startTime;
          const remainingTime = Math.max(0, minLoadingTime - elapsed);

          // 确保加载动画至少显示 minLoadingTime 时间
          setTimeout(() => {
            console.log('预加载完成，显示主页面');
            clearTimeout(timer);
            setIsLoading(false);
          }, remainingTime);
        })
        .catch(error => {
          console.error('预加载过程出错:', error);
          // 确保出错时也会显示页面，但仍然保证最小加载时间
          const elapsed = Date.now() - startTime;
          const remainingTime = Math.max(0, minLoadingTime - elapsed);

          setTimeout(() => {
            setIsLoading(false);
          }, remainingTime);
        });
    } catch (error) {
      console.error('预加载初始化错误:', error);
      // 确保出错时也会显示页面
      setIsLoading(false);
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loading />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="min-h-screen flex flex-col relative"
          >
            {/* 背景图片 - 使用分离的组件 */}
            {bgImageUrl && <BackgroundImage bgUrl={bgImageUrl} />}

            {/* 顶部导航栏 */}
            <nav className="py-3 px-4 flex justify-between items-center bg-white/8 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-sm relative">
              {/* 顶部亮光效果 */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

              {/* 左侧Logo */}
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Logo" className="w-6 h-6 rounded-full" />
                <span className="text-base font-semibold text-white/90">damesck</span>
              </div>

              {/* 中间区域可以留空 */}
              <div className="flex-1"></div>

              {/* 右侧区域：用户头像和菜单按钮 */}
              <div className="flex items-center gap-3">
                {/* 用户头像 */}
                <div className="flex items-center">
                  <button className="flex items-center w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs font-medium">
                    <span className="mx-auto">D</span>
                  </button>
                </div>

                {/* 菜单按钮 */}
                <button
                  onClick={toggleMenu}
                  className="p-1 rounded-full bg-white/10 hover:bg-white/15 transition-colors"
                >
                  {menuOpen ? (
                    <XMarkIcon className="h-5 w-5 text-white" />
                  ) : (
                    <Bars3Icon className="h-5 w-5 text-white" />
                  )}
                </button>
              </div>
            </nav>

            {/* 分离的菜单组件 */}
            <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

            {/* 分离的页面内容组件 */}
            <PageContent />

            {/* Web动画管理组件 */}
            <WebWalker />

            {/* 底部栏 */}
            <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 p-4">
              <div className="max-w-7xl mx-auto">
                {/* 底部三个卡片（你的方案、你的储存空间、数据恢复）已删除 */}
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  )
}

export default App