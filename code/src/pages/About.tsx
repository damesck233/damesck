import { motion } from 'framer-motion';
import {
    CodeBracketIcon,
    HeartIcon,
    ServerIcon,
    CubeTransparentIcon,
    ArrowTopRightOnSquareIcon,
    SparklesIcon,
    ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
    })
};

// ── 数据 ──────────────────────────────────────────────────────────────────────

const techStack = [
    { name: 'React 19', desc: '前端框架', color: 'from-cyan-400/20 to-blue-500/20', dot: 'bg-cyan-400' },
    { name: 'TypeScript', desc: '类型系统', color: 'from-blue-400/20 to-indigo-500/20', dot: 'bg-blue-500' },
    { name: 'Vite', desc: '构建工具', color: 'from-violet-400/20 to-purple-500/20', dot: 'bg-violet-500' },
    { name: 'Tailwind CSS', desc: '样式框架', color: 'from-teal-400/20 to-cyan-500/20', dot: 'bg-teal-400' },
    { name: 'Framer Motion', desc: '动画引擎', color: 'from-pink-400/20 to-rose-500/20', dot: 'bg-pink-400' },
    { name: 'React Router', desc: '路由管理', color: 'from-orange-400/20 to-amber-500/20', dot: 'bg-orange-400' },
    { name: 'Leaflet', desc: '地图渲染', color: 'from-green-400/20 to-emerald-500/20', dot: 'bg-green-400' },
    { name: 'Heroicons', desc: '图标库', color: 'from-slate-400/20 to-gray-500/20', dot: 'bg-slate-400' },
];

const services = [
    {
        name: '苦力怕论坛',
        url: 'https://klpbbs.com',
        desc: '提供头像托管、文件存储及图片 CDN 服务',
        detail: 'user.klpbbs.com / data.klpbbs.com / img.klpz.net',
        color: 'from-green-400/15 to-emerald-500/15 dark:from-green-700/20 dark:to-emerald-800/20',
        border: 'border-green-200/40 dark:border-green-700/30',
        icon: (
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
        ),
    },
    {
        name: 'GitHub',
        url: 'https://github.com/damesck233/damesck',
        desc: '代码托管与版本控制，CI/CD 自动部署',
        detail: 'github.com/damesck233/damesck',
        color: 'from-slate-400/15 to-gray-500/15 dark:from-slate-700/20 dark:to-gray-800/20',
        border: 'border-slate-200/40 dark:border-slate-700/30',
        icon: (
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
            </svg>
        ),
    },
    {
        name: '51.la 网站统计',
        url: 'https://www.51.la',
        desc: '提供网站访问统计与数据分析服务',
        detail: 'www.51.la',
        color: 'from-indigo-400/15 to-blue-500/15 dark:from-indigo-700/20 dark:to-blue-800/20',
        border: 'border-indigo-200/40 dark:border-indigo-700/30',
        icon: (
            <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm2 10h2v2H6v-2zm0-4h2v3H6v-3zm4 2h2v3h-2v-3zm0-4h2v3h-2V9zm4 4h2v3h-2v-3zm0-6h2v5h-2V7z" />
            </svg>
        ),
    },
    {
        name: '飞书',
        url: '',
        desc: '站内消息推送与友链申请通知',
        detail: 'Feishu Webhook Bot',
        color: 'from-teal-400/15 to-cyan-500/15 dark:from-teal-700/20 dark:to-cyan-800/20',
        border: 'border-teal-200/40 dark:border-teal-700/30',
        icon: (
            <img src="https://api.damesck.net/api/svg/blog/Feishu.svg" alt="飞书" className="w-6 h-6" />
        ),
    },
];

const siteInfo = [
    { label: '站点名称', value: "damesck's 小屋" },
    { label: '版本', value: 'Beta v0.0.15' },
    { label: '主题色', value: '#007AFF  (Apple Blue)' },
    { label: '开源协议', value: 'MIT License' },
    { label: '部署方式', value: 'Docker + Nginx' },
    { label: '域名', value: 'damesck.net' },
];

// ── 组件 ──────────────────────────────────────────────────────────────────────

const SectionCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white/40 dark:bg-[#1c1c1e]/60 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-[28px] p-6 ${className}`}>
        {children}
    </div>
);

