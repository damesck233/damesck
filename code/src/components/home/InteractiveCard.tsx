import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';
import { useTiltPress } from '../../hooks/useTiltPress';
import { usePerformanceMode } from '../../contexts/PerformanceContext';
import { cardEntrance, entranceDelay, settleSpring, hoverSpring, tapSpring } from './cardMotion';

interface InteractiveCardProps {
    /** 入场交错顺序（0 起） */
    index: number;
    /** 外层网格尺寸类：col-span / aspect / 高度等 */
    className?: string;
    /** 内层卡片外观补充类 */
    innerClassName?: string;
    layoutId?: string;
    /** 模态框打开期间隐藏卡片 */
    hidden?: boolean;
    /** 模态框关闭动画进行中，卡片保持不可交互 */
    closing?: boolean;
    onClick?: () => void;
    children: ReactNode;
}

/**
 * 首页卡片统一交互包装：
 * - 外层负责一次性的交错入场动画（不参与 layout morph，避免状态互相干扰）
 * - 内层负责 layoutId Morph、悬停/按压弹簧、点按倾斜
 * - 低性能模式或系统"减弱动态效果"时：跳过入场、倾斜与悬停缩放
 */
const InteractiveCard = ({
    index,
    className = '',
    innerClassName = '',
    layoutId,
    hidden = false,
    closing = false,
    onClick,
    children,
}: InteractiveCardProps) => {
    const { isLowPerf } = usePerformanceMode();
    const prefersReduced = useReducedMotion();
    const reduceMotion = isLowPerf || !!prefersReduced;

    const { tiltStyle, onPointerDown, onPointerUp, onPointerLeave } = useTiltPress();
    const isSuppressed = hidden || closing;
    const interactive = !isSuppressed && !!onClick;

    // 入场结束后翻转：opacity 的过渡参数从"入场淡入"切换为"模态框显隐"
    const enteredRef = useRef(reduceMotion);
    useEffect(() => {
        const t = setTimeout(() => { enteredRef.current = true; }, (entranceDelay(index) + 0.6) * 1000);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <motion.div
            className={className}
            custom={index}
            variants={cardEntrance}
            initial={reduceMotion ? false : 'hidden'}
            animate="visible"
        >
            <motion.div
                layoutId={layoutId}
                className={`w-full h-full group relative z-10 overflow-hidden rounded-[32px] bg-white/40 dark:bg-[#1c1c1e]/60 backdrop-blur-xl transition-colors duration-300 ${interactive ? 'cursor-pointer' : ''} ${isSuppressed ? 'pointer-events-none' : ''} ${innerClassName}`}
                // 注意：animate 必须保留 —— 关闭时它触发投影动画，
                // 去掉后模态框卸载时卡片会冻结在模态框的位置上。
                // 入场淡入也放在这个元素自己身上：元素自身 opacity 会连同
                // backdrop-filter 一起平滑淡入；若放在子层，Chrome 对毛玻璃
                // 内部的 opacity 动画不逐帧渲染，内容会在结束时突然跳出
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: hidden ? 0 : 1 }}
                transition={{
                    ...settleSpring,
                    // 淡出时长与 morph 弹簧（~0.4s）同步：过快会让卡片表面提前消失，
                    // 露出半透明空档造成展开中的视觉闪烁
                    opacity: !enteredRef.current
                        ? { duration: 0.45, ease: 'easeOut', delay: entranceDelay(index) }
                        : hidden
                            ? { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                            : { duration: 0.25, ease: 'easeOut' },
                }}
                onClick={interactive ? onClick : undefined}
                // 手势始终保持注册：挂起期间靠 pointer-events-none 阻止新交互。
                // 若在悬停中把 whileHover 置为 undefined，scale 会被冻结在 1.02；
                // 挂起时把目标归零，避免指针停在卡片区域时手势缩放与回位动画叠加
                whileHover={reduceMotion ? undefined : { scale: isSuppressed ? 1 : 1.02, transition: hoverSpring }}
                whileTap={reduceMotion ? undefined : { scale: isSuppressed ? 1 : 0.97, transition: tapSpring }}
                style={reduceMotion ? undefined : tiltStyle}
                onPointerDown={reduceMotion ? undefined : onPointerDown}
                onPointerUp={reduceMotion ? undefined : onPointerUp}
                onPointerLeave={reduceMotion ? undefined : onPointerLeave}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export default InteractiveCard;
