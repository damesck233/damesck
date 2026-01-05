export const iosCardStyle = {
    backgroundColor: 'var(--card-bg)',
    borderRadius: '20px',
    boxShadow: '0 4px 16px var(--glass-shadow), 0 2px 4px rgba(0,0,0,0.04)',
    overflow: 'hidden',
    transition: 'all 0.3s ease-out',
    border: '1px solid var(--card-border)'
};

// 毛玻璃标题区域样式
export const cardHeaderStyle = {
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

// 卡片内容区域样式
export const cardBodyStyle = {
    backgroundColor: 'var(--card-bg)',
    padding: '16px 20px',
    backdropFilter: 'blur(8px)',
    color: 'var(--text-primary)'
};

// 鼠标悬停时的放大效果
export const hoverStyle = {
    transform: 'scale(1.03)',
    boxShadow: '0 8px 24px var(--glass-shadow), 0 4px 8px rgba(0,0,0,0.06)'
};

// 简单的淡入变体
export const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            delay: custom * 0.1 // 简单的延迟，使卡片依次出现
        }
    })
};
