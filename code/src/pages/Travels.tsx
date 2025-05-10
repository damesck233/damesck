import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPinIcon, GlobeEuropeAfricaIcon, TicketIcon, ChevronRightIcon, XMarkIcon, CalendarIcon, ClockIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import 'leaflet/dist/leaflet.css';

// 导入旅行数据
import travelDataJson from '../data/travels/travelData.json';

// 自定义缩放控件样式
const leafletCustomStyles = `
  /* 自定义缩放控件样式 */
  .leaflet-control-zoom {
    border: none !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12) !important;
    border-radius: 12px !important;
    overflow: hidden !important;
    margin: 16px !important;
  }
  
  .leaflet-control-zoom-in,
  .leaflet-control-zoom-out {
    width: 36px !important;
    height: 36px !important;
    line-height: 36px !important;
    font-size: 18px !important;
    background-color: rgba(255, 255, 255, 0.9) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    color: #333 !important;
    border: none !important;
    transition: all 0.2s ease !important;
  }
  
  .leaflet-control-zoom-in {
    border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
  }
  
  .leaflet-control-zoom-in:hover,
  .leaflet-control-zoom-out:hover {
    background-color: rgba(255, 255, 255, 0.95) !important;
    color: #0A84FF !important;
  }
  
  /* 深色模式适配 */
  .dark .leaflet-control-zoom-in,
  .dark .leaflet-control-zoom-out {
    background-color: rgba(50, 50, 50, 0.85) !important;
    color: #fff !important;
  }
  
  .dark .leaflet-control-zoom-in:hover,
  .dark .leaflet-control-zoom-out:hover {
    background-color: rgba(60, 60, 60, 0.95) !important;
    color: #5E9EFF !important;
  }
  
  /* 自定义全屏控件 */
  .leaflet-fullscreen-control {
    width: 36px !important;
    height: 36px !important;
    line-height: 36px !important;
    background-color: rgba(255, 255, 255, 0.9) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    color: #333 !important;
    border: none !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12) !important;
    border-radius: 12px !important;
    cursor: pointer !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transition: all 0.2s ease !important;
    margin: 16px !important;
  }
  
  .leaflet-fullscreen-control:hover {
    background-color: rgba(255, 255, 255, 0.95) !important;
    color: #0A84FF !important;
  }
  
  .dark .leaflet-fullscreen-control {
    background-color: rgba(50, 50, 50, 0.85) !important;
    color: #fff !important;
  }
  
  .dark .leaflet-fullscreen-control:hover {
    background-color: rgba(60, 60, 60, 0.95) !important;
    color: #5E9EFF !important;
  }
  
  /* 自定义标记样式 */
  .custom-marker-icon {
    background-color: #0A84FF;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  /* 自定义弹出窗口样式 */
  .leaflet-popup-content-wrapper {
    border-radius: 12px !important;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
    backdrop-filter: blur(8px) !important;
    -webkit-backdrop-filter: blur(8px) !important;
    background-color: rgba(255, 255, 255, 0.95) !important;
    overflow: hidden !important;
  }
  
  .leaflet-popup-tip {
    background-color: rgba(255, 255, 255, 0.95) !important;
  }
  
  .dark .leaflet-popup-content-wrapper {
    background-color: rgba(50, 50, 50, 0.9) !important;
    color: white !important;
  }
  
  .dark .leaflet-popup-tip {
    background-color: rgba(50, 50, 50, 0.9) !important;
  }
  
  .leaflet-popup-close-button {
    padding: 8px !important;
    font-size: 20px !important;
    color: #666 !important;
  }
  
  .dark .leaflet-popup-close-button {
    color: #ccc !important;
  }
  
  /* 自定义版权信息样式 */
  .leaflet-control-attribution {
    background-color: rgba(255, 255, 255, 0.9) !important;
    backdrop-filter: blur(4px) !important;
    -webkit-backdrop-filter: blur(4px) !important;
    border-radius: 8px !important;
    padding: 6px 10px !important;
    font-size: 12px !important;
    font-weight: 500 !important;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15) !important;
    margin-left: 10px !important;
    margin-bottom: 10px !important; /* 恢复正常边距 */
    z-index: 1500 !important; /* 保持高z-index确保在最上层 */
    border: 1px solid rgba(255, 255, 255, 0.5) !important;
  }
  
  .dark .leaflet-control-attribution {
    background-color: rgba(50, 50, 50, 0.8) !important;
    color: #ccc !important;
  }
  
  .leaflet-control-attribution a {
    color: #0A84FF !important;
    text-decoration: none !important;
  }
  
  .dark .leaflet-control-attribution a {
    color: #5E9EFF !important;
  }
`;

