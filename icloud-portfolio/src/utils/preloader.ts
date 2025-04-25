/**
 * 预加载单张图片
 * @param src 图片URL
 * @returns Promise
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => {
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
  minTimeMs: number = 1000
): Promise<void> => {
  // 确保参数有效
  if (!Array.isArray(images)) {
    images = [];
  }

  // 记录开始时间
  const startTime = Date.now();

  // 创建加载所有图片的Promise
  const imagePromises = images.map(url => {
    return new Promise<void>((resolve, reject) => {
      try {
        const img = new Image();

        img.onload = () => resolve();
        img.onerror = () => {
          console.warn(`图片加载失败: ${url}`);
          resolve(); // 失败也当作完成，避免阻塞整个加载过程
        };

        img.src = url;
      } catch (error) {
        console.error(`创建图片对象失败: ${url}`, error);
        resolve(); // 同样避免阻塞
      }
    });
  });

  // 返回结合了图片加载和最短时间等待的Promise
  return Promise.all([
    Promise.all(imagePromises),
    new Promise(resolve => {
      setTimeout(() => {
        resolve(undefined);
      }, minTimeMs);
    })
  ]).then(() => {
    const loadTime = Date.now() - startTime;
    console.log(`所有资源预加载完成，耗时 ${loadTime}ms`);
  });
}; 