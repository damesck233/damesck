import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPinIcon, GlobeEuropeAfricaIcon, TicketIcon, ChevronRightIcon, XMarkIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

// 导入旅行数据
import travelDataJson from '../data/travels/travelData.json';

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
  }[];
}

// 将导入的JSON数据转换为类型化数据
const travelData: TravelDestination[] = travelDataJson as TravelDestination[];

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
const TrainTicketCard: React.FC<TicketProps> = ({ ticket }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative overflow-hidden rounded-xl backdrop-blur-xl flex mb-4"
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
              <div className="text-sm text-gray-500 dark:text-gray-400">车次</div>
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
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">往返</div>
            </div>

            <div className="text-center">
              <div className="text-lg font-semibold">{ticket.to}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">到达站</div>
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
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">座位类型</div>
                <div className="text-sm font-medium">二等座</div>
              </div>
            </div>
          </div>

          {/* 底部信息 */}
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 border-t border-dashed border-gray-300 dark:border-gray-600 pt-3">
            <div className="flex justify-between">
              <span>票号: 89757****3728</span>
              <span>旅客信息已隐藏</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// 飞机票组件
const FlightTicketCard: React.FC<TicketProps> = ({ ticket }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative overflow-hidden rounded-xl backdrop-blur-xl flex mb-4"
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
                {ticket.number.substring(0, 2) === 'CA' ? '中国国际航空' :
                  ticket.number.substring(0, 2) === 'MU' ? '东方航空' :
                    ticket.number.substring(0, 2) === 'CZ' ? '南方航空' :
                      ticket.number.substring(0, 2) === 'JL' ? '日本航空' : '航空公司'}
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
            <div className="text-xs text-gray-500 mt-1">09:30</div>
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
                <div className="text-xs text-gray-500 mt-1">2小时30分</div>
              </div>
              <div className="h-px bg-gray-300 flex-grow"></div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-xl font-bold text-gray-800">{ticket.to}</div>
            <div className="text-xs text-gray-500 mt-1">12:00</div>
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
          <div>
            <div className="text-xs text-gray-500">舱位</div>
            <div className="text-sm font-medium text-gray-700">经济舱</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">登机口</div>
            <div className="text-sm font-medium text-gray-700">B12</div>
          </div>
        </div>

        {/* 底部装饰 - 票据两侧的锯齿 */}
        <div className="absolute -left-2 top-1/2 w-4 h-4 bg-gray-100 rounded-full border border-gray-300 transform -translate-y-1/2"></div>
        <div className="absolute -right-2 top-1/2 w-4 h-4 bg-gray-100 rounded-full border border-gray-300 transform -translate-y-1/2"></div>
      </div>
    </motion.div>
  );
};

// 选择性渲染票据组件
const TicketCard: React.FC<TicketProps> = ({ ticket }) => {
  // 根据ticket_type选择不同票据样式
  if (ticket.ticket_type === 'Roven') {
    return <TrainTicketCard ticket={ticket} />;
  } else if (ticket.ticket_type === 'fly') {
    return <FlightTicketCard ticket={ticket} />;
  }

  // 默认票据样式 (兼容)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative overflow-hidden rounded-xl backdrop-blur-xl flex mb-4"
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
          日期: <span className="text-gray-700 dark:text-gray-300">{ticket.date}</span>
        </div>

        {ticket.image && (
          <div className="mt-3 rounded-lg overflow-hidden">
            <img src={ticket.image} alt="Ticket" className="w-full h-24 object-cover" />
          </div>
        )}

        {/* 底部虚线 */}
        <div className="absolute bottom-0 left-4 right-4 border-b border-dashed border-gray-300 dark:border-gray-600"></div>
      </div>
    </motion.div>
  );
};

// 目的地详情模态框组件
interface DestinationModalProps {
  destination: TravelDestination | null;
  onClose: () => void;
}

const DestinationModal: React.FC<DestinationModalProps> = ({ destination, onClose }) => {
  if (!destination) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-2xl max-h-[80vh] overflow-auto rounded-2xl bg-white dark:bg-gray-900 shadow-xl"
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
                    <img src={photo} alt={`${destination.city} ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// 主页面组件
const Travels: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<TravelDestination | null>(null);

  // 模拟地图组件 - 实际项目中可以使用Leaflet、Google Maps或高德地图等地图库
  const MapPlaceholder = () => (
    <div className="relative w-full h-[300px] sm:h-[400px] rounded-xl overflow-hidden backdrop-blur-lg border border-white/20 dark:border-gray-700/30 bg-white/20 dark:bg-gray-900/30">
      {/* 模拟地图背景 */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1569336415962-a4bd9f69c8bf')] bg-cover bg-center opacity-40"></div>

      {/* 地图标记 */}
      {travelData.map((dest) => (
        <button
          key={dest.id}
          onClick={() => setSelectedDestination(dest)}
          className="absolute z-10 group"
          style={{
            left: `${((dest.coordinates[0] + 180) / 360) * 100}%`,
            top: `${((90 - dest.coordinates[1]) / 180) * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="animate-ping absolute w-4 h-4 rounded-full bg-blue-400 opacity-75"></div>
              <div className="relative w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                <MapPinIcon className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-1 bg-white dark:bg-gray-900 rounded-lg px-2 py-1 text-xs shadow-lg whitespace-nowrap">
              {dest.city}, {dest.country}
            </div>
          </div>
        </button>
      ))}

      {/* 地图信息覆盖层 */}
      <div className="absolute bottom-4 left-4 right-4 rounded-lg backdrop-blur-md bg-white/70 dark:bg-gray-900/70 p-3 border border-white/30 dark:border-gray-700/30">
        <div className="flex items-center text-gray-700 dark:text-gray-300">
          <GlobeEuropeAfricaIcon className="w-5 h-5 mr-2 text-blue-500" />
          <span className="text-sm">已经探索 <span className="font-semibold text-blue-600 dark:text-blue-400">{travelData.length}</span> 个目的地</span>
        </div>
      </div>
    </div>
  );

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
        <MapPlaceholder />
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

        <div className="grid grid-cols-1 gap-8">
          {travelData.map((destination) => (
            <motion.div
              key={destination.id}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg border border-white/20 dark:border-gray-700/30"
            >
              <div className="flex flex-col md:flex-row">
                {/* 目的地信息区 */}
                <div className="w-full md:w-1/3">
                  <div className="relative h-48 md:h-full">
                    <img
                      src={destination.photos[0]}
                      alt={destination.city}
                      className="w-full h-full object-cover"
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
                    onClick={() => setSelectedDestination(destination)}
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
          onClose={() => setSelectedDestination(null)}
        />
      )}
    </div>
  );
};

export default Travels; 