// 坐标转换函数
// WGS-84 to GCJ-02
const transformCoord = (lng: number, lat: number) => {
  const PI = 3.14159265358979324;
  const a = 6378245.0;
  const ee = 0.00669342162296594323;

  if (outOfChina(lng, lat)) {
    return [lng, lat];
  }

  let dLat = transformLat(lng - 105.0, lat - 35.0);
  let dLng = transformLng(lng - 105.0, lat - 35.0);

  const radLat = lat / 180.0 * PI;
  let magic = Math.sin(radLat);
  magic = 1 - ee * magic * magic;

  const sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI);
  dLng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * PI);

  const mgLat = lat + dLat;
  const mgLng = lng + dLng;

  return [mgLng, mgLat];
};

// 判断坐标是否在中国境外
const outOfChina = (lng: number, lat: number) => {
  if (lng < 72.004 || lng > 137.8347) {
    return true;
  }
  if (lat < 0.8293 || lat > 55.8271) {
    return true;
  }
  return false;
};

// 转换纬度
const transformLat = (lng: number, lat: number) => {
  let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat;
  ret += 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * Math.PI) + 20.0 * Math.sin(2.0 * lng * Math.PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lat * Math.PI) + 40.0 * Math.sin(lat / 3.0 * Math.PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(lat / 12.0 * Math.PI) + 320 * Math.sin(lat * Math.PI / 30.0)) * 2.0 / 3.0;
  return ret;
};

// 转换经度
const transformLng = (lng: number, lat: number) => {
  let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng;
  ret += 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * Math.PI) + 20.0 * Math.sin(2.0 * lng * Math.PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lng * Math.PI) + 40.0 * Math.sin(lng / 3.0 * Math.PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(lng / 12.0 * Math.PI) + 300.0 * Math.sin(lng / 30.0 * Math.PI)) * 2.0 / 3.0;
  return ret;
};

// 切换全屏函数
const toggleFullScreen = (element: HTMLElement | null) => {
  if (!element) return;

  if (!document.fullscreenElement) {
    // 进入全屏
    if (element.requestFullscreen) {
      element.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    }
  } else {
    // 退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

// 定义旅行目的地数据类型
interface TravelDestination {
  id: string;
  city: string;
  country: string;
  date: string;
  coordinates: [number, number]; // 经纬度
  description: string;
  photos: string[];
  tickets: {
    type: 'train' | 'flight' | 'bus' | 'ship';
    ticket_type: 'Roven' | 'fly'; // 新增字段，用于区分票据样式
    from: string;
    to: string;
    date: string;
    number: string;
    image?: string;
    seat_type?: string;
    ticket_id?: string;
    depart_time?: string;
    arrive_time?: string;
    train_type?: string;
    price?: string;
    airline?: string;
    gate?: string;
    flight_duration?: string;
    is_round_trip?: boolean; // 是否为往返票
    trip_type?: '单程' | '往返' | '中转'; // 行程类型
  }[];
}

// 将导入的JSON数据转换为类型化数据并按日期排序（最新的在最前面）
const travelData: TravelDestination[] = [...travelDataJson as TravelDestination[]].sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

// 修复票据类型
travelData.forEach(destination => {
  destination.tickets.forEach(ticket => {
    // 确保type和ticket_type匹配
    if (ticket.type === 'train' && ticket.ticket_type !== 'Roven') {
      ticket.ticket_type = 'Roven';
    } else if (ticket.type === 'flight' && ticket.ticket_type !== 'fly') {
      ticket.ticket_type = 'fly';
    }
  });
});

// Apple风格的主题颜色
const appleColors = {
  blue: { start: '#0A84FF', end: '#0066CC', shadow: 'rgba(10, 132, 255, 0.3)' },
  green: { start: '#30D158', end: '#248A3D', shadow: 'rgba(48, 209, 88, 0.3)' },
  indigo: { start: '#5E5CE6', end: '#3634A3', shadow: 'rgba(94, 92, 230, 0.3)' },
  orange: { start: '#FF9F0A', end: '#C67608', shadow: 'rgba(255, 159, 10, 0.3)' },
  pink: { start: '#FF375F', end: '#C31C3D', shadow: 'rgba(255, 55, 95, 0.3)' },
  purple: { start: '#BF5AF2', end: '#8944AB', shadow: 'rgba(191, 90, 242, 0.3)' },
  red: { start: '#FF453A', end: '#D70015', shadow: 'rgba(255, 69, 58, 0.3)' },
  teal: { start: '#64D2FF', end: '#5AC8FA', shadow: 'rgba(100, 210, 255, 0.3)' },
  yellow: { start: '#FFD60A', end: '#D6AD00', shadow: 'rgba(255, 214, 10, 0.3)' },
};

// 添加Apple风格的图标组件
const AppleStyleIcon = ({
  children,
  colorScheme = 'blue',
  customColors = null,
  size = 'md'
}: {
  children: React.ReactNode;
  colorScheme?: keyof typeof appleColors | 'custom';
  customColors?: { start: string; end: string; shadow: string } | null;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const colors = colorScheme === 'custom' && customColors
    ? customColors
    : appleColors[colorScheme as keyof typeof appleColors];

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const iconSizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div
      className={`relative ${sizeClasses[size]} rounded-xl flex items-center justify-center`}
      style={{
        background: `linear-gradient(135deg, ${colors.start}, ${colors.end})`,
        boxShadow: `0 4px 10px ${colors.shadow}`,
      }}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-40 bg-white/30"
        style={{
          backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.4) 0%, transparent 50%)'
        }}
      ></div>
      <div className={`${iconSizeClasses[size]} text-white`}>
        {children}
      </div>
    </div>
  );
};

