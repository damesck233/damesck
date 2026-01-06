import { useCallback } from 'react';
import { OverlayScrollbars } from 'overlayscrollbars';

export const useScrollLock = () => {
    const lockScroll = useCallback(() => {
        const osInstance = OverlayScrollbars(document.body);
        if (osInstance) {
            // Lock scrolling by modifying the overflow options
            osInstance.options({ overflow: { y: 'hidden' } });
        } else {
            // Fallback for native scroll locking
            document.body.style.overflow = 'hidden';
        }
    }, []);

    const unlockScroll = useCallback(() => {
        const osInstance = OverlayScrollbars(document.body);
        if (osInstance) {
            // Restore scrolling
            osInstance.options({ overflow: { y: 'scroll' } });
        } else {
            // Fallback
            document.body.style.overflow = '';
        }
    }, []);

    return { lockScroll, unlockScroll };
};
