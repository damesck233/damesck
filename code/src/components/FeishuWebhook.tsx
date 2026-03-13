import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Turnstile } from '@marsidev/react-turnstile';
import { XMarkIcon, MinusIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface FeishuWebhookProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'contact' | 'friend'; // 新增类型属性
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  // 朋友链接专用字段
  siteName?: string;
  siteUrl?: string;
  avatar?: string;
  description?: string;
}

const FeishuWebhook: React.FC<FeishuWebhookProps> = ({ isOpen, onClose, type = 'contact' }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    // 朋友链接专用字段
    siteName: '',
    siteUrl: '',
    avatar: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [captchaError, setCaptchaError] = useState(false);

  // 飞书机器人webhook URL (从环境变量读取)
  const FEISHU_WEBHOOK_URL = import.meta.env.VITE_FEISHU_WEBHOOK_URL || '';
  
  // 验证码开关配置 (从环境变量读取)
  const ENABLE_CAPTCHA = import.meta.env.VITE_ENABLE_CAPTCHA === 'true';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted!', formData); // 调试信息

    // 验证码验证 (仅在启用验证码时进行验证)
    if (ENABLE_CAPTCHA && !captchaToken) {
      setCaptchaError(true);
      setErrorMessage('请完成人机验证');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    setCaptchaError(false);

    try {
      // 根据类型构建不同的飞书消息格式
      let feishuMessage;

      if (type === 'friend') {
        feishuMessage = {
          msg_type: "interactive",
          card: {
            elements: [
              {
                tag: "div",
                text: {
                  content: `**新的友链申请**\n\n**站点名称：** ${formData.siteName}\n**站点URL：** ${formData.siteUrl}\n**站长姓名：** ${formData.name}\n**联系邮箱：** ${formData.email}\n**头像链接：** ${formData.avatar}\n\n**站点描述：**\n${formData.description}`,
                  tag: "lark_md"
                }
              },
              {
                tag: "hr"
              },
              {
                tag: "div",
                text: {
                  content: `申请时间：${new Date().toLocaleString('zh-CN')}`,
                  tag: "plain_text"
                }
              }
            ],
            header: {
              title: {
                content: "🔗 友链申请",
                tag: "plain_text"
              },
              template: "green"
            }
          }
        };
      } else {
        feishuMessage = {
          msg_type: "interactive",
          card: {
            elements: [
              {
                tag: "div",
                text: {
                  content: `**新的联系消息**\n\n**姓名：** ${formData.name}\n**邮箱：** ${formData.email}\n**主题：** ${formData.subject}\n\n**消息内容：**\n${formData.message}`,
                  tag: "lark_md"
                }
              },
              {
                tag: "hr"
              },
              {
                tag: "div",
                text: {
                  content: `发送时间：${new Date().toLocaleString('zh-CN')}`,
                  tag: "plain_text"
                }
              }
            ],
            header: {
              title: {
                content: "📧 网站联系表单",
                tag: "plain_text"
              },
              template: "blue"
            }
          }
        };
      }

      // 发送到飞书机器人
      const res = await fetch(FEISHU_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feishuMessage)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setSubmitStatus('success');
      // 清空表单
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        siteName: '',
        siteUrl: '',
        avatar: '',
        description: ''
      });

      // 重置验证码
      setCaptchaToken('');
      setCaptchaError(false);

    } catch (error) {
      console.error('发送消息失败:', error);
      setSubmitStatus('error');
      setErrorMessage('发送失败，请稍后重试或使用其他联系方式');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setSubmitStatus('idle');
      setErrorMessage('');
      setCaptchaToken('');
      setCaptchaError(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto sm:p-6"
        onClick={handleClose}
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
          className="bg-white/95 dark:bg-[#1c1c1e]/95 backdrop-blur-2xl rounded-[20px] overflow-hidden max-w-md w-full mx-2 sm:mx-4 shadow-2xl border border-white/30 dark:border-white/10 max-h-[90vh] sm:max-h-[85vh] flex flex-col my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 头部 - 固定不滚动 */}
          <div className="flex items-center justify-between p-4 sm:p-6 pb-2 sm:pb-4 flex-shrink-0">
            <div className="flex items-center gap-2">
              <button onClick={handleClose} disabled={isSubmitting} className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border-[0.5px] border-[#e0443e] hover:brightness-90 transition-all flex items-center justify-center group disabled:opacity-50" aria-label="Close">
                <XMarkIcon className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
              </button>
              <button className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border-[0.5px] border-[#dea123] hover:brightness-90 transition-all flex items-center justify-center group cursor-default" aria-label="Minimize">
                <MinusIcon className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
              </button>
              <button className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border-[0.5px] border-[#1aab29] hover:brightness-90 transition-all flex items-center justify-center group cursor-default" aria-label="Maximize">
                <ArrowTopRightOnSquareIcon className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
              </button>
            </div>
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-[#00D6B9]/10 dark:bg-[#00D6B9]/20 mr-3">
                <svg className="w-6 h-6 text-[#00D6B9]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.861 2c-4.426 0-8.05 3.241-8.715 7.439-.015.107-.03.214-.041.321a.493.493 0 0 0 .339.497c.903.266 2.666.885 4.254 2.062H3.649c-.901 0-1.601.781-1.515 1.679.155 1.627.928 5.219 4.334 9.158a.513.513 0 0 0 .765.042c.267-.267.553-.535.853-.802.262-.234.294-.626.112-.922-.535-.867-.888-1.772-1.048-2.692-.085-.491.299-.95.792-.95h4.544c.357 0 .681-.215.823-.545a10.665 10.665 0 0 1 2.913-3.835c.233-.205.525-.318.827-.318h1.780a.84.84 0 0 0 .839-.839v-.322c-.002-4.687-3.803-8.496-8.493-8.496h-.314zm2.376 1.954c2.311 0 4.184 1.873 4.184 4.183 0 .229-.186.415-.415.415H10.05a.415.415 0 0 1-.415-.415v-3.768c0-.229.186-.415.416-.415h4.185z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2c2c2e] dark:text-white">飞书推送</h3>
            </div>
          </div>

          {/* 内容区域 - 可滚动 */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6 min-h-0">
            {/* 成功状态 */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-10"
              >
                {/* 图标圆圈 */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <svg className="w-10 h-10 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.15, ease: "easeInOut" }}
                    />
                  </svg>
                </motion.div>

                {/* 标题 */}
                <motion.h4
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.35, ease: "easeOut" }}
                  className="text-[22px] font-bold text-[#1d1d1f] dark:text-white tracking-tight mb-2"
                >
                  发送成功
                </motion.h4>

                {/* 描述 */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.35, ease: "easeOut" }}
                  className="text-[15px] text-[#1d1d1f]/60 dark:text-white/60 mb-8 leading-relaxed"
                >
                  消息已通过飞书机器人推送，我会尽快回复您。
                </motion.p>

                {/* 完成按钮 */}
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.35, ease: "easeOut" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { onClose(); setSubmitStatus('idle'); }}
                  className="px-8 py-2.5 bg-[#007AFF] dark:bg-[#0063CC] text-white rounded-full text-sm font-semibold hover:bg-[#0063CC] dark:hover:bg-[#004999] transition-colors"
                >
                  完成
                </motion.button>
              </motion.div>
            )}

            {/* 错误状态 */}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-4"
              >
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">发送失败</h4>
                <p className="text-red-600 dark:text-red-400 text-sm mb-4">{errorMessage}</p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="px-4 py-2 bg-[#007AFF] dark:bg-[#0063CC] text-white rounded-lg text-sm font-medium hover:bg-[#0063CC] transition-colors"
                >
                  重新尝试
                </button>
              </motion.div>
            )}

            {/* 表单 */}
            {submitStatus === 'idle' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {type === 'friend' ? (
                  // 朋友链接申请表单
                  <>
                    <div>
                      <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        站点名称 *
                      </label>
                      <input
                        type="text"
                        id="siteName"
                        name="siteName"
                        value={formData.siteName}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                        placeholder="请输入您的站点名称"
                      />
                    </div>

                    <div>
                      <label htmlFor="siteUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        站点URL *
                      </label>
                      <input
                        type="url"
                        id="siteUrl"
                        name="siteUrl"
                        value={formData.siteUrl}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        站长姓名 *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                        placeholder="请输入您的姓名"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        联系邮箱 *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                        placeholder="请输入您的邮箱地址"
                      />
                    </div>

                    <div>
                      <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        头像链接
                      </label>
                      <input
                        type="url"
                        id="avatar"
                        name="avatar"
                        value={formData.avatar}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        站点描述 *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 resize-none"
                        placeholder="请简要描述您的站点内容和特色"
                      />
                    </div>
                  </>
                ) : (
                  // 联系表单
                  <>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        姓名 *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                        placeholder="请输入您的姓名"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        邮箱 *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                        placeholder="请输入您的邮箱地址"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        主题 *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                        placeholder="请输入消息主题"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        消息内容 *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 resize-none"
                        placeholder="请输入您想要发送的消息内容..."
                      />
                    </div>
                  </>
                )}

                {/* Cloudflare Turnstile 验证码 - 仅在启用时显示 */}
                {ENABLE_CAPTCHA && (
                  <div className="pt-0">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      安全验证 *
                    </label>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                      <div className="flex justify-start">
                        <div className="rounded-lg overflow-hidden shadow-sm">
                          <Turnstile
                            siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || "0x4AAAAAAAkqiE_JF_bJOhQr"}
                            onSuccess={(token) => {
                              setCaptchaToken(token);
                              setCaptchaError(false);
                            }}
                            onError={() => {
                              setCaptchaError(true);
                              setCaptchaToken('');
                            }}
                            onExpire={() => {
                              setCaptchaToken('');
                            }}
                            options={{
                              theme: 'auto',
                              size: 'normal'
                            }}
                          />
                        </div>
                      </div>
                      {captchaError && (
                        <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                              验证失败，请重新验证
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-[#00D6B9] hover:bg-[#00B8A3] text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        发送中...
                      </>
                    ) : (
                      '发送消息'
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* 说明文字 */}
            {submitStatus === 'idle' && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-xs text-blue-600 dark:text-blue-400 flex items-start">
                  <svg className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  您的消息将通过飞书机器人实时推送给我，这是最快速的联系方式。
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeishuWebhook;