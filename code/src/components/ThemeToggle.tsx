import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className = '' }: ThemeToggleProps) => {
  // 检查系统主题偏好和本地存储的主题设置
  const [isDark, setIsDark] = useState(() => {
    // 先检查本地存储
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // 如果没有本地存储，则检查系统偏好
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // 切换主题
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // 每当isDark改变时，更新文档类和本地存储
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // 只有在用户没有手动设置主题时才跟随系统
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches);
      }
    };

    // 添加事件监听
    mediaQuery.addEventListener('change', handleChange);

    // 清理函数
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle-btn ${className}`}
      aria-label={isDark ? '切换到亮色模式' : '切换到暗色模式'}
      title={isDark ? '切换到亮色模式' : '切换到暗色模式'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {isDark ? (
          <MoonIcon className="w-5 h-5 text-blue-100" />
        ) : (
          <SunIcon className="w-5 h-5 text-amber-400" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle; 