import { useEffect, useRef } from 'react';

/**
 * WebWalker组件
 * 集中管理网站中的所有JavaScript动画效果
 */
const WebWalker = () => {
  // 创建refs用于存储动画帧ID和管理清理
  const animationFrameIds = useRef<number[]>([]);
  const eventListeners = useRef<{ element: Element | Window | Document, event: string, handler: EventListener }[]>([]);

  // 清除所有动画帧和事件监听器
  const cleanupAll = () => {
    // 清除所有动画帧ID
    animationFrameIds.current.forEach(id => {
      cancelAnimationFrame(id);
    });
    animationFrameIds.current = [];

    // 移除所有事件监听器
    eventListeners.current.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    eventListeners.current = [];
  };

  // 添加动画帧ID到追踪列表
  const trackAnimationFrame = (id: number) => {
    animationFrameIds.current.push(id);
    return id;
  };

  // 添加事件监听器到追踪列表
  const trackEventListener = (element: Element | Window | Document, event: string, handler: EventListener) => {
    element.addEventListener(event, handler);
    eventListeners.current.push({ element, event, handler });
  };

  useEffect(() => {
    console.log('WebWalker: 初始化动画系统');

    // 收集所有需要动画的元素
    const animateElements = document.querySelectorAll('.animate-element');
    const floatingElements = document.querySelectorAll('.floating-element');
    const bgImage = document.querySelector('.bg-image');

    // 背景视差效果动画
    if (bgImage instanceof HTMLElement) {
      let offsetX = 0;
      let offsetY = 0;

      const mouseMoveHandler = (e: Event) => {
        if (e instanceof MouseEvent) {
          // 获取鼠标在视口中的相对位置 (0-1)
          const relativeX = e.clientX / window.innerWidth;
          const relativeY = e.clientY / window.innerHeight;

          // 计算背景的偏移量，范围约为 -5px 到 5px
          offsetX = (relativeX - 0.5) * 10;
          offsetY = (relativeY - 0.5) * 10;

          // 使用transform而不是改变宽高，保持元素原始尺寸
          requestAnimationFrame(() => {
            bgImage.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
          });
        }
      };

      trackEventListener(document, 'mousemove', mouseMoveHandler);
      console.log('WebWalker: 背景视差效果已启用');
    }

    // 浮动元素动画
    if (floatingElements.length > 0) {
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
            trackAnimationFrame(requestAnimationFrame(updatePosition));
          };

          trackAnimationFrame(requestAnimationFrame(updatePosition));
        }
      });
      console.log(`WebWalker: 浮动元素动画已启用 (${floatingElements.length}个元素)`);
    }

    // 为具有.animate-element类的元素添加进入视口时的动画效果
    if (animateElements.length > 0 && 'IntersectionObserver' in window) {
      const observerOptions = {
        root: null, // 使用视口作为root
        rootMargin: '0px',
        threshold: 0.1 // 当元素的10%进入视口时触发
      };

      const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            // 元素进入视口时添加显示动画
            entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // 元素已经显示，可以取消观察
            elementObserver.unobserve(entry.target);
          }
        });
      }, observerOptions);

      animateElements.forEach(element => {
        if (element instanceof HTMLElement) {
          // 设置初始状态：透明和轻微向上位移
          element.style.opacity = '0';
          element.style.transform = 'translateY(20px)';
          elementObserver.observe(element);
        }
      });
      console.log(`WebWalker: 进入视口动画已启用 (${animateElements.length}个元素)`);
    }

    // 添加滚动动画效果 - 为有data-scroll-animation属性的元素添加滚动动画
    const scrollAnimateElements = document.querySelectorAll('[data-scroll-animation]');
    if (scrollAnimateElements.length > 0 && 'IntersectionObserver' in window) {
      const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            const animation = entry.target.getAttribute('data-scroll-animation');
            if (animation) {
              entry.target.classList.add(animation);
              scrollObserver.unobserve(entry.target);
            }
          }
        });
      }, { threshold: 0.2 });

      scrollAnimateElements.forEach(element => {
        scrollObserver.observe(element);
      });
      console.log(`WebWalker: 滚动动画已启用 (${scrollAnimateElements.length}个元素)`);
    }

    // 添加CSS动画类 - 为所有页面元素集中管理CSS动画
    document.documentElement.classList.add('webwalker-animations-enabled');

    // 返回清理函数
    return cleanupAll;
  }, []);

  // 该组件不渲染任何可见内容
  return null;
};

export default WebWalker; 