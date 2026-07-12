import type { Transition, Variants } from 'framer-motion';

// 首页卡片统一动画参数（iOS 风格弹簧）
// 所有卡片与模态框共用同一组弹簧，保证展开/收起手感一致

// 卡片 → 模态框展开弹簧（模态框侧使用，保留轻微弹性）
export const morphSpring: Transition = {
    type: 'spring',
    stiffness: 300,
    damping: 32,
    mass: 0.9,
};

// 模态框 → 卡片回位弹簧（卡片侧使用）
// 临界阻尼：收回时不缩过头再弹回。Profile 卡与模态框尺寸差最大，
// 欠阻尼弹簧在它身上会出现明显的"缩进去再弹回"
export const settleSpring: Transition = {
    type: 'spring',
    stiffness: 340,
    damping: 36,
    mass: 0.9,
};

// 悬停 / 按压的快速响应弹簧
export const hoverSpring: Transition = {
    type: 'spring',
    stiffness: 420,
    damping: 28,
    mass: 0.7,
};

export const tapSpring: Transition = {
    type: 'spring',
    stiffness: 550,
    damping: 32,
    mass: 0.6,
};

// 入场弹簧：轻微上浮 + 缩放，无明显回弹
const entranceSpring: Transition = {
    type: 'spring',
    stiffness: 230,
    damping: 26,
    mass: 0.9,
};

const STAGGER = 0.07;
const BASE_DELAY = 0.08;

export const entranceDelay = (index: number) => BASE_DELAY + index * STAGGER;

// 卡片入场变体：custom 传卡片序号，依次交错出现。
// 只做 transform，不动 opacity —— 祖先 opacity < 1 会让 Chrome 禁用
// 子树里的 backdrop-filter，毛玻璃要等入场结束才突然出现。
// 淡入效果由 InteractiveCard 内的内容层单独承担。
export const cardEntrance: Variants = {
    hidden: { y: 28, scale: 0.96 },
    visible: (index: number = 0) => ({
        y: 0,
        scale: 1,
        transition: {
            ...entranceSpring,
            delay: entranceDelay(index),
        },
    }),
};