// 毛玻璃标题区域样式
const cardHeaderStyle = {
  backdropFilter: 'blur(10px)',
  backgroundColor: 'var(--glass-bg)',
  background: 'linear-gradient(135deg, var(--glass-bg), var(--glass-bg))',
  borderBottom: '1px solid var(--card-border)',
  padding: '14px 20px',
  position: 'relative' as const,
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: 'var(--text-primary)'
};

// 票据组件Props
interface TicketProps {
  ticket: TravelDestination['tickets'][0];
}

// 火车票组件 - 12306报销凭证风格
const TrainTicketCard: React.FC<TicketProps> = React.memo(({ ticket }) => {
  // 检查是否有有效的出发和到达时间
  const hasValidTimes = ticket.depart_time && ticket.arrive_time &&
    ticket.depart_time !== "null" && ticket.arrive_time !== "null";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,  // 降低动画时长
        ease: [0.25, 0.1, 0.25, 1.0],  // 使用更高效的缓动函数
      }}
      className="relative overflow-hidden rounded-xl backdrop-blur-xl flex mb-4 will-change-transform"
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--card-border)',
        boxShadow: '0 4px 16px var(--glass-shadow), 0 2px 4px rgba(0,0,0,0.04)',
      }}
    >
      {/* 票据顶部 - 12306样式 */}
      <div className="w-full">
        {/* 12306顶部蓝色条 */}
        <div className="bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 15L20 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.5 10.5H4.5L4.5 18.5H6.5L6.5 10.5Z" fill="currentColor" />
              <path d="M19.5 10.5H17.5L17.5 18.5H19.5L19.5 10.5Z" fill="currentColor" />
              <path d="M17.5 8.5C17.5 5.73858 15.2614 3.5 12.5 3.5H11.5C8.73858 3.5 6.5 5.73858 6.5 8.5V10.5H17.5V8.5Z" fill="currentColor" />
              <path d="M6.5 18.5L4.5 21.5H19.5L17.5 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-semibold">中国铁路12306</span>
          </div>
          <div className="text-sm">电子客票</div>
        </div>

        {/* 票据主体 */}
        <div className="p-4">
          {/* 车次信息 */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {ticket.train_type ? `${ticket.train_type}车次` : '车次'}
              </div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{ticket.number}</div>
            </div>
            <div className="px-3 py-1 bg-blue-100 dark:bg-blue-800/30 rounded-full text-blue-600 dark:text-blue-300 text-xs font-semibold">
              电子客票报销凭证
            </div>
          </div>

          {/* 行程信息 */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <div className="text-lg font-semibold">{ticket.from}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">出发站</div>
              {hasValidTimes && ticket.depart_time && ticket.depart_time !== "null" && (
                <div className="text-sm text-blue-600 dark:text-blue-400 mt-1">{ticket.depart_time}</div>
              )}
            </div>

            <div className="flex-1 px-4 flex flex-col items-center">
              <div className="w-full flex items-center justify-center">
                <div className="h-0.5 bg-gray-300 dark:bg-gray-600 flex-grow"></div>
                <div className="mx-2">
                  <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.9999 12C17.9999 12.5523 17.5522 13 16.9999 13C16.4476 13 15.9999 12.5523 15.9999 12C15.9999 11.4477 16.4476 11 16.9999 11C17.5522 11 17.9999 11.4477 17.9999 12Z" fill="currentColor" />
                    <path d="M11.9999 12C11.9999 12.5523 11.5522 13 10.9999 13C10.4476 13 9.99988 12.5523 9.99988 12C9.99988 11.4477 10.4476 11 10.9999 11C11.5522 11 11.9999 11.4477 11.9999 12Z" fill="currentColor" />
                    <path d="M5.99988 12C5.99988 12.5523 5.55216 13 4.99988 13C4.44759 13 3.99988 12.5523 3.99988 12C3.99988 11.4477 4.44759 11 4.99988 11C5.55216 11 5.99988 11.4477 5.99988 12Z" fill="currentColor" />
                    <path d="M23.9999 12C23.9999 12.5523 23.5522 13 22.9999 13C22.4476 13 21.9999 12.5523 21.9999 12C21.9999 11.4477 22.4476 11 22.9999 11C23.5522 11 23.9999 11.4477 23.9999 12Z" fill="currentColor" />
                  </svg>
                </div>
                <div className="h-0.5 bg-gray-300 dark:bg-gray-600 flex-grow"></div>
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {ticket.trip_type || (ticket.is_round_trip ? '往返' : '单程')}
              </div>
            </div>

            <div className="text-center">
              <div className="text-lg font-semibold">{ticket.to}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">到达站</div>
              {hasValidTimes && ticket.arrive_time && ticket.arrive_time !== "null" && (
                <div className="text-sm text-blue-600 dark:text-blue-400 mt-1">{ticket.arrive_time}</div>
              )}
            </div>
          </div>

          {/* 日期和其他信息 */}
          <div className="border-t border-dashed border-gray-300 dark:border-gray-600 pt-3 mt-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">乘车日期</div>
                <div className="text-sm font-medium flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1 text-blue-500" />
                  {ticket.date}
                </div>
              </div>
              {ticket.seat_type && (
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">座位类型</div>
                  <div className="text-sm font-medium">{ticket.seat_type}</div>
                </div>
              )}
              {ticket.price && (
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">票价</div>
                  <div className="text-sm font-medium text-orange-500">{ticket.price}</div>
                </div>
              )}
            </div>
          </div>

          {/* 底部信息 */}
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 border-t border-dashed border-gray-300 dark:border-gray-600 pt-3">
            <div className="flex justify-between">
              <span>票号: {ticket.ticket_id || '89757****3728'}</span>
              <span>旅客信息已隐藏</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// 飞机票组件
const FlightTicketCard: React.FC<TicketProps> = React.memo(({ ticket }) => {
  // 确认必需的数据是否存在
  const hasValidTimes = ticket.depart_time && ticket.arrive_time &&
    ticket.depart_time !== "null" && ticket.arrive_time !== "null";
  const hasAirline = ticket.airline && ticket.airline !== "null";
  const hasDuration = ticket.flight_duration && ticket.flight_duration !== "null";
  const hasGate = ticket.gate && ticket.gate !== "null";
  const hasPrice = ticket.price && ticket.price !== "null";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,  // 降低动画时长
        ease: [0.25, 0.1, 0.25, 1.0],  // 使用更高效的缓动函数
      }}
      className="relative overflow-hidden rounded-xl backdrop-blur-xl flex mb-4 will-change-transform"
      style={{
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e1f5fe 100%)',
        border: '1px solid rgba(0,0,0,0.1)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.05)',
      }}
    >
      {/* 左侧彩色边条 */}
      <div className="w-2 bg-gradient-to-b from-blue-400 to-indigo-600"></div>

      <div className="relative w-full p-4">
        {/* 顶部航空信息 */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-2">
              {ticket.number.substring(0, 2)}
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-700">
                {hasAirline ? ticket.airline :
                  (ticket.number.substring(0, 2) === 'CA' ? '中国国际航空' :
                    ticket.number.substring(0, 2) === 'MU' ? '东方航空' :
                      ticket.number.substring(0, 2) === 'CZ' ? '南方航空' :
                        ticket.number.substring(0, 2) === 'JL' ? '日本航空' :
                          ticket.number.substring(0, 2) === 'BK' ? '天津航空' : '航空公司')}
              </div>
              <div className="text-xs text-gray-500">
                航班号：{ticket.number}
              </div>
            </div>
          </div>
          <div className="text-xs px-2 py-1 bg-blue-50 border border-blue-200 rounded text-blue-600">
            电子客票
          </div>
        </div>

        {/* 主要航班信息 */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-800">{ticket.from}</div>
            {hasValidTimes && ticket.depart_time && (
              <div className="text-xs text-gray-500 mt-1">{ticket.depart_time}</div>
            )}
          </div>

          <div className="flex-1 px-2 flex flex-col items-center mx-2">
            <div className="w-full flex items-center">
              <div className="h-px bg-gray-300 flex-grow"></div>
              <div className="flex flex-col items-center mx-2">
                <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22.9878 9.33785L17.4878 13.3378L21.9878 19.8378" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 13.5H7" strokeLinecap="round" />
                  <path d="M7 3.33785L2 6.83785L7 13.8378" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="text-xs text-gray-500 mt-1">
                  {hasDuration ? ticket.flight_duration : ""}
                  {ticket.trip_type && <span className="ml-1">({ticket.trip_type})</span>}
                </div>
              </div>
              <div className="h-px bg-gray-300 flex-grow"></div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-xl font-bold text-gray-800">{ticket.to}</div>
            {hasValidTimes && ticket.arrive_time && (
              <div className="text-xs text-gray-500 mt-1">{ticket.arrive_time}</div>
            )}
          </div>
        </div>

        {/* 底部信息 */}
        <div className="grid grid-cols-3 gap-2 border-t border-dashed border-gray-300 pt-3">
          <div>
            <div className="text-xs text-gray-500">日期</div>
            <div className="text-sm font-medium text-gray-700 flex items-center">
              <CalendarIcon className="w-3 h-3 mr-1" />
              {ticket.date}
            </div>
          </div>

          {ticket.seat_type && (
            <div>
              <div className="text-xs text-gray-500">舱位</div>
              <div className="text-sm font-medium text-gray-700">{ticket.seat_type}</div>
            </div>
          )}

          {hasGate && (
            <div>
              <div className="text-xs text-gray-500">登机口</div>
              <div className="text-sm font-medium text-gray-700">{ticket.gate}</div>
            </div>
          )}

          {hasPrice && (
            <div>
              <div className="text-xs text-gray-500">票价</div>
              <div className="text-sm font-medium text-orange-500">{ticket.price}</div>
            </div>
          )}
        </div>

        {/* 底部装饰 - 票据两侧的锯齿 */}
        <div className="absolute -left-2 top-1/2 w-4 h-4 bg-gray-100 rounded-full border border-gray-300 transform -translate-y-1/2"></div>
        <div className="absolute -right-2 top-1/2 w-4 h-4 bg-gray-100 rounded-full border border-gray-300 transform -translate-y-1/2"></div>
      </div>
    </motion.div>
  );
});

