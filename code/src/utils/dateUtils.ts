import { CountdownItem } from '../types';

// 计算剩余天数的函数
export const calculateDaysLeft = (targetDate: string): number => {
    if (!targetDate) return 0;

    const target = new Date(targetDate);
    const today = new Date();
    const timeDiff = target.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft > 0 ? daysLeft : 0;
};

// 计算起始日期到目标日期的总天数
export const calculateTotalDays = (startDate: string, targetDate: string): number => {
    if (!startDate || !targetDate) return 0;

    const start = new Date(startDate);
    const target = new Date(targetDate);
    const timeDiff = target.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

// 计算已过去的天数
export const calculatePassedDays = (startDate: string): number => {
    if (!startDate) return 0;

    const start = new Date(startDate);
    const today = new Date();
    const timeDiff = today.getTime() - start.getTime();
    const passedDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return passedDays > 0 ? passedDays : 0;
};

// 计算进度百分比
export const calculateProgress = (item: CountdownItem): number => {
    if (!item || !item.Startdate || !item.targetDate) {
        console.log('无效的倒计时项目:', item);
        return 0;
    }

    const totalDays = calculateTotalDays(item.Startdate, item.targetDate);
    const passedDays = calculatePassedDays(item.Startdate);

    // 防止除以零
    if (totalDays <= 0) {
        return 0;
    }

    const progress = (passedDays / totalDays) * 100;
    const clampedProgress = Math.min(100, Math.max(0, progress));
    return clampedProgress;
};

// 获取主要倒计时（top为true的项目）
export const getMainCountdown = (countdownData: CountdownItem[]): CountdownItem => {
    const main = countdownData.find(item => item.top === true);
    if (main) return main;

    // 如果没有找到top为true的，返回第一个
    return countdownData.length > 0 ? countdownData[0] : {
        title: "默认倒计时",
        Startdate: new Date().toISOString().split('T')[0],
        targetDate: new Date().toISOString().split('T')[0],
        totalDays: 1,
        top: true
    };
};
