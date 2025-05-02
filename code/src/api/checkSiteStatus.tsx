// 网站状态检查服务
import axios from 'axios';

// 网站状态类型
export type SiteStatus = 'good' | 'slow' | 'very-slow' | 'offline';

// 网站状态结果接口
export interface SiteStatusResult {
  url: string;
  status: SiteStatus;
  responseTime: number | null;
  lastChecked: string;
  error?: string;
}

// 性能阈值（单位：毫秒）
const PERFORMANCE_THRESHOLDS = {
  good: 500,       // 小于500ms被视为良好
  slow: 1500,      // 小于1500ms被视为较慢
  verySlow: 3000   // 小于3000ms被视为非常慢，大于则认为不可用
};

/**
 * 检查网站状态
 * @param url 要检查的网站URL
 */
export async function checkWebsiteStatus(url: string): Promise<SiteStatusResult> {
  // 确保URL格式正确
  if (!url.startsWith('http')) {
    url = `https://${url}`;
  }

  const startTime = Date.now();
  let status: SiteStatus = 'offline';
  let responseTime: number | null = null;
  let error: string | undefined = undefined;

  try {
    // 使用axios发送请求，设置超时时间为5秒
    const response = await axios.head(url, {
      timeout: 5000
    });

    responseTime = Date.now() - startTime;

    // 根据响应时间设置状态
    if (responseTime < PERFORMANCE_THRESHOLDS.good) {
      status = 'good';
    } else if (responseTime < PERFORMANCE_THRESHOLDS.slow) {
      status = 'slow';
    } else if (responseTime < PERFORMANCE_THRESHOLDS.verySlow) {
      status = 'very-slow';
    } else {
      status = 'offline'; // 响应时间过长也视为不可用
    }
  } catch (err) {
    status = 'offline';
    error = err instanceof Error ? err.message : '未知错误';
  }

  // 格式化当前时间
  const now = new Date();
  const lastChecked = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();

  // 返回状态结果
  return {
    url,
    status,
    responseTime,
    lastChecked,
    error
  };
}

/**
 * 获取多个网站的状态
 * @param urls 要检查的网站URL列表
 */
export async function getMultipleSiteStatus(urls: string[]): Promise<Record<string, SiteStatusResult>> {
  try {
    // 检查所有URL
    const results: Record<string, SiteStatusResult> = {};

    // 并行检查所有URL
    const statusPromises = urls.map(async (url) => {
      const result = await checkWebsiteStatus(url);
      results[url] = result;
      return result;
    });

    await Promise.all(statusPromises);

    // 返回结果
    return results;
  } catch (error) {
    console.error('检查网站状态时出错:', error);
    throw error;
  }
}

// 模拟从本地存储加载网站状态数据
export function loadSiteStatusFromStorage(): Record<string, SiteStatusResult> {
  try {
    const storedData = localStorage.getItem('siteStatusData');
    if (storedData) {
      return JSON.parse(storedData);
    }
  } catch (e) {
    console.error('从本地存储加载状态时出错:', e);
  }
  return {};
}

// 保存网站状态数据到本地存储
export function saveSiteStatusToStorage(data: Record<string, SiteStatusResult>): void {
  try {
    localStorage.setItem('siteStatusData', JSON.stringify(data));
  } catch (e) {
    console.error('保存状态到本地存储时出错:', e);
  }
} 