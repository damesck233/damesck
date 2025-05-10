/**
 * 预加载单张图片
 * @param src 图片URL
 * @returns Promise
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 检查是否已经缓存
    const cachedImage = sessionStorage.getItem(`img_cache_${src}`);
    if (cachedImage) {
      console.log(`使用缓存图片: ${src}`);
      resolve();
      return;
    }

    const img = new Image();

    // 设置优先级提示
    if ('fetchPriority' in img) {
      // @ts-ignore - fetchPriority 是较新的属性
      img.fetchPriority = 'high';
    }

    // 添加加载指示
    img.decoding = 'async';

    // 添加超时处理，防止图片加载卡住
    const timeout = setTimeout(() => {
      console.warn(`图片加载超时: ${src}`);
      resolve(); // 超时也resolve，不阻塞流程
    }, 1500); // 1.5秒超时

    img.src = src;
    img.onload = () => {
      clearTimeout(timeout);
      try {
        // 将图片存入会话缓存
        sessionStorage.setItem(`img_cache_${src}`, 'loaded');
      } catch (e) {
        console.warn('缓存图片失败', e);
      }
      resolve();
    };
    img.onerror = () => {
      clearTimeout(timeout);
      console.warn(`图片加载失败: ${src}`);
      resolve(); // 即使失败也resolve，不阻止整体流程
    };
  });
};

/**
 * 批量预加载多张图片
 * @param images 图片URL数组
 * @returns Promise
 */
export const preloadImages = async (images: string[]): Promise<void> => {
  // 使用Promise.all并行加载所有图片，提高速度
  const promises = images.map(src => preloadImage(src));
  await Promise.all(promises);
};

/**
 * 延迟指定时间
 * @param ms 毫秒数
 * @returns Promise
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * 资源预加载工具函数
 * 该函数会加载指定的图片资源，并确保即使图片加载很快也至少会等待最短时间后才返回
 * 
 * @param images 需要预加载的图片URL数组
 * @param minTimeMs 最短预加载时间（毫秒）
 * @returns Promise 所有图片加载完成后resolve
 */
export const preloadResourcesWithMinTime = (
  images: string[],
  minTimeMs: number = 500 // 减少默认最小等待时间
): Promise<void> => {
  // 确保参数有效
  if (!Array.isArray(images)) {
    images = [];
  }

  // 记录开始时间
  const startTime = Date.now();

  // 创建加载所有图片的Promise
  return Promise.race([
    preloadImages(images).then(() => {
      const loadTime = Date.now() - startTime;
      if (loadTime < minTimeMs) {
        return delay(minTimeMs - loadTime);
      }
    }),
    delay(1500) // 减少最大等待时间，避免无限等待
  ]).then(() => {
    const loadTime = Date.now() - startTime;
    console.log(`所有资源预加载完成，耗时 ${loadTime}ms`);
  });
}; 