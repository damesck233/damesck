import { motion, Variants, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// Apple风格的缓动函数
const appleEaseOut = [0.22, 1, 0.36, 1]; // 更精细的Apple风格缓出效果
const appleEaseIn = [0.64, 0, 0.78, 0]; // Apple风格缓入效果
const appleEaseInOut = [0.4, 0, 0.2, 1]; // Apple风格曲线

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: appleEaseOut
    }
  },
  exit: {
    opacity: 0,
    filter: "blur(8px)",
    transition: {
      duration: 1.2,  // 确保足够的退出时间
      ease: appleEaseIn,
      opacity: { duration: 1 } // 确保透明度动画平滑
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
      duration: 3, // 延长动画时间
      repeat: Infinity,
      repeatType: "loop",
      delay: i * 0.15, // 增加错开效果
      times: [0, 0.4, 1],
      ease: "easeInOut" // 更平滑的动画
    }
  }),
  exit: (i: number) => ({
    opacity: 0,
    scale: 0.8,
    filter: "blur(10px)",
    transition: {
      duration: 0.8,
      delay: i * 0.04,  // 错开效果
      ease: appleEaseIn
    }
  })
};

const logoVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    y: 15,
    rotateY: -15
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateY: 0,
    transition: {
      duration: 1.2, // 延长时间
      ease: [0.34, 1.56, 0.64, 1], // 弹性效果
      scale: {
        duration: 1.2,
        ease: [0.34, 1.56, 0.64, 1], // 弹性效果
        type: "spring",
        stiffness: 100,
        damping: 15
      },
      delay: 0.3
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -10,
    transition: {
      duration: 0.8,
      ease: appleEaseIn
    }
  }
};

const textVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: appleEaseOut,
      delay: 0.6
    }
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.7,
      ease: appleEaseIn
    }
  }
};

// 新增字母弹跳动画变体 - Apple风格
const letterVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.8 + i * 0.06, // 增加错开时间
      type: "spring",
      stiffness: 100,
      damping: 12, // 增加弹性
      ease: [0.34, 1.56, 0.64, 1] // 弹性曲线
    }
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.5,
      delay: i * 0.03,
      ease: appleEaseIn
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
    transition: {
      duration: 0.8,
      ease: appleEaseOut
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1.5,
      ease: appleEaseIn
    }
  }
};

const Loading = () => {
  const [isReady, setIsReady] = useState(false);
  const [startExit, setStartExit] = useState(false);
  const brandName = "damesck";

  useEffect(() => {
    // 加载完成定时器
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 3000); // 恢复为3秒，确保体验充分展现

    // 预加载主内容的定时器
    const exitTimer = setTimeout(() => {
      // 开始退出前的准备动画
      setStartExit(true);
    }, 2800);  // 比加载完成提前一点，创建平滑过渡

    return () => {
      clearTimeout(timer);
      clearTimeout(exitTimer);
    }
  }, []);

  // 创建随机粒子位置 - 保持粒子数量增加美感
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 10, // 恢复粒子尺寸多样性
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2, // 增加随机延迟
    duration: 2 + Math.random() * 2, // 增加动画时长多样性
    color: `rgba(255, 255, 255, ${Math.random() * 0.25 + 0.05})` // 增加一些亮度变化
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
                filter: 'blur(8px)'
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
              exit={{ opacity: 0, scale: 1.5, transition: { duration: 0.8, ease: appleEaseIn } }}
              transition={{
                duration: 3.5, // 延长动画时间
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
              transition={{ duration: 0.7, ease: appleEaseInOut }}
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
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: i * 0.12, // 增加错开
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
              exit={{ opacity: 0, y: -10, transition: { duration: 0.7, ease: appleEaseIn } }}
              transition={{ duration: 0.8, ease: appleEaseOut }}
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