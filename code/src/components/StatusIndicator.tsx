import React, { useState, useEffect } from 'react';

interface StatusIndicatorProps {
  url: string;
  avatarUrl: string; // 用于检测的头像URL
  onStatusChange?: (status: StatusType) => void; // 状态变化时的回调
}

// 状态类型定义
type StatusType = 'excellent' | 'good' | 'slow' | 'offline' | 'checking';

// 全局刷新控制
let globalRefreshCallbacks: Array<() => void> = [];

// 公共方法，用于刷新所有状态指示器
export const refreshAllStatusIndicators = () => {
  globalRefreshCallbacks.forEach(callback => callback());
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ url, avatarUrl, onStatusChange }) => {
  const [status, setStatus] = useState<StatusType>('checking');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  // 检测网站状态的函数
  const checkWebsiteStatus = async () => {
    // 先设置为检测中状态
    setStatus('checking');

    try {
      const startTime = new Date().getTime();

      // 使用图片加载来检测可访问性
      const result = await new Promise<StatusType>((resolve, reject) => {
        const img = new Image();
        const timeout = setTimeout(() => {
          img.onload = img.onerror = null;
          resolve('slow'); // 超过3秒视为慢
        }, 3000);

        img.onload = () => {
          clearTimeout(timeout);
          const endTime = new Date().getTime();
          const responseTime = endTime - startTime;

          if (responseTime < 1000) {
            resolve('excellent'); // 小于1秒视为极佳
          } else if (responseTime < 2000) {
            resolve('good'); // 小于2秒视为良好
          } else {
            resolve('slow'); // 大于2秒视为慢
          }
        };

        img.onerror = () => {
          clearTimeout(timeout);

          // 尝试直接检测网站URL的可访问性
          if (avatarUrl !== url && url) {
            const fallbackCheckStartTime = new Date().getTime();
            const fallbackImg = new Image();
            const fallbackTimeout = setTimeout(() => {
              fallbackImg.onload = fallbackImg.onerror = null;
              resolve('slow');
            }, 3000);

            fallbackImg.onload = () => {
              clearTimeout(fallbackTimeout);
              const endTime = new Date().getTime();
              const responseTime = endTime - fallbackCheckStartTime;

              if (responseTime < 1000) {
                resolve('excellent');
              } else if (responseTime < 2000) {
                resolve('good');
              } else {
                resolve('slow');
              }
            };

            fallbackImg.onerror = () => {
              clearTimeout(fallbackTimeout);
              resolve('offline');
            };

            // 尝试加载网站图标
            fallbackImg.src = `${url.replace(/\/$/, '')}/favicon.ico?t=${new Date().getTime()}`;
          } else {
            resolve('offline'); // 加载失败视为离线
          }
        };

        // 添加时间戳参数避免缓存
        img.src = `${avatarUrl}?t=${new Date().getTime()}`;
      });

      setStatus(result);
      if (onStatusChange) {
        onStatusChange(result);
      }
      setLastChecked(new Date());

      // 将结果存入本地存储，包括检查时间
      localStorage.setItem(`site-status-${url}`, JSON.stringify({
        status: result,
        lastChecked: new Date().toISOString()
      }));

    } catch (error) {
      console.error("Error checking website status:", error);
      setStatus('offline');
      if (onStatusChange) {
        onStatusChange('offline');
      }

      // 存储错误状态
      localStorage.setItem(`site-status-${url}`, JSON.stringify({
        status: 'offline',
        lastChecked: new Date().toISOString()
      }));
    }
  };

  useEffect(() => {
    // 注册全局刷新回调
    globalRefreshCallbacks.push(checkWebsiteStatus);

    // 清理函数
    return () => {
      globalRefreshCallbacks = globalRefreshCallbacks.filter(cb => cb !== checkWebsiteStatus);
    };
  }, []);

  useEffect(() => {
    // 尝试从本地存储获取之前的检查结果
    const storedStatus = localStorage.getItem(`site-status-${url}`);

    if (storedStatus) {
      try {
        const { status: savedStatus, lastChecked: savedTime } = JSON.parse(storedStatus);
        const lastCheckedDate = new Date(savedTime);
        const now = new Date();

        // 如果上次检查是在24小时内，使用缓存的状态
        if ((now.getTime() - lastCheckedDate.getTime()) < 24 * 60 * 60 * 1000) {
          setStatus(savedStatus as StatusType);
          setLastChecked(lastCheckedDate);
          return;
        }
      } catch (e) {
        console.error("Error parsing stored status:", e);
      }
    }

    // 如果没有缓存或者缓存过期，进行新的检查
    checkWebsiteStatus();

    // 每天自动更新一次
    const updateInterval = setInterval(() => {
      checkWebsiteStatus();
    }, 24 * 60 * 60 * 1000); // 24小时

    return () => clearInterval(updateInterval);
  }, [url, avatarUrl]);

  // 渲染不同状态的信号格
  const renderStatusIcon = () => {
    switch (status) {
      case 'excellent':
        return (
          <div className="relative h-5 w-5 flex items-center justify-center" title="网站访问速度极佳">
            <div className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-green-400/90 to-green-600/90 shadow-md shadow-green-500/20 dark:shadow-green-900/30 ring-1 ring-green-200/60 dark:ring-green-800/60 backdrop-blur-md"></div>
            <div className="absolute w-1.5 h-1.5 rounded-full bg-white/90 dark:bg-green-200/90 animate-[ping_3s_ease-in-out_infinite] backdrop-blur-sm"></div>
          </div>
        );
      case 'good':
        return (
          <div className="relative h-5 w-5 flex items-center justify-center" title="网站访问速度良好">
            <div className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400/90 to-amber-500/90 shadow-md shadow-yellow-500/20 dark:shadow-yellow-900/30 ring-1 ring-yellow-200/60 dark:ring-yellow-800/60 backdrop-blur-md"></div>
            <div className="absolute w-1.5 h-1.5 rounded-full bg-white/90 dark:bg-yellow-200/90 backdrop-blur-sm"></div>
          </div>
        );
      case 'slow':
        return (
          <div className="relative h-5 w-5 flex items-center justify-center" title="网站访问较慢">
            <div className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-orange-400/90 to-red-500/90 shadow-md shadow-orange-500/20 dark:shadow-orange-900/30 ring-1 ring-orange-200/60 dark:ring-orange-800/60 backdrop-blur-md"></div>
            <div className="absolute w-1.5 h-1.5 rounded-full bg-white/90 dark:bg-orange-200/90 backdrop-blur-sm"></div>
          </div>
        );
      case 'offline':
        return (
          <div className="relative h-5 w-5 flex items-center justify-center" title="网站无法访问">
            <div className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-red-500/90 to-red-700/90 shadow-md shadow-red-500/20 dark:shadow-red-900/30 ring-1 ring-red-200/60 dark:ring-red-800/60 backdrop-blur-md"></div>
            <div className="absolute w-3 h-3 flex items-center justify-center backdrop-blur-sm">
              <svg className="w-2 h-2 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        );
      case 'checking':
        return (
          <div className="relative h-5 w-5 flex items-center justify-center" title="正在检测网站状态">
            <div className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-blue-400/90 to-blue-600/90 shadow-md shadow-blue-500/20 dark:shadow-blue-900/30 ring-1 ring-blue-200/60 dark:ring-blue-800/60 animate-pulse backdrop-blur-md"></div>
            <div className="absolute w-3 h-3 flex items-center justify-center backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full border-2 border-t-white/90 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // 提示文本
  const getStatusText = () => {
    switch (status) {
      case 'excellent': return '访问极佳';
      case 'good': return '访问良好';
      case 'slow': return '访问较慢';
      case 'offline': return '无法访问';
      case 'checking': return '检测中...';
      default: return '';
    }
  };

  // 格式化上次检查时间
  const formatLastChecked = () => {
    if (!lastChecked) return '未检测';

    return `${lastChecked.toLocaleDateString()} ${lastChecked.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div className="absolute top-1 right-1 flex items-center z-10">
      <div className="relative group">
        {renderStatusIcon()}

        {/* 悬停提示 */}
        <div className="hidden group-hover:block absolute right-0 top-full mt-1.5 w-40 p-3 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg z-10 text-xs border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-md transition-all duration-200 transform origin-top-right animate-in fade-in">
          <div className="flex items-center mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 mr-1.5"></div>
            <p className="font-medium text-gray-800 dark:text-gray-200">{getStatusText()}</p>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-[10px] pl-3">上次检测: {formatLastChecked()}</p>
          <div className="absolute -top-1.5 right-1.5 w-3 h-3 bg-white/80 dark:bg-gray-800/80 transform rotate-45 border-t border-l border-gray-200/30 dark:border-gray-700/30 backdrop-blur-md"></div>
        </div>
      </div>
    </div>
  );
};

export default StatusIndicator; 