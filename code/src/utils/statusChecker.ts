import axios from 'axios';
import { SiteStatus, SiteStatusResult } from '../api/checkSiteStatus';

// 性能阈值（单位：毫秒）
const PERFORMANCE_THRESHOLDS = {
  good: 500,       // 小于500ms被视为良好
  slow: 1500,      // 小于1500ms被视为较慢
  verySlow: 3000   // 小于3000ms被视为非常慢，大于则认为不可用
};

interface FriendData {
  url: string;
  avatar: string;
}

// 后台Worker版本的网站状态检查器
class SiteStatusChecker {
  private statusData: Record<string, SiteStatusResult> = {};
  private isRunning: boolean = false;
  private checkInterval: number = 5 * 60 * 1000; // 默认5分钟
  private timer: number | null = null;
  private friendsData: Record<string, FriendData> = {}; // 存储朋友域名和头像的映射

  constructor(checkIntervalMinutes = 5) {
    this.checkInterval = checkIntervalMinutes * 60 * 1000;
    this.loadFromStorage();
  }

  // 更新朋友的数据
  public updateFriendsData(friends: FriendData[]): void {
    friends.forEach(friend => {
      try {
        const domain = new URL(friend.url).hostname;
        this.friendsData[domain] = friend;
      } catch (error) {
        console.error(`处理朋友URL出错: ${friend.url}`, error);
      }
    });
  }

  // 启动检查 - 只检查一次，不循环
  public start(friendUrls: string[]): void {
    if (this.isRunning) return;

    this.isRunning = true;
    console.log('网站状态检查器已启动');

    // 检查是否需要立即检测
    const needsCheck = this.needsStatusRefresh();
    if (needsCheck) {
      this.checkAllSites(friendUrls);
    }

    // 检测完成后设置为非运行状态
    this.isRunning = false;
  }

  // 停止定时检查
  public stop(): void {
    if (!this.isRunning || this.timer === null) return;

    window.clearInterval(this.timer);
    this.timer = null;
    this.isRunning = false;
    console.log('网站状态检查器已停止');
  }

  // 检查是否需要刷新状态
  private needsStatusRefresh(): boolean {
    try {
      const lastUpdateTime = localStorage.getItem('lastStatusUpdateTime');
      if (!lastUpdateTime) return true;

      const now = new Date();
      const lastUpdate = new Date(lastUpdateTime);

      // 计算时间差（毫秒）
      const timeDiff = now.getTime() - lastUpdate.getTime();
      const minutesDiff = timeDiff / (1000 * 60);

      // 如果上次更新超过设定的时间，则需要刷新
      return minutesDiff >= 5; // 固定为5分钟检查间隔
    } catch (error) {
      console.error('检查状态刷新时出错:', error);
      return true;
    }
  }

  // 从存储中加载状态数据
  private loadFromStorage(): void {
    try {
      const storedData = localStorage.getItem('siteStatusData');
      if (storedData) {
        this.statusData = JSON.parse(storedData);
      }
    } catch (error) {
      console.error('从存储加载状态数据时出错:', error);
      this.statusData = {};
    }
  }

  // 保存状态数据到存储
  private saveToStorage(): void {
    try {
      localStorage.setItem('siteStatusData', JSON.stringify(this.statusData));
      localStorage.setItem('lastStatusUpdateTime', new Date().toISOString());
    } catch (error) {
      console.error('保存状态数据到存储时出错:', error);
    }
  }

  // 使用图片加载检测站点可访问性
  private checkImageAvailability(imageUrl: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();

      const timeoutId = setTimeout(() => {
        // 超时处理
        img.onload = null;
        img.onerror = null;
        resolve(false);
      }, 5000);

      img.onload = () => {
        clearTimeout(timeoutId);
        resolve(true);
      };

      img.onerror = () => {
        clearTimeout(timeoutId);
        resolve(false);
      };

      // 防止缓存影响测试
      img.src = `${imageUrl}?_=${Date.now()}`;
    });
  }

  // 检查单个网站的状态
  private async checkSiteStatus(url: string): Promise<SiteStatusResult> {
    // 确保URL格式正确
    if (!url.startsWith('http')) {
      url = `https://${url}`;
    }

    const startTime = Date.now();
    let status: SiteStatus = 'offline';
    let responseTime: number | null = null;
    let error: string | undefined = undefined;

    try {
      // 获取对应的朋友数据
      const domain = new URL(url).hostname;
      const friendData = this.friendsData[domain];

      // 如果有头像URL，优先检测头像
      if (friendData && friendData.avatar) {
        const avatarUrl = friendData.avatar;

        // 检测头像是否可访问
        const isAvailable = await this.checkImageAvailability(avatarUrl);

        // 计算响应时间
        responseTime = Date.now() - startTime;

        if (isAvailable) {
          // 如果头像可访问，设置为良好状态
          status = 'good';
        } else {
          // 头像不可访问
          status = 'offline';
        }
      } else {
        // 如果没有头像数据，使用常规方法
        const response = await axios.get(url, {
          timeout: 5000,
          validateStatus: () => true, // 接受任何状态码
          maxRedirects: 5
        });

        responseTime = Date.now() - startTime;

        // 如果状态码在200-599之间，认为网站是在线的
        if (response.status >= 200 && response.status < 600) {
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
        } else {
          status = 'offline';
        }
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

  // 检查所有网站的状态
  private async checkAllSites(urls: string[]): Promise<void> {
    try {
      console.log('开始检查所有网站状态...');

      const statusPromises = urls.map(async (url) => {
        const result = await this.checkSiteStatus(url);
        this.statusData[url] = result;
        return result;
      });

      await Promise.all(statusPromises);
      this.saveToStorage();

      // 触发状态更新事件，让组件可以感知状态变化
      window.dispatchEvent(new CustomEvent('site-status-updated', {
        detail: { statusData: this.statusData }
      }));

      console.log('所有网站状态检查完成');
    } catch (error) {
      console.error('检查所有网站状态时出错:', error);
    }
  }

  // 检查在线网站
  public async checkOnlineSites(urls: string[]): Promise<void> {
    try {
      console.log('开始检查在线网站状态...');
      const onlineUrls = urls.filter(url => {
        const status = this.statusData[url];
        return !status || status.status !== 'offline';
      });

      const statusPromises = onlineUrls.map(async (url) => {
        const result = await this.checkSiteStatus(url);
        this.statusData[url] = result;
        return result;
      });

      await Promise.all(statusPromises);
      this.saveToStorage();

      // 触发状态更新事件
      window.dispatchEvent(new CustomEvent('site-status-updated', {
        detail: { statusData: this.statusData }
      }));

      console.log('在线网站状态检查完成');
    } catch (error) {
      console.error('检查在线网站状态时出错:', error);
    }
  }

  // 检查离线网站状态
  public async checkOfflineSites(urls: string[]): Promise<void> {
    try {
      console.log('开始检查离线网站状态...');
      const offlineUrls = urls.filter(url => {
        const status = this.statusData[url];
        return status && status.status === 'offline';
      });

      if (offlineUrls.length === 0) {
        console.log('没有需要检查的离线网站');
        return;
      }

      const statusPromises = offlineUrls.map(async (url) => {
        const result = await this.checkSiteStatus(url);
        this.statusData[url] = result;
        return result;
      });

      await Promise.all(statusPromises);
      this.saveToStorage();

      // 触发状态更新事件
      window.dispatchEvent(new CustomEvent('site-status-updated', {
        detail: { statusData: this.statusData }
      }));

      console.log('离线网站状态检查完成');
    } catch (error) {
      console.error('检查离线网站状态时出错:', error);
    }
  }

  // 获取当前状态数据
  public getStatusData(): Record<string, SiteStatusResult> {
    return this.statusData;
  }
}

// 创建单例实例
const statusChecker = new SiteStatusChecker();

export default statusChecker; 