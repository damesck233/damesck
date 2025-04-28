import { useEffect, useRef } from 'react';

/**
 * WebWalker组件
 * 集中管理网站中的所有JavaScript动画效果
 */
const WebWalker = () => {
  // 创建一个ref用于存储动画帧ID
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // 收集页面中可能的动画元素
    const animateElements = document.querySelectorAll('.animate-element');

    // 用于存储所有动画回调函数
    const animations: (() => void)[] = [];

    // 添加Loading组件的动画逻辑
    const loadingAnimation = () => {
      const loadingProgressBar = document.querySelector('.loading-progress-bar');
      if (loadingProgressBar instanceof HTMLElement) {
        const startTime = performance.now();
        const duration = 3000; // 加载动画时长

        const updateProgress = (timestamp: number) => {
          const elapsed = timestamp - startTime;
          // 使用缓动函数计算进度，减少计算量
          const newProgress = Math.min(100, (elapsed / duration) * 100);
          loadingProgressBar.style.width = `${newProgress}%`;

          if (elapsed < duration) {
            requestAnimationFrame(updateProgress);
          }
        };

        requestAnimationFrame(updateProgress);
      }
    };
    animations.push(loadingAnimation);

    // 实现背景图片的轻微平行移动效果
    const backgroundAnimation = () => {
      const bgElement = document.querySelector('.bg-image');
      if (bgElement instanceof HTMLElement) {
        let offsetX = 0;
        let offsetY = 0;

        // 监听鼠标移动来实现视差效果
        document.addEventListener('mousemove', (e) => {
          // 获取鼠标在视口中的相对位置 (0-1)
          const relativeX = e.clientX / window.innerWidth;
          const relativeY = e.clientY / window.innerHeight;

          // 计算背景的偏移量，范围约为 -5px 到 5px
          // 注意这里只设置背景位置，不改变元素尺寸
          offsetX = (relativeX - 0.5) * 10;
          offsetY = (relativeY - 0.5) * 10;

          // 使用transform而不是改变宽高，保持元素原始尺寸
          bgElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
      }
    };
    animations.push(backgroundAnimation);

    // 添加Loading组件中的旋转动画
    const spinnerAnimation = () => {
      const spinner = document.querySelector('.loading-spinner');
      if (spinner instanceof HTMLElement) {
        let rotation = 0;

        const updateSpinner = () => {
          rotation += 2; // 每帧旋转2度
          if (rotation >= 360) rotation = 0;

          spinner.style.transform = `rotate(${rotation}deg)`;
          requestAnimationFrame(updateSpinner);
        };

        requestAnimationFrame(updateSpinner);
      }
    };
    animations.push(spinnerAnimation);

    // 添加浮动动画效果
    const floatingAnimation = () => {
      const floatingElements = document.querySelectorAll('.floating-element');

      floatingElements.forEach((element, index) => {
        if (element instanceof HTMLElement) {
          const startTime = performance.now();
          const speed = 1 + (index % 3) * 0.5; // 不同元素有不同速度
          const amplitude = 5 + (index % 4) * 2; // 不同幅度

          const updatePosition = (timestamp: number) => {
            const elapsed = timestamp - startTime;
            const offset = Math.sin(elapsed / 1000 * speed) * amplitude;

            // 使用transform而不是改变高度和宽度
            element.style.transform = `translateY(${offset}px)`;
            requestAnimationFrame(updatePosition);
          };

          requestAnimationFrame(updatePosition);
        }
      });
    };
    animations.push(floatingAnimation);

    // 动画主循环
    const animationLoop = () => {
      // 执行所有动画
      animations.forEach(animation => animation());

      // 请求下一帧
      animationFrameRef.current = requestAnimationFrame(animationLoop);
    };

    // 启动动画循环
    animationFrameRef.current = requestAnimationFrame(animationLoop);

    // 清理函数
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // 该组件不渲染任何可见内容
  return null;
};

export default WebWalker; 