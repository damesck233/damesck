import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import {
  ServerIcon,
  ArrowPathIcon,
  InformationCircleIcon,
  DocumentDuplicateIcon,
  ArrowPathRoundedSquareIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

// 输入框组件
const InputField = ({
  label,
  value,
  onChange,
  placeholder = "",
  maxLength = 3,
  disabled = false,
  width = "w-16"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  width?: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-24 text-sm text-gray-700 dark:text-gray-300">{label}</div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        className={`${width} h-10 text-center bg-white/30 dark:bg-gray-800/40 backdrop-blur-md rounded-lg border border-white/20 dark:border-gray-700/40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-60`}
      />
    </div>
  );
};

// 结果显示组件
const ResultDisplay = ({ label, value }: { label: string; value: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 my-2">
      <div className="w-28 text-sm text-gray-700 dark:text-gray-300">{label}</div>
      <div className="flex-1 group relative px-3 py-2 bg-white/20 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg border border-white/20 dark:border-gray-700/40 text-sm">
        {value}
        <button
          onClick={handleCopy}
          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          title="复制到剪贴板"
        >
          {copied ? (
            <span className="text-green-500 text-xs">已复制!</span>
          ) : (
            <DocumentDuplicateIcon className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

// 小提示组件
const InfoTip = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-4 p-3 bg-blue-50/70 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 rounded-lg backdrop-blur-sm">
      <div className="flex gap-2">
        <InformationCircleIcon className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700 dark:text-blue-300">
          {children}
        </div>
      </div>
    </div>
  );
};

// 按钮组件
const Button = ({
  onClick,
  type = "primary",
  children
}: {
  onClick: () => void;
  type?: "primary" | "secondary";
  children: React.ReactNode;
}) => {
  const baseClasses = "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/50";

  const typeClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${typeClasses[type]}`}
    >
      {children}
    </button>
  );
};

// 标题栏组件
const SectionTitle = ({ title, icon }: { title: string; icon?: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700/30">
      {icon && <div className="text-blue-500 dark:text-blue-400">{icon}</div>}
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h2>
    </div>
  );
};

// 可折叠面板组件
const CollapsiblePanel = ({
  title,
  children,
  icon,
  defaultOpen = false
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-4 bg-white/10 dark:bg-gray-800/40 backdrop-blur-xl rounded-xl border border-white/10 dark:border-gray-700/30 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          {icon && <div className="text-blue-500 dark:text-blue-400">{icon}</div>}
          <h3 className="text-base font-semibold text-gray-800 dark:text-white">{title}</h3>
        </div>
        <div className="text-gray-500 dark:text-gray-400">
          {isOpen ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5">
          {children}
        </div>
      )}
    </div>
  );
};

// 子网掩码计算器主组件
const SubnetCalculator = () => {
  // 页面过渡动画
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  // IP地址输入状态
  const [octet1, setOctet1] = useState('192');
  const [octet2, setOctet2] = useState('168');
  const [octet3, setOctet3] = useState('1');
  const [octet4, setOctet4] = useState('1');

  // 掩码位数
  const [maskBits, setMaskBits] = useState('24');

  // 计算结果
  const [subnetMask, setSubnetMask] = useState('');
  const [networkAddress, setNetworkAddress] = useState('');
  const [broadcastAddress, setBroadcastAddress] = useState('');
  const [firstUsableIp, setFirstUsableIp] = useState('');
  const [lastUsableIp, setLastUsableIp] = useState('');
  const [totalHosts, setTotalHosts] = useState('');
  const [usableHosts, setUsableHosts] = useState('');
  const [ipClass, setIpClass] = useState('');
  const [binaryMask, setBinaryMask] = useState('');
  const [wildcardMask, setWildcardMask] = useState('');
  const [hexMask, setHexMask] = useState('');

  // 点分十进制转换器
  const [dotMask, setDotMask] = useState('255.255.255.0');
  const [cidrMask, setCidrMask] = useState('24');

  // 验证IP地址八位位组输入
  const validateOctet = (value: string): boolean => {
    if (value === '') return true;
    const num = parseInt(value, 10);
    return !isNaN(num) && num >= 0 && num <= 255;
  };

  // 验证掩码位数输入
  const validateMaskBits = (value: string): boolean => {
    if (value === '') return true;
    const num = parseInt(value, 10);
    return !isNaN(num) && num >= 0 && num <= 32;
  };

  // 计算子网掩码
  const calculateSubnetMask = (bits: number): string => {
    if (bits < 0 || bits > 32) return '';

    const mask = new Array(4).fill(0);
    for (let i = 0; i < bits; i++) {
      const octetIndex = Math.floor(i / 8);
      mask[octetIndex] += 1 << (7 - (i % 8));
    }

    return mask.join('.');
  };

  // 计算网络地址
  const calculateNetworkAddress = (ip: number[], mask: number[]): string => {
    return ip.map((octet, i) => octet & mask[i]).join('.');
  };

  // 计算广播地址
  const calculateBroadcastAddress = (ip: number[], mask: number[]): string => {
    const wildcardMask = mask.map(octet => 255 - octet);
    return ip.map((octet, i) => octet | wildcardMask[i]).join('.');
  };

  // 计算可用IP范围
  const calculateUsableRange = (networkAddr: string, broadcastAddr: string): [string, string] => {
    const network = networkAddr.split('.').map(Number);
    const broadcast = broadcastAddr.split('.').map(Number);

    // 如果是/31掩码，则没有可用IP
    if (parseInt(maskBits, 10) === 31) {
      return [networkAddr, broadcastAddr];
    }

    // 如果是/32掩码，则只有一个IP
    if (parseInt(maskBits, 10) === 32) {
      return [networkAddr, networkAddr];
    }

    // 第一个可用IP是网络地址+1
    const firstIP = [...network];
    firstIP[3] += 1;

    // 最后一个可用IP是广播地址-1
    const lastIP = [...broadcast];
    lastIP[3] -= 1;

    return [firstIP.join('.'), lastIP.join('.')];
  };

  // 计算IP地址类别
  const calculateIpClass = (octet1: number): string => {
    if (octet1 >= 1 && octet1 <= 126) return 'A类';
    if (octet1 >= 128 && octet1 <= 191) return 'B类';
    if (octet1 >= 192 && octet1 <= 223) return 'C类';
    if (octet1 >= 224 && octet1 <= 239) return 'D类 (多播)';
    if (octet1 >= 240 && octet1 <= 255) return 'E类 (保留)';
    return '无效';
  };

  // 计算通配符掩码
  const calculateWildcardMask = (mask: number[]): string => {
    return mask.map(octet => 255 - octet).join('.');
  };

  // 计算掩码的二进制表示
  const calculateBinaryMask = (mask: number[]): string => {
    return mask.map(octet =>
      octet.toString(2).padStart(8, '0')
    ).join('.');
  };

  // 计算掩码的十六进制表示
  const calculateHexMask = (mask: number[]): string => {
    return mask.map(octet =>
      octet.toString(16).padStart(2, '0').toUpperCase()
    ).join('.');
  };

  // 十进制掩码转CIDR
  const dotToCidr = (dotNotation: string): string => {
    try {
      const octets = dotNotation.split('.').map(o => parseInt(o, 10));
      if (octets.length !== 4 || octets.some(o => isNaN(o) || o < 0 || o > 255)) {
        return '';
      }

      let bits = 0;
      for (const octet of octets) {
        // 计算八位位组中的1的位数
        let octetBits = 0;
        for (let i = 7; i >= 0; i--) {
          if ((octet & (1 << i)) !== 0) {
            octetBits++;
          } else {
            // 一旦遇到0，就退出
            break;
          }
        }
        bits += octetBits;
      }
      return bits.toString();
    } catch (error) {
      return '';
    }
  };

  // CIDR转十进制掩码
  const cidrToDot = (cidr: string): string => {
    try {
      const bits = parseInt(cidr, 10);
      if (isNaN(bits) || bits < 0 || bits > 32) {
        return '';
      }
      return calculateSubnetMask(bits);
    } catch (error) {
      return '';
    }
  };

  // 执行所有计算
  const calculateAll = useCallback(() => {
    if (!validateOctet(octet1) || !validateOctet(octet2) ||
      !validateOctet(octet3) || !validateOctet(octet4) ||
      !validateMaskBits(maskBits)) {
      return;
    }

    const bits = parseInt(maskBits, 10);
    const ipOctets = [
      parseInt(octet1, 10),
      parseInt(octet2, 10),
      parseInt(octet3, 10),
      parseInt(octet4, 10)
    ];

    // 计算子网掩码
    const mask = calculateSubnetMask(bits);
    const maskOctets = mask.split('.').map(Number);
    setSubnetMask(mask);

    // 计算网络地址
    const network = calculateNetworkAddress(ipOctets, maskOctets);
    setNetworkAddress(network);

    // 计算广播地址
    const broadcast = calculateBroadcastAddress(ipOctets, maskOctets);
    setBroadcastAddress(broadcast);

    // 计算可用IP范围
    const [first, last] = calculateUsableRange(network, broadcast);
    setFirstUsableIp(first);
    setLastUsableIp(last);

    // 计算主机数
    const totalHostsCount = Math.pow(2, 32 - bits);
    setTotalHosts(totalHostsCount.toLocaleString());

    // 计算可用主机数（排除网络地址和广播地址）
    let usableHostsCount;
    if (bits === 31) {
      usableHostsCount = 2; // /31网络有两个可用IP地址（RFC 3021）
    } else if (bits === 32) {
      usableHostsCount = 1; // /32网络只有一个可用IP地址
    } else {
      usableHostsCount = Math.max(0, totalHostsCount - 2);
    }
    setUsableHosts(usableHostsCount.toLocaleString());

    // 计算IP类别
    setIpClass(calculateIpClass(ipOctets[0]));

    // 计算二进制掩码
    setBinaryMask(calculateBinaryMask(maskOctets));

    // 计算通配符掩码
    setWildcardMask(calculateWildcardMask(maskOctets));

    // 计算十六进制掩码
    setHexMask(calculateHexMask(maskOctets));

  }, [octet1, octet2, octet3, octet4, maskBits]);

  // 在输入改变时自动计算
  useEffect(() => {
    calculateAll();
  }, [calculateAll]);

  // 重置表单
  const handleReset = () => {
    setOctet1('192');
    setOctet2('168');
    setOctet3('1');
    setOctet4('1');
    setMaskBits('24');
  };

  // 点分十进制掩码和CIDR转换
  const handleDotToCidr = () => {
    const result = dotToCidr(dotMask);
    if (result) {
      setCidrMask(result);
    }
  };

  const handleCidrToDot = () => {
    const result = cidrToDot(cidrMask);
    if (result) {
      setDotMask(result);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 pb-10"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">子网掩码计算器</h1>
        <p className="text-gray-600 dark:text-gray-300">
          快速计算IP地址的子网掩码、网络地址、广播地址及可用IP范围。支持多种格式转换与计算。
        </p>
      </div>

      {/* 主要计算器 */}
      <CollapsiblePanel
        title="网络和IP地址计算器"
        icon={<ServerIcon className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 输入区域 */}
          <div className="bg-white/10 dark:bg-gray-800/40 backdrop-blur-xl rounded-xl border border-white/10 dark:border-gray-700/30 p-5">
            <SectionTitle
              title="输入参数"
              icon={<ServerIcon className="w-5 h-5" />}
            />

            <div className="mb-6">
              <div className="mb-2 text-sm text-gray-700 dark:text-gray-300">输入IP地址</div>
              <div className="flex items-center gap-1 mb-4">
                <InputField label="第一段" value={octet1} onChange={setOctet1} />
                <span className="text-gray-500">.</span>
                <InputField label="第二段" value={octet2} onChange={setOctet2} />
                <span className="text-gray-500">.</span>
                <InputField label="第三段" value={octet3} onChange={setOctet3} />
                <span className="text-gray-500">.</span>
                <InputField label="第四段" value={octet4} onChange={setOctet4} />
              </div>

              <div className="mb-4">
                <div className="mb-2 text-sm text-gray-700 dark:text-gray-300">输入子网掩码长度</div>
                <div className="flex items-center">
                  <InputField
                    label="掩码位数"
                    value={maskBits}
                    onChange={setMaskBits}
                    maxLength={2}
                  />
                  <span className="ml-2 text-gray-500">/</span>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button type="primary" onClick={calculateAll}>计算</Button>
                <Button type="secondary" onClick={handleReset}>
                  <div className="flex items-center gap-1">
                    <ArrowPathIcon className="w-4 h-4" />
                    <span>重置</span>
                  </div>
                </Button>
              </div>
            </div>

            <InfoTip>
              子网掩码用于确定IP地址的网络部分和主机部分。例如，掩码长度为24位（255.255.255.0）时，前24位是网络部分。
            </InfoTip>
          </div>

          {/* 结果区域 */}
          <div className="bg-white/10 dark:bg-gray-800/40 backdrop-blur-xl rounded-xl border border-white/10 dark:border-gray-700/30 p-5">
            <SectionTitle title="计算结果" />

            <div className="space-y-1">
              <ResultDisplay label="子网掩码" value={subnetMask} />
              <ResultDisplay label="网络地址" value={networkAddress} />
              <ResultDisplay label="广播地址" value={broadcastAddress} />
              <ResultDisplay label="IP地址范围" value={`${firstUsableIp} - ${lastUsableIp}`} />
              <ResultDisplay label="可用IP数量" value={usableHosts} />
              <ResultDisplay label="总IP数量" value={totalHosts} />
              <ResultDisplay label="IP地址类别" value={ipClass} />
              <ResultDisplay label="通配符掩码" value={wildcardMask} />
              <ResultDisplay label="二进制掩码" value={binaryMask} />
              <ResultDisplay label="十六进制掩码" value={hexMask} />
            </div>
          </div>
        </div>
      </CollapsiblePanel>

      {/* 子网掩码转换器 */}
      <CollapsiblePanel
        title="子网掩码转换器"
        icon={<ArrowPathRoundedSquareIcon className="w-5 h-5" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 点分十进制转CIDR */}
          <div className="bg-white/10 dark:bg-gray-800/40 backdrop-blur-xl rounded-xl border border-white/10 dark:border-gray-700/30 p-5">
            <SectionTitle title="点分十进制转CIDR" />

            <div className="mb-4">
              <InputField
                label="掩码格式"
                value={dotMask}
                onChange={setDotMask}
                maxLength={15}
                width="w-40"
              />
              <div className="mt-4">
                <Button type="primary" onClick={handleDotToCidr}>转换</Button>
              </div>
            </div>

            <div className="mt-4">
              <ResultDisplay label="CIDR位数" value={cidrMask} />
            </div>
          </div>

          {/* CIDR转点分十进制 */}
          <div className="bg-white/10 dark:bg-gray-800/40 backdrop-blur-xl rounded-xl border border-white/10 dark:border-gray-700/30 p-5">
            <SectionTitle title="CIDR转点分十进制" />

            <div className="mb-4">
              <InputField
                label="CIDR位数"
                value={cidrMask}
                onChange={setCidrMask}
                maxLength={2}
                width="w-20"
              />
              <div className="mt-4">
                <Button type="primary" onClick={handleCidrToDot}>转换</Button>
              </div>
            </div>

            <div className="mt-4">
              <ResultDisplay label="点分十进制" value={dotMask} />
            </div>
          </div>
        </div>
      </CollapsiblePanel>
    </motion.div>
  );
};

export default SubnetCalculator;