import { motion, Variants, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: {
    opacity: 0,
    filter: "blur(5px)",
    transition: {
      duration: 0.5,  // 减少退出动画时间
      ease: [0.19, 1, 0.22, 1],
      opacity: { duration: 0.4 } // 确保透明度动画足够快
    }
  }
};

// 粒子动画变体
const particleVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0,
    y: 20
  },
  animate: (i: number) => ({
    opacity: [0, 0.8, 0.4],
    scale: [0, 1, 0.8],
    y: [20, -10, -30],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop",
      delay: i * 0.05, // 减少延迟
      times: [0, 0.4, 1],
      ease: "easeOut"
    }
  }),
  exit: (i: number) => ({
    opacity: 0,
    scale: 0.8,
    filter: "blur(8px)",
    transition: {
      duration: 0.3,
      delay: i * 0.02  // 交错退出时间缩短
    }
  })
};

const logoVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.7,
    y: 20,
    rotateY: -30
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateY: 0,
    transition: {
      duration: 0.8, // 缩短时间
      ease: [0.19, 1, 0.22, 1],
      delay: 0.1 // 缩短延迟
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -10,
    transition: {
      duration: 0.3, // 缩短退出时间
      ease: "easeInOut"
    }
  }
};

const textVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5, // 缩短时间
      ease: "easeOut",
      delay: 0.3 // 缩短延迟
    }
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.2 // 缩短退出时间
    }
  }
};

// 新增字母弹跳动画变体
const letterVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, // 缩短时间
      delay: 0.3 + i * 0.05, // 缩短延迟，但保留交错效果
      ease: [0.33, 1, 0.68, 1]
    }
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2, // 缩短退出时间
      delay: i * 0.02  // 缩短交错退出时间
    }
  })
};

// 为背景添加额外的变体
const bgVariants: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5, // 减少退出时间
      ease: [0.19, 1, 0.22, 1]
    }
  }
};

const Loading = () => {
  const [isReady, setIsReady] = useState(false);
  const [startExit, setStartExit] = useState(false);
  const brandName = "damesck";

  useEffect(() => {
    // 加载完成定时器 - 减少时间
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000); // 从3000减少到2000

    // 预加载主内容的定时器
    const exitTimer = setTimeout(() => {
      // 开始退出前的准备动画
      setStartExit(true);
    }, 1800);  // 比加载完成提前一点，创建平滑过渡

    return () => {
      clearTimeout(timer);
      clearTimeout(exitTimer);
    }
  }, []);

  // 创建随机粒子位置 - 减少粒子数量以提高性能
  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size: Math.random() * 30 + 10, // 稍微减小粒子尺寸
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 1, // 减少最大延迟
    duration: 1.5 + Math.random() * 1.5, // 减少动画时长
    color: `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.05})`
  }));

  return (
    <>
      {/* 背景层 - 单独控制，确保平滑过渡 */}
      <motion.div
        className="fixed inset-0 z-40 bg-gradient-to-br dark:from-blue-900/80 dark:to-indigo-900/80 from-blue-400/60 to-indigo-500/60 backdrop-blur-lg"
        variants={bgVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      />

      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* 漂浮粒子背景 */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              custom={particle.id}
              variants={particleVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute rounded-full"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                background: particle.color,
                filter: 'blur(6px)' // 稍微减少模糊以提高性能
              }}
            />
          ))}
        </div>

        <div className="text-center relative z-10 flex flex-col items-center">
          {/* Logo动画 */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="mb-6 relative perspective-800"
          >
            {/* 光晕效果 */}
            <motion.div
              className="absolute inset-0 rounded-full bg-white/40 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              exit={{ opacity: 0, scale: 1.5, transition: { duration: 0.3 } }}
              transition={{
                duration: 2.5, // 缩短动画时间
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
              style={{
                width: '120px',
                height: '120px',
                left: '-10px',
                top: '-10px'
              }}
            />
            <img src="/logo.svg" alt="Logo" className="w-24 h-24 mx-auto relative z-10 drop-shadow-xl" />
          </motion.div>

          {/* 品牌名称 - 字母逐个弹跳动画 */}
          <div className="flex justify-center items-center mb-8 h-10">
            {brandName.split('').map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-3xl font-bold text-white inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* 加载状态文字 */}
          <motion.div
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative"
          >
            <motion.div
              className="flex items-center gap-2"
              animate={isReady || startExit ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }} // 缩短过渡时间
            >
              <span className="text-white/90 text-sm">加载中</span>
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-white/80"
                    animate={{
                      y: [0, -5, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 0.5, // 缩短动画时间
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: i * 0.08, // 缩短延迟
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              className="absolute top-0 left-0 right-0"
              initial={{ opacity: 0, y: 20 }}
              animate={isReady || startExit ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3 }} // 缩短过渡时间
            >
              <span className="text-white/90 text-sm">准备就绪</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Loading; 