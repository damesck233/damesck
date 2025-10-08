import { motion } from 'framer-motion'
import { LockClosedIcon, ClockIcon } from '@heroicons/react/24/outline'

const RestrictedAccess: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        {/* 图标区域 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-red-600 shadow-lg">
            <LockClosedIcon className="w-12 h-12 text-white" />
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-md">
              <ClockIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </motion.div>

        {/* 标题 */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
        >
          暂时无法访问
        </motion.h1>

        {/* 描述 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="space-y-4 mb-8"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300">
            旅行足迹页面正在维护中
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            我们正在对该页面进行优化和更新，预计很快就会重新开放访问。
            <br />
            感谢您的耐心等待！
          </p>
        </motion.div>

        {/* 操作按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            返回上一页
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            回到首页
          </button>
        </motion.div>

        {/* 底部信息 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="mt-12 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-center justify-center text-sm text-blue-700 dark:text-blue-300">
            <ClockIcon className="w-4 h-4 mr-2" />
            <span>如有紧急需要，请通过联系页面与我们取得联系</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default RestrictedAccess