import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BeakerIcon, ServerIcon } from '@heroicons/react/24/outline';

function Tools() {
  return (
    <div className="container mx-auto max-w-5xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 flex items-center">
          <BeakerIcon className="w-8 h-8 mr-3 text-blue-500 dark:text-blue-400" />
          实用工具集
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          这里集合了一系列实用的网络和开发工具，帮助你解决日常工作中的各种问题。
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/tools/subnet-calculator" className="block p-6 bg-blue-500 text-white rounded-xl shadow-md">
          <div className="flex items-center mb-4">
            <ServerIcon className="w-8 h-8 mr-3" />
            <h2 className="text-xl font-semibold">子网掩码计算器</h2>
          </div>
          <p>计算IP地址的子网掩码、网络地址、广播地址及可用IP范围</p>
        </Link>
      </div>
    </div>
  );
}

export default Tools;