// 选择性渲染票据组件
const TicketCard: React.FC<TicketProps> = React.memo(({ ticket }) => {
  // 根据ticket_type选择不同票据样式
  if (ticket.ticket_type === 'Roven') {
    return <TrainTicketCard ticket={ticket} />;
  } else if (ticket.ticket_type === 'fly') {
    return <FlightTicketCard ticket={ticket} />;
  }

  // 确认必需的数据是否存在
  const hasValidTimes = ticket.depart_time && ticket.arrive_time &&
    ticket.depart_time !== "null" && ticket.arrive_time !== "null";
  const hasSeatType = ticket.seat_type && ticket.seat_type !== "null";
  const hasPrice = ticket.price && ticket.price !== "null";

  // 默认票据样式 (兼容)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      className="relative overflow-hidden rounded-xl backdrop-blur-xl flex mb-4 will-change-transform"
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--card-border)',
        boxShadow: '0 4px 16px var(--glass-shadow), 0 2px 4px rgba(0,0,0,0.04)',
      }}
    >
      {/* 票据顶部装饰线 */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>

      <div className="relative w-full p-4">
        <div className="flex items-center mb-3">
          <AppleStyleIcon colorScheme={ticket.type === 'flight' ? 'blue' : 'orange'} size="sm">
            {ticket.type === 'flight' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            ) : (
              <TicketIcon className="w-full h-full" />
            )}
          </AppleStyleIcon>
          <h3 className="ml-2.5 text-base font-semibold text-gray-800 dark:text-gray-100">
            {ticket.type === 'flight' ? '航班' : ticket.type === 'train' ? '火车' : ticket.type === 'bus' ? '汽车' : '船票'}
            <span className="ml-1.5 text-sm font-medium text-blue-600 dark:text-blue-400">{ticket.number}</span>
            {ticket.trip_type && <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">({ticket.trip_type})</span>}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-xs text-gray-500 dark:text-gray-400">出发地</div>
            <div className="text-base font-medium text-gray-800 dark:text-gray-100">{ticket.from}</div>
          </div>

          <div className="px-4">
            <div className="relative flex items-center justify-center w-20">
              <div className="border-t border-dashed border-gray-300 dark:border-gray-600 w-full absolute"></div>
              <div className="relative bg-blue-500 dark:bg-blue-600 text-white rounded-full p-1 mx-auto">
                <ChevronRightIcon className="w-3 h-3" />
              </div>
            </div>
          </div>

          <div className="flex-1 text-right">
            <div className="text-xs text-gray-500 dark:text-gray-400">目的地</div>
            <div className="text-base font-medium text-gray-800 dark:text-gray-100">{ticket.to}</div>
          </div>
        </div>

        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex justify-between">
            <span>日期: <span className="text-gray-700 dark:text-gray-300">{ticket.date}</span></span>
            {hasValidTimes && (
              <span>时间: <span className="text-gray-700 dark:text-gray-300">{ticket.depart_time} - {ticket.arrive_time}</span></span>
            )}
          </div>

          {(hasSeatType || hasPrice) && (
            <div className="flex justify-between mt-1">
              {hasSeatType && (
                <span>座位: <span className="text-gray-700 dark:text-gray-300">{ticket.seat_type}</span></span>
              )}
              {hasPrice && (
                <span>票价: <span className="text-orange-500 dark:text-orange-300">{ticket.price}</span></span>
              )}
            </div>
          )}
        </div>

        {ticket.image && (
          <div className="mt-3 rounded-lg overflow-hidden">
            <img src={ticket.image} alt="Ticket" className="w-full h-24 object-cover" loading="lazy" />
          </div>
        )}

        {/* 底部虚线 */}
        <div className="absolute bottom-0 left-4 right-4 border-b border-dashed border-gray-300 dark:border-gray-600"></div>
      </div>
    </motion.div>
  );
});

// 目的地详情模态框组件
interface DestinationModalProps {
  destination: TravelDestination | null;
  onClose: () => void;
}

// 添加图片预加载组件
const ImagePreloader: React.FC<{ src: string }> = React.memo(({ src }) => {
  return <img src={src} className="hidden" aria-hidden="true" alt="" />;
});

const DestinationModal: React.FC<DestinationModalProps> = React.memo(({ destination, onClose }) => {
  if (!destination) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{
            type: "tween",
            duration: 0.2,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="relative w-full max-w-2xl max-h-[80vh] overflow-auto rounded-2xl bg-white dark:bg-gray-900 shadow-xl will-change-transform"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/10 backdrop-blur-md text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>

          {/* 封面图片 */}
          <div className="w-full h-48 relative">
            <img
              src={destination.photos[0]}
              alt={destination.city}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-xl font-bold">{destination.city}</h2>
              <p className="text-white/90">{destination.country}</p>
            </div>
          </div>

          <div className="p-5">
            {/* 日期和描述 */}
            <div className="mb-5">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1 text-blue-500" />
                游玩日期: {new Date(destination.date).toLocaleDateString('zh-CN')}
              </div>
              <p className="text-gray-700 dark:text-gray-300">{destination.description}</p>
            </div>

            {/* 照片区域 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                旅行照片集
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {destination.photos.map((photo, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden aspect-video">
                    <img
                      src={photo}
                      alt={`${destination.city} ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading={idx === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

// 主页面组件
const Travels: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<TravelDestination | null>(null);
  const [hoveredDestination, setHoveredDestination] = useState<string | null>(null);

  // 预加载指定目的地的图片
  const preloadDestinationImages = useCallback((destId: string) => {
    const destination = travelData.find(d => d.id === destId);
    if (destination) {
      setHoveredDestination(destId);
    }
  }, []);

  // 缓存目的地选择函数
  const handleSelectDestination = useCallback((destination: TravelDestination) => {
    preloadDestinationImages(destination.id);
    setTimeout(() => setSelectedDestination(destination), 50);
  }, [preloadDestinationImages]);

  // 缓存关闭模态框函数
  const handleCloseModal = useCallback(() => {
    setSelectedDestination(null);
  }, []);

  // 真实地图组件 - 使用Leaflet实现
  const MapComponent = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);

    // 计算地图中心点 - 取所有坐标的平均值，并转换为GCJ-02坐标系
    const center = useMemo<[number, number]>(() => {
      if (travelData.length > 0) {
        const avgLat = travelData.reduce((sum, dest) => sum + dest.coordinates[1], 0) / travelData.length;
        const avgLng = travelData.reduce((sum, dest) => sum + dest.coordinates[0], 0) / travelData.length;
        const [gcjLng, gcjLat] = transformCoord(avgLng, avgLat);
        return [gcjLat, gcjLng]; // 纬度,经度格式
      }

      // 默认中心点（成都）- 转换为GCJ-02
      const [gcjLng, gcjLat] = transformCoord(104.07, 30.67);
      return [gcjLat, gcjLng];
    }, []);

    useEffect(() => {
      // 动态导入Leaflet，避免SSR问题
      if (typeof window !== 'undefined' && mapRef.current && !mapInstanceRef.current) {
        // 动态导入Leaflet
        import('leaflet').then((L) => {
          // 确保mapRef.current不为null（TypeScript类型安全）
          if (!mapRef.current) return;

          // 添加自定义样式到head
          const styleElement = document.createElement('style');
          styleElement.textContent = leafletCustomStyles;
          styleElement.setAttribute('data-leaflet-custom-style', 'true');
          document.head.appendChild(styleElement);

          // 初始化地图
          const map = L.map(mapRef.current, {
            center: center,
            zoom: 4,
            zoomControl: true, // 保留原生缩放控件，但我们会自定义其样式
            attributionControl: false, // 不显示默认attribution
          });

          // 添加高德地图图层
          L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
            subdomains: ["1", "2", "3", "4"],
            maxZoom: 18,
          }).addTo(map);

          // 添加自定义版权信息
          const attributionControl = L.control.attribution({
            position: 'bottomright',
            prefix: false
          });
          attributionControl.addAttribution('地图数据 &copy; <a href="https://www.amap.com/" target="_blank">高德地图</a>');
          attributionControl.addTo(map);

          // 修复默认图标问题
          const defaultIcon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
          });

          // 自定义Apple风格图标
          const appleStyleIcon = L.divIcon({
            className: 'custom-marker-icon',
            html: `<div style="width: 14px; height: 14px;"></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7],
            popupAnchor: [0, -10]
          });

          // 添加自定义全屏控件
          const FullscreenControl = L.Control.extend({
            options: {
              position: 'topright'
            },

            onAdd: function () {
              const container = L.DomUtil.create('div', 'leaflet-fullscreen-control');
              container.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"/></svg>';

              L.DomEvent.on(container, 'click', function () {
                toggleFullScreen(mapRef.current);
              });

              return container;
            }
          });

          map.addControl(new FullscreenControl());

          // 添加标记
          travelData.forEach((dest) => {
            // 转换坐标（WGS-84 到 GCJ-02）
            const [gcjLng, gcjLat] = transformCoord(dest.coordinates[0], dest.coordinates[1]);

            const marker = L.marker([gcjLat, gcjLng], { icon: appleStyleIcon })
              .addTo(map);

            // 添加弹出信息
            marker.bindPopup(`
              <div style="padding: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <h3 style="font-weight: 600; font-size: 16px; margin: 0 0 6px 0; color: #0A84FF;">${dest.city}</h3>
                <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">${dest.country}</p>
                <p style="margin: 0 0 12px 0; color: #888; font-size: 12px; display: flex; align-items: center;">
                  <svg style="width: 14px; height: 14px; margin-right: 4px; color: #0A84FF;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  ${new Date(dest.date).toLocaleDateString('zh-CN')}
                </p>
                <div style="margin-top: 5px;">
                  <button 
                    style="background: #0A84FF; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 13px; cursor: pointer; display: flex; align-items: center; justify-content: center; width: 100%; font-weight: 500;"
                    onclick="document.dispatchEvent(new CustomEvent('select-destination', {detail: '${dest.id}'}))">
                    <svg style="width: 14px; height: 14px; margin-right: 4px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    查看详情
                  </button>
                </div>
              </div>
            `);
          });

          // 保存地图实例以便清理
          mapInstanceRef.current = map;

          // 添加事件监听器处理标记点击
          const handleSelectDestination = (event: CustomEvent) => {
            const destId = event.detail;
            const destination = travelData.find(d => d.id === destId);
            if (destination) {
              setSelectedDestination(destination);
            }
          };

          document.addEventListener('select-destination', handleSelectDestination as EventListener);

          // 清理函数
          return () => {
            document.removeEventListener('select-destination', handleSelectDestination as EventListener);
            if (mapInstanceRef.current) {
              mapInstanceRef.current.remove();
              mapInstanceRef.current = null;
            }
            // 移除自定义样式
            const customStyle = document.querySelector('style[data-leaflet-custom-style]');
            if (customStyle) {
              customStyle.remove();
            }
          };
        });
      }
    }, []);

    return (
      <div className="w-full h-[300px] sm:h-[400px] rounded-xl overflow-hidden backdrop-blur-lg border border-white/20 dark:border-gray-700/30">
        <div ref={mapRef} id="map" style={{ height: '100%', width: '100%', position: 'relative' }} className="z-0"></div>

        {/* 地图信息覆盖层 */}
        <div className="absolute top-4 right-4 left-auto z-[1000] rounded-lg backdrop-blur-md bg-white/70 dark:bg-gray-900/70 p-3 border border-white/30 dark:border-gray-700/30">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <GlobeEuropeAfricaIcon className="w-5 h-5 mr-2 text-blue-500" />
            <span className="text-sm">已经探索 <span className="font-semibold text-blue-600 dark:text-blue-400">{travelData.length}</span> 个目的地 · 按日期排序（最新优先）</span>
          </div>
        </div>
      </div>
    );
  };

  const SectionTitle = ({ icon, title, color = "blue" }: { icon: React.ReactNode, title: string, color?: string }) => {
    const getGradientColor = () => {
      switch (color) {
        case 'green': return 'from-green-500 to-emerald-700';
        case 'orange': return 'from-orange-500 to-amber-700';
        case 'purple': return 'from-purple-500 to-indigo-700';
        case 'pink': return 'from-pink-500 to-rose-700';
        case 'red': return 'from-red-500 to-rose-700';
        default: return 'from-blue-500 to-indigo-700';
      }
    };

    return (
      <div className="flex items-center mb-5">
        <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl mr-3 bg-gradient-to-br ${getGradientColor()} shadow-lg`}>
          <div className="text-white">{icon}</div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* 页面标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">我的旅行足迹</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">记录我去过的地方和难忘的旅行经历</p>
      </motion.div>

      {/* 地图区域 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="mb-10"
      >
        <SectionTitle
          icon={<GlobeEuropeAfricaIcon className="w-6 h-6" />}
          title="旅行地图"
          color="blue"
        />
        <MapComponent />
      </motion.section>

      {/* 目的地列表 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <SectionTitle
          icon={<MapPinIcon className="w-6 h-6" />}
          title="旅行目的地"
          color="orange"
        />

        <div className="mb-6 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <CalendarIcon className="w-4 h-4 mr-1 text-orange-500" />
          <span>按日期排序 - 最新旅行优先显示</span>
        </div>

        {/* 预加载当前悬停的目的地图片 */}
        {hoveredDestination && (
          <>
            {travelData
              .find(dest => dest.id === hoveredDestination)
              ?.photos.map((photo, idx) => (
                <ImagePreloader key={`preload-${hoveredDestination}-${idx}`} src={photo} />
              ))
            }
          </>
        )}

        <div className="grid grid-cols-1 gap-8">
          {travelData.map((destination) => (
            <motion.div
              key={destination.id}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg border border-white/20 dark:border-gray-700/30"
              onMouseEnter={() => preloadDestinationImages(destination.id)}
            >
              <div className="flex flex-col md:flex-row">
                {/* 目的地信息区 */}
                <div className="w-full md:w-1/3">
                  <div className="relative h-48 md:h-full">
                    <img
                      src={destination.photos[0]}
                      alt={destination.city}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      width="400"
                      height="300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold">{destination.city}</h3>
                      <p className="text-white/90">{destination.country}</p>
                      <div className="mt-2 text-sm text-white/80 flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {new Date(destination.date).toLocaleDateString('zh-CN')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 票据展示区 */}
                <div className="w-full md:w-2/3 p-4 md:p-6">
                  <div className="flex items-center mb-4">
                    <TicketIcon className="w-5 h-5 text-blue-500 mr-2" />
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">旅行票据</h4>
                  </div>

                  {/* 直接展示票据 */}
                  {destination.tickets.map((ticket, idx) => (
                    <TicketCard key={idx} ticket={ticket} />
                  ))}

                  {/* 查看详情按钮 */}
                  <button
                    onClick={() => handleSelectDestination(destination)}
                    className="mt-2 flex items-center text-blue-500 dark:text-blue-400 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                  >
                    查看更多详情
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 目的地详情模态框 */}
      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Travels; 