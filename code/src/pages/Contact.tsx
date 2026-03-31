import React, { useState } from 'react';
import { motion, AnimatePresence, stagger } from 'framer-motion';
import { XMarkIcon, MinusIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import FeishuWebhook from '../components/FeishuWebhook';

// 定义联系方式数据类型
interface ContactItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  info: string;
  description: string;
  color: string;
  qrCode?: boolean;
  qrCodeImage?: string;
  isEmail?: boolean;
  isLink?: boolean;
  link?: string;
  isWebhook?: boolean;
}

// 联系方式数据
const contactData: ContactItem[] = [
  {
    id: 'wechat',
    title: '微信',
    icon: (
      <svg className="w-6 h-6 text-[#07C160]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.328.328 0 0 0 .165-.054l1.9-1.106a.732.732 0 0 1 .586-.08c.93.265 1.938.4 2.973.4 4.8 0 8.691-3.289 8.691-7.342s-3.89-7.343-8.691-7.343zM5.912 7.227a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85zm5.56 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85zM24 14.53c0-3.568-3.53-6.487-7.873-6.487-4.346 0-7.873 2.919-7.873 6.487 0 3.568 3.527 6.486 7.873 6.486.847 0 1.662-.114 2.423-.328a.593.593 0 0 1 .479.066l1.551.903a.26.26 0 0 0 .136.04c.13 0 .236-.108.236-.241 0-.06-.023-.114-.039-.174l-.318-1.21a.476.476 0 0 1 .174-.546c1.5-1.101 2.558-2.75 2.558-4.996zm-10.356-1.6a.776.776 0 1 1 0-1.552.776.776 0 0 1 0 1.552zm4.981 0a.776.776 0 1 1 0-1.552.776.776 0 0 1 0 1.552z" />
      </svg>
    ),
    info: 'damesck',
    description: '扫一扫添加微信好友',
    color: 'bg-[#07C160]/10 dark:bg-[#07C160]/20',
    qrCode: true,
    qrCodeImage: 'https://img.klpz.net/file/tc/img/2025/04/25/680b7051c3431.jpg',
  },
  {
    id: 'qq',
    title: 'QQ',
    icon: (
      <svg className="w-6 h-6 text-[#12B7F5]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.003 2c-2.265 0-6.29 1.364-6.29 7.325 0 1.735-.08 3.18-.25 4.395-.142.993-.68 1.591-1.216 2.267-.536.676-1.145 1.353-1.314 2.489-.169 1.136.358 1.847 1.342 2.325.984.477 2.119.946 2.764 1.363.645.417.878.634.878 1.21v.034c0 .762.814 1.642 2.403 1.642 1.239 0 2.217-.427 2.886-.896.472-.33.732-.544.928-.544h.044c.195 0 .456.214.928.544.67.47 1.647.896 2.886.896 1.59 0 2.403-.88 2.403-1.642v-.034c0-.576.233-.793.878-1.21.645-.417 1.78-.886 2.764-1.363.984-.478 1.513-1.19 1.342-2.325-.168-1.136-.778-1.813-1.314-2.49-.536-.675-1.074-1.273-1.216-2.265-.17-1.215-.25-2.66-.25-4.395 0-5.961-4.026-7.325-6.29-7.325H12.003zm0 1.5h.004c2.253 0 4.791 1.446 4.791 5.825 0 1.775.085 3.313.279 4.676.151 1.05.395 1.495.912 2.152.516.657 1.237 1.455 1.481 3.027.203 1.302-.303 1.704-.7 1.897-.398.193-1.525.672-2.21 1.117-.687.445-1.144 1.11-1.144 2.385 0 .378-.329.842-1.003.842-.99 0-1.55-.27-1.945-.558-.276-.205-.753-.555-1.462-.555h-.044c-.709 0-1.186.35-1.462.555-.395.287-.955.558-1.945.558-.674 0-1.003-.464-1.003-.842 0-1.275-.458-1.94-1.144-2.385-.686-.446-1.813-.924-2.21-1.117-.398-.193-.905-.595-.701-1.897.244-1.572.964-2.37 1.48-3.027.517-.657.761-1.101.913-2.152.194-1.363.278-2.9.278-4.676 0-4.38 2.539-5.825 4.791-5.825h.004z" />
      </svg>
    ),
    info: '2449813874',
    description: '通过QQ添加我',
    color: 'bg-[#12B7F5]/10 dark:bg-[#12B7F5]/20',
    qrCode: true,
    qrCodeImage: 'https://img.klpz.net/file/tc/img/2025/04/25/680b70bc687ab.jpg',
  },
  {
    id: 'email',
    title: '邮箱',
    icon: (
      <svg className="w-6 h-6 text-[#EA4335]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z" />
      </svg>
    ),
    info: 'damesck@outlook.com',
    description: '发送邮件联系我',
    color: 'bg-[#EA4335]/10 dark:bg-[#EA4335]/20',
    isEmail: true,
  },
  {
    id: 'github',
    title: 'GitHub',
    icon: (
      <svg className="w-6 h-6 dark:text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.475 2 2 6.475 2 12c0 4.425 2.862 8.162 6.838 9.488.5.088.687-.212.687-.475 0-.237-.012-1.025-.012-1.862-2.513.462-3.175-.613-3.375-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.337 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.025a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.113 2.5.338 1.912-1.3 2.75-1.025 2.75-1.025.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.575.688.475C19.137 20.163 22 16.425 22 12c0-5.525-4.475-10-10-10Z" />
      </svg>
    ),
    info: 'github.com/damesck233',
    description: '访问我的GitHub项目',
    color: 'bg-gray-100 dark:bg-gray-700/30',
    isLink: true,
    link: 'https://github.com/damesck233',
  },
  {
    id: 'bilibili',
    title: '哔哩哔哩',
    icon: (
      <svg className="w-6 h-6 text-[#00AEEC]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm-6.667 2.56c.125.142.186.329.186.56 0 .23-.061.418-.186.56-.124.141-.294.213-.507.213-.212 0-.382-.072-.506-.213a.921.921 0 0 1-.187-.56c0-.231.062-.418.187-.56.124-.141.294-.213.506-.213.213 0 .383.072.507.213zm8 0c.125.142.187.329.187.56 0 .23-.062.418-.187.56-.124.141-.294.213-.507.213-.212 0-.382-.072-.506-.213a.921.921 0 0 1-.187-.56c0-.231.062-.418.187-.56.124-.141.294-.213.506-.213.213 0 .383.072.507.213z" />
      </svg>
    ),
    info: 'space.bilibili.com/1165771933',
    description: '关注我的哔哩哔哩空间',
    color: 'bg-[#00AEEC]/10 dark:bg-[#00AEEC]/20',
    isLink: true,
    link: 'https://space.bilibili.com/1165771933',
  },
  {
    id: 'feishu',
    title: '飞书',
    icon: (
      <img src="https://api.damesck.net/api/svg/blog/Feishu.svg" alt="飞书" className="w-6 h-6" />
    ),
    info: '飞书账号: damesck',
    description: '通过飞书联系我',
    color: 'bg-[#00D6B9]/10 dark:bg-[#00D6B9]/20',
    qrCode: true,
    qrCodeImage: 'https://img.klpz.net/file/tc/img/2025/04/25/680b70e38674c.jpg',
  },
  {
    id: 'feishu-webhook',
    title: '推送到飞书',
    icon: (
      <svg className="w-6 h-6 text-[#00D6B9]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
    info: '快速消息推送',
    description: '通过飞书机器人发送消息',
    color: 'bg-[#00D6B9]/10 dark:bg-[#00D6B9]/20',
    isWebhook: true,
  },
];

// 定义卡片组件的props类型
interface ContactCardProps {
  contact: ContactItem;
  onViewQRCode: (contact: ContactItem) => void;
  onWebhookClick?: () => void;
}

// 卡片组件
const ContactCard: React.FC<ContactCardProps> = ({ contact, onViewQRCode, onWebhookClick }) => {
  // 友链卡片风格
  const cardStyle = {
    backgroundColor: 'var(--glass-bg)',
    borderRadius: '18px',
    boxShadow: '0 5px 15px var(--glass-shadow), 0 2px 5px rgba(0,0,0,0.05)',
    overflow: 'hidden',
    transition: 'all 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
    border: '1px solid var(--glass-border)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)'
  };

  // 获取卡片颜色
  const getCardColor = () => {
    switch (contact.id) {
      case 'wechat':
        return 'from-green-400/15 to-green-600/15 dark:from-green-700/25 dark:to-green-900/25 border-green-200/40 dark:border-green-700/40';
      case 'qq':
        return 'from-blue-400/15 to-blue-600/15 dark:from-blue-700/25 dark:to-blue-900/25 border-blue-200/40 dark:border-blue-700/40';
      case 'email':
        return 'from-red-400/15 to-red-600/15 dark:from-red-700/25 dark:to-red-900/25 border-red-200/40 dark:border-red-700/40';
      case 'github':
        return 'from-slate-400/15 to-slate-600/15 dark:from-slate-700/25 dark:to-slate-900/25 border-slate-200/40 dark:border-slate-700/40';
      case 'bilibili':
        return 'from-sky-400/15 to-sky-600/15 dark:from-sky-700/25 dark:to-sky-900/25 border-sky-200/40 dark:border-sky-700/40';
      case 'feishu':
        return 'from-teal-400/15 to-teal-600/15 dark:from-teal-700/25 dark:to-teal-900/25 border-teal-200/40 dark:border-teal-700/40';
      default:
        return 'from-indigo-400/15 to-indigo-600/15 dark:from-indigo-700/25 dark:to-indigo-900/25 border-indigo-200/40 dark:border-indigo-700/40';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.02,
        y: -5,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15
        }
      }}
      className="h-full"
      style={{ willChange: 'transform' }}
    >
      <div
        style={cardStyle}
        className={`h-full bg-gradient-to-br ${getCardColor()} backdrop-blur-xl overflow-hidden relative`}
      >
        <div className="p-4 flex flex-col h-full">
          {/* 图标 + 标题 + 信息 */}
          <div className="flex items-center mb-3">
            <div className="p-2.5 rounded-full bg-white/80 dark:bg-gray-700/80 shadow-sm mr-3 shrink-0">
              {contact.icon}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-bold text-[#2c2c2e] dark:text-white truncate leading-tight">{contact.title}</h2>
              <p className="text-xs font-medium text-[#6c6c6e] dark:text-gray-400 mt-0.5 truncate">{contact.info}</p>
            </div>
          </div>

          {/* 描述文字 */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 flex-grow leading-relaxed">{contact.description}</p>

          {/* 按钮区 */}
          <div className="flex flex-wrap gap-2">
            {contact.isLink && (
              <a
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="win98-contact-button inline-flex items-center px-3 py-1.5 rounded-full bg-[#007AFF] dark:bg-[#0063CC] text-white font-medium text-xs transition-all hover:bg-[#0063CC] whitespace-nowrap"
              >
                访问链接
                <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}

            {contact.isEmail && (
              <a
                href={`mailto:${contact.info}`}
                className="win98-contact-button inline-flex items-center px-3 py-1.5 rounded-full bg-[#007AFF] dark:bg-[#0063CC] text-white font-medium text-xs transition-all hover:bg-[#0063CC] whitespace-nowrap"
              >
                发送邮件
                <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )}

            {contact.qrCode && !contact.isLink && (
              <button
                onClick={() => onViewQRCode(contact)}
                className="win98-contact-button inline-flex items-center px-3 py-1.5 rounded-full bg-[#007AFF] dark:bg-[#0063CC] text-white font-medium text-xs transition-all hover:bg-[#0063CC] whitespace-nowrap"
              >
                查看二维码
                <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {contact.qrCode && contact.isLink && (
              <button
                onClick={() => onViewQRCode(contact)}
                className="win98-contact-button win98-contact-button--secondary inline-flex items-center px-3 py-1.5 rounded-full bg-white/30 dark:bg-gray-700/60 text-gray-700 dark:text-gray-200 font-medium text-xs transition-all hover:bg-white/50 dark:hover:bg-gray-600/60 whitespace-nowrap"
              >
                二维码
                <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {contact.isWebhook && onWebhookClick && (
              <button
                onClick={onWebhookClick}
                className="win98-contact-button inline-flex items-center px-3 py-1.5 rounded-full bg-[#00D6B9] dark:bg-[#00B5A0] text-white font-medium text-xs transition-all hover:bg-[#00B5A0] whitespace-nowrap"
              >
                发送消息
                <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* 右下角装饰 */}
        <div className="absolute bottom-3 right-3 w-10 h-10 opacity-[0.05]">
          {contact.icon}
        </div>
      </div>
    </motion.div>
  );
};

// 定义二维码弹窗组件的props类型
interface QRCodeModalProps {
  contact: ContactItem;
  onClose: () => void;
}

// 二维码弹窗组件
const QRCodeModal: React.FC<QRCodeModalProps> = ({ contact, onClose }) => {
  // 针对不同联系方式定制标题
  const getTitle = () => {
    if (contact.id === 'wechat') return '微信二维码';
    if (contact.id === 'qq') return 'QQ二维码';
    if (contact.id === 'feishu') return '飞书二维码';
    if (contact.id === 'bilibili') return '哔哩哔哩账号';
    return `${contact.title}二维码`;
  };

  // 针对不同联系方式定制说明文字
  const getMessage = () => {
    if (contact.id === 'wechat') return '扫描二维码添加微信好友';
    if (contact.id === 'qq') return '扫描二维码添加QQ好友';
    if (contact.id === 'feishu') return '扫描二维码添加飞书联系人';
    if (contact.id === 'bilibili') return '扫描二维码关注我的哔哩哔哩';
    return contact.description;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          duration: 0.4
        }}
        className="bg-white/90 dark:bg-[#1c1c1e]/90 backdrop-blur-2xl rounded-[20px] overflow-hidden max-w-xs w-full mx-4 shadow-2xl border border-white/30 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 h-9 bg-black/[0.03] dark:bg-white/[0.03] border-b border-black/[0.06] dark:border-white/[0.06]">
          <button onClick={onClose} className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border-[0.5px] border-[#e0443e] hover:brightness-90 transition-all flex items-center justify-center group" aria-label="Close">
            <XMarkIcon className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
          </button>
          <button onClick={onClose} className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border-[0.5px] border-[#dea123] hover:brightness-90 transition-all flex items-center justify-center group" aria-label="Minimize">
            <MinusIcon className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
          </button>
          <button className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border-[0.5px] border-[#1aab29] hover:brightness-90 transition-all flex items-center justify-center group cursor-default" aria-label="Maximize">
            <ArrowTopRightOnSquareIcon className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <div className="p-5">
        <div className="flex items-center mb-4">
          <div className={`p-2 rounded-full ${contact.color} mr-3`}>
            {contact.icon}
          </div>
          <h3 className="text-lg font-bold text-[#2c2c2e] dark:text-white">{getTitle()}</h3>
        </div>

        <div className="flex flex-col items-center justify-center py-2">
          {contact.qrCodeImage ? (
            <div className="w-44 h-44 bg-white dark:bg-gray-700 p-3 rounded-xl shadow-sm mb-3 relative overflow-hidden">
              <img
                src={contact.qrCodeImage}
                alt={`${contact.title}二维码`}
                className="w-full h-full object-contain"
              />
              {/* 添加小图标在右下角 */}
              <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-md p-1.5 flex items-center justify-center">
                {contact.icon}
              </div>
            </div>
          ) : (
            <div className="w-44 h-44 bg-white dark:bg-gray-700 p-3 rounded-xl shadow-sm mb-3 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-gray-500">
                <span className="text-sm">二维码占位</span>
              </div>
              <div className="grid grid-cols-10 grid-rows-10 gap-1 w-full h-full relative z-10">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div
                    key={i}
                    className={`${Math.random() > 0.7 ? 'bg-black' : 'bg-transparent'} rounded-sm`}
                  />
                ))}
              </div>
            </div>
          )}
          <p className="text-center text-[#2c2c2e] dark:text-white font-medium">{contact.info}</p>
          <p className="text-center text-[#6c6c6e] dark:text-gray-400 text-sm mt-1">{getMessage()}</p>

          {/* 添加适合该联系方式的操作按钮 */}
          <div className="mt-4 flex space-x-2">
            {contact.isLink && (
              <a
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#007AFF] dark:bg-[#0063CC] text-white font-medium text-sm transition-all hover:bg-[#0063CC]"
              >
                立即访问
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}

            {contact.id === 'qq' && (
              <a
                href={`tencent://message/?uin=${contact.info}`}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#12B7F5] dark:bg-[#0095D3] text-white font-medium text-sm transition-all hover:bg-[#0095D3]"
              >
                打开QQ
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </a>
            )}

            {contact.id === 'email' && (
              <a
                href={`mailto:${contact.info}`}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#EA4335] dark:bg-[#D03121] text-white font-medium text-sm transition-all hover:bg-[#D03121]"
              >
                发送邮件
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            )}

            {/* 如果没有任何按钮，则添加复制信息按钮 */}
            {!contact.isLink && contact.id !== 'qq' && contact.id !== 'email' && (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(contact.info);
                  // 可以添加一个复制成功的提示，不过这里简化处理
                }}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-full bg-gray-500 dark:bg-gray-600 text-white font-medium text-sm transition-all hover:bg-gray-600 dark:hover:bg-gray-500"
              >
                复制信息
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            )}
          </div>
        </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Contact: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);
  const [showFeishuWebhook, setShowFeishuWebhook] = useState(false);

  const handleViewQRCode = (contact: ContactItem): void => {
    setSelectedContact(contact);
  };

  const handleCloseModal = (): void => {
    setSelectedContact(null);
  };

  // 将联系方式按类别分组
  const socialContacts = contactData.filter(c => ['wechat', 'qq', 'feishu'].includes(c.id));
  const platformContacts = contactData.filter(c => ['github', 'bilibili'].includes(c.id));
  const emailContacts = contactData.filter(c => ['email'].includes(c.id));
  const webhookContacts = contactData.filter(c => ['feishu-webhook'].includes(c.id));

  // 分类标题组件
  const SectionTitle = ({ title }: { icon?: React.ReactNode, title: string, count?: number, color?: string }) => (
    <h2 className="text-[22px] font-bold text-[#1d1d1f] dark:text-white tracking-tight mb-5">{title}</h2>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 flex flex-col min-h-[calc(100vh-200px)]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide border border-blue-200/50 dark:border-blue-700/50">
            GET IN TOUCH
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-[#2c2c2e] dark:text-white tracking-tight">
          联系方式
        </h1>
        <p className="text-base md:text-lg text-[#6c6c6e] dark:text-gray-400 max-w-xl leading-relaxed">
          选择您喜欢的方式与我取得联系，无论技术讨论、项目合作还是随便聊聊，我都很期待！
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100/60 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/50 text-xs text-gray-600 dark:text-gray-400 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            通常 24 小时内回复
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100/60 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/50 text-xs text-gray-600 dark:text-gray-400 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            开放技术交流与合作
          </div>
        </div>
      </motion.div>

      {/* 所有联系方式按分类合并展示 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-grow space-y-14"
      >
        {/* 社交媒体 */}
        <div>
          <SectionTitle title="社交媒体" count={socialContacts.length} color="blue" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onViewQRCode={handleViewQRCode}
              />
            ))}
          </div>
        </div>

        {/* 内容平台 */}
        <div>
          <SectionTitle title="内容平台" count={platformContacts.length} color="purple" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {platformContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onViewQRCode={handleViewQRCode}
              />
            ))}
          </div>
        </div>

        {/* 电子邮件 */}
        <div>
          <SectionTitle title="电子邮件" count={emailContacts.length} color="teal" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {emailContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onViewQRCode={handleViewQRCode}
              />
            ))}
          </div>
        </div>

        {/* 智能推送 */}
        <div>
          <SectionTitle title="站内联系" count={webhookContacts.length} color="red" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {webhookContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onViewQRCode={handleViewQRCode}
                onWebhookClick={() => setShowFeishuWebhook(true)}
              />
            ))}
          </div>
        </div>

        {/* 底部提示 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-gray-100/30 to-gray-200/30 dark:from-gray-800/30 dark:to-gray-900/30 backdrop-blur-xl rounded-2xl p-5 border border-gray-200/50 dark:border-gray-700/30"
          style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100/60 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">关于回复</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                我会尽量在 24 小时内回复消息。<span className="text-gray-800 dark:text-gray-300 font-medium">微信和飞书</span>是最快的联系方式，如有紧急事宜建议优先使用。若通过邮件联系，请注意检查垃圾邮件箱。
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* 二维码弹窗 */}
      <AnimatePresence>
        {selectedContact && (
          <QRCodeModal
            contact={selectedContact}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>

      {/* 飞书Webhook弹窗 */}
      <AnimatePresence>
        {showFeishuWebhook && (
          <FeishuWebhook
            isOpen={showFeishuWebhook}
            onClose={() => setShowFeishuWebhook(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