const SectionTitle = ({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) => (
    <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-white/50 dark:bg-white/10 backdrop-blur-md flex items-center justify-center shadow-sm border border-white/20 dark:border-white/5">
            {icon}
        </div>
        <div>
            <h2 className="text-[18px] font-bold text-[#1d1d1f] dark:text-white leading-none">{title}</h2>
            {subtitle && <p className="text-[12px] text-[#1d1d1f]/50 dark:text-white/50 mt-0.5">{subtitle}</p>}
        </div>
    </div>
);

// ── 页面 ──────────────────────────────────────────────────────────────────────

const About = () => {
    return (
        <div className="max-w-4xl mx-auto px-4">

            {/* ── 页头 ── */}
            <motion.div
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mb-10"
            >
                <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide border border-blue-200/50 dark:border-blue-700/50">
                        ABOUT THIS SITE
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] dark:text-white mb-3">
                    关于本站
                </h1>
                <p className="text-base md:text-lg text-[#6c6c6e] dark:text-gray-400 max-w-xl leading-relaxed">
                    这是 damesck 的个人主页
                </p>
            </motion.div>

            {/* ── 主体网格 ── */}
            <div className="space-y-5">

                {/* 行 1：基本信息 + 开源 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* 站点信息 */}
                    <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
                        <SectionCard className="h-full">
                            <SectionTitle
                                icon={<SparklesIcon className="w-5 h-5 text-[#007aff]" />}
                                title="站点信息"
                                subtitle="Site Info"
                            />
                            <div className="space-y-0">
                                {siteInfo.map((item, idx) => (
                                    <div
                                        key={item.label}
                                        className={`flex items-center justify-between py-3 ${idx < siteInfo.length - 1 ? 'border-b border-black/5 dark:border-white/5' : ''}`}
                                    >
                                        <span className="text-[13px] text-[#1d1d1f]/50 dark:text-white/50">{item.label}</span>
                                        <span className="text-[13px] font-medium text-[#1d1d1f] dark:text-white">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </SectionCard>
                    </motion.div>

                    {/* 开源信息 */}
                    <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
                        <SectionCard className="h-full flex flex-col">
                            <SectionTitle
                                icon={<CodeBracketIcon className="w-5 h-5 text-[#34c759]" />}
                                title="开源信息"
                                subtitle="Open Source"
                            />

                            {/* GitHub Card */}
                            <a
                                href="https://github.com/damesck233/damesck"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-slate-400/10 to-gray-500/10 dark:from-slate-700/20 dark:to-gray-800/20 border border-slate-200/40 dark:border-slate-700/30 hover:border-slate-300/60 dark:hover:border-slate-600/50 transition-all duration-200 hover:shadow-md"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#24292e] dark:bg-white/10 flex items-center justify-center flex-shrink-0 shadow-sm">
                                    <svg className="w-7 h-7 text-white dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[15px] font-bold text-[#1d1d1f] dark:text-white group-hover:text-[#007aff] dark:group-hover:text-blue-400 transition-colors">
                                        damesck233 / damesck
                                    </div>
                                    <div className="text-[12px] text-[#1d1d1f]/50 dark:text-white/50 mt-0.5 truncate">
                                        github.com/damesck233/damesck
                                    </div>
                                </div>
                                <ArrowTopRightOnSquareIcon className="w-4 h-4 text-[#1d1d1f]/30 dark:text-white/30 group-hover:text-[#007aff] transition-colors flex-shrink-0" />
                            </a>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {['MIT License', 'Open Source', 'Self Hosted'].map(tag => (
                                    <span key={tag} className="px-3 py-1 rounded-full bg-[#007AFF]/10 dark:bg-[#007AFF]/15 text-[#007AFF] dark:text-blue-400 text-[12px] font-medium border border-blue-200/30 dark:border-blue-700/30">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <p className="mt-4 text-[13px] text-[#1d1d1f]/50 dark:text-white/50 leading-relaxed">
                                本站代码完全开源，欢迎 Star 或 Fork。如果你喜欢这个设计，请保留 Credit。
                            </p>
                        </SectionCard>
                    </motion.div>
                </div>

                {/* 行 2：技术栈 */}
                <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
                    <SectionCard>
                        <SectionTitle
                            icon={<CubeTransparentIcon className="w-5 h-5 text-violet-500" />}
                            title="技术栈"
                            subtitle="Built With"
                        />
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {techStack.map((tech) => (
                                <div
                                    key={tech.name}
                                    className={`flex items-center gap-2.5 p-3 rounded-2xl bg-gradient-to-br ${tech.color} border border-white/30 dark:border-white/10`}
                                >
                                    <div className={`w-2 h-2 rounded-full ${tech.dot} flex-shrink-0 shadow-sm`} />
                                    <div className="min-w-0">
                                        <div className="text-[13px] font-semibold text-[#1d1d1f] dark:text-white truncate">{tech.name}</div>
                                        <div className="text-[11px] text-[#1d1d1f]/50 dark:text-white/50 truncate">{tech.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </motion.div>

                {/* 行 3：使用的服务 */}
                <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible">
                    <SectionCard>
                        <SectionTitle
                            icon={<ServerIcon className="w-5 h-5 text-orange-500" />}
                            title="使用的服务"
                            subtitle="Powered By"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {services.map((svc) => (
                                <div
                                    key={svc.name}
                                    className={`flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-br ${svc.color} border ${svc.border} transition-all duration-200 hover:shadow-md`}
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white/70 dark:bg-black/20 flex items-center justify-center flex-shrink-0 shadow-sm">
                                        {svc.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[14px] font-bold text-[#1d1d1f] dark:text-white">{svc.name}</span>
                                            {svc.url && (
                                                <a
                                                    href={svc.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#007aff] dark:text-blue-400 hover:opacity-70 transition-opacity"
                                                >
                                                    <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                                                </a>
                                            )}
                                        </div>
                                        <p className="text-[12px] text-[#1d1d1f]/60 dark:text-white/60 mt-0.5 leading-relaxed">{svc.desc}</p>
                                        <p className="text-[11px] text-[#1d1d1f]/35 dark:text-white/35 mt-1 font-mono truncate">{svc.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </motion.div>

                {/* 行 4：声明 */}
                <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible">
                    <SectionCard>
                        <SectionTitle
                            icon={<ShieldCheckIcon className="w-5 h-5 text-[#007aff]" />}
                            title="声明"
                            subtitle="Disclaimer"
                        />
                        <div className="space-y-3 text-[13px] text-[#1d1d1f]/60 dark:text-white/60 leading-relaxed">
                            <p>本站内容均为个人原创，转载请注明出处。</p>
                            <p>本站不存储任何用户数据，访问统计仅供站长参考，不涉及个人隐私。</p>
                            <p>本站使用的第三方服务（GitHub、苦力怕论坛等）均遵循其各自的服务条款与隐私政策。</p>
                        </div>
                    </SectionCard>
                </motion.div>

                {/* 行 5：特别鸣谢 */}
                <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible">
                    <SectionCard>
                        <SectionTitle
                            icon={<HeartIcon className="w-5 h-5 text-red-400" />}
                            title="特别鸣谢"
                            subtitle="Special Thanks"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {/* AI 助手 */}
                            {[
                                { name: 'Claude', desc: 'by Anthropic', color: 'from-orange-400/15 to-amber-400/15 dark:from-orange-700/20 dark:to-amber-700/20', border: 'border-orange-200/40 dark:border-orange-700/30', dot: 'bg-orange-400' },
                                { name: 'ChatGPT', desc: 'by OpenAI', color: 'from-green-400/15 to-emerald-400/15 dark:from-green-700/20 dark:to-emerald-700/20', border: 'border-green-200/40 dark:border-green-700/30', dot: 'bg-green-400' },
                                { name: 'Gemini', desc: 'by Google', color: 'from-blue-400/15 to-indigo-400/15 dark:from-blue-700/20 dark:to-indigo-700/20', border: 'border-blue-200/40 dark:border-blue-700/30', dot: 'bg-blue-400' },
                            ].map(ai => (
                                <div key={ai.name} className={`flex items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-br ${ai.color} border ${ai.border}`}>
                                    <div className={`w-2 h-2 rounded-full ${ai.dot} flex-shrink-0`} />
                                    <div>
                                        <div className="text-[13px] font-semibold text-[#1d1d1f] dark:text-white">{ai.name}</div>
                                        <div className="text-[11px] text-[#1d1d1f]/50 dark:text-white/50">{ai.desc}</div>
                                    </div>
                                </div>
                            ))}
                            {/* GaoNeng-wWw */}
                            <a
                                href="https://github.com/GaoNeng-wWw"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-br from-slate-400/15 to-gray-400/15 dark:from-slate-700/20 dark:to-gray-700/20 border border-slate-200/40 dark:border-slate-700/30 hover:border-slate-300/60 dark:hover:border-slate-600/50 transition-all duration-200"
                            >
                                <div className="w-2 h-2 rounded-full bg-slate-400 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="text-[13px] font-semibold text-[#1d1d1f] dark:text-white group-hover:text-[#007aff] dark:group-hover:text-blue-400 transition-colors">GaoNeng-wWw</div>
                                    <div className="text-[11px] text-[#1d1d1f]/50 dark:text-white/50">github.com/GaoNeng-wWw</div>
                                </div>
                                <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 text-[#1d1d1f]/30 dark:text-white/30 group-hover:text-[#007aff] transition-colors flex-shrink-0" />
                            </a>
                        </div>
                    </SectionCard>
                </motion.div>

                {/* 行 6：底部致谢 */}
                <motion.div custom={7} variants={fadeUp} initial="hidden" animate="visible">
                    <div className="flex items-center justify-center gap-2 py-4 text-[13px] text-[#1d1d1f]/40 dark:text-white/40">
                        <span>Made with</span>
                        <HeartIcon className="w-4 h-4 text-red-400" />
                        <span>by</span>
                        <a
                            href="https://damesck.net"
                            className="text-[#007aff] dark:text-blue-400 font-medium hover:opacity-70 transition-opacity"
                        >
                            damesck
                        </a>
                        <span>· 致不完美的明天</span>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default About;
