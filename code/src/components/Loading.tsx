import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: {
    opacity: 0,
    filter: "blur(4px)",
    transition: { duration: 0.4, ease: "easeInOut" }
  }
};

const Loading = () => {
  const [progress, setProgress] = useState(0);

  // 优化模拟加载进度，但保留动画效果
  useEffect(() => {
    // 使用 requestAnimationFrame 替代 setInterval 提高性能
    let rafId: number;
    let startTime = performance.now();
    const duration = 3000; // 加载动画时长

    const updateProgress = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      // 使用缓动函数计算进度，减少计算量
      const newProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(newProgress);

      if (elapsed < duration) {
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    rafId = requestAnimationFrame(updateProgress);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-blue-400/60 to-blue-600/60 backdrop-blur-lg"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* 简化的背景，但保留一些动画元素 */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              width: '100px',
              height: '100px',
              top: `${20 + i * 20}%`,
              left: `${10 + i * 30}%`,
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">
        {/* Logo动画 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut"
          }}
          className="mb-8 relative"
        >
          {/* 光效 */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/30 blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1.5 }}
          />
          <img src="/logo.svg" alt="Logo" className="w-24 h-24 mx-auto relative z-10" />
        </motion.div>

        {/* 品牌名称 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-3xl font-bold text-white mb-8"
        >
          damesck
        </motion.h1>

        {/* 加载文字 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-white/80 text-sm mb-6"
        >
          {progress < 100 ? '正在加载资源...' : '准备就绪'}
        </motion.p>

        {/* 加载进度条 */}
        <div className="w-60 h-1 bg-white/20 rounded-full overflow-hidden mx-auto mb-4">
          <motion.div
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* 旋转加载指示器 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear"
          }}
          className="w-6 h-6 mx-auto mb-4"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="60"
              strokeDashoffset="10"
              opacity="0.3"
            />
            <path
              d="M12 2C6.47715 2 2 6.47715 2 12"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loading; 