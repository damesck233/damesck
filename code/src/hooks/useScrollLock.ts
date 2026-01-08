import { useCallback } from 'react';
import { OverlayScrollbars } from 'overlayscrollbars';

export const useScrollLock = () => {
    const lockScroll = useCallback(() => {
        const osInstance = OverlayScrollbars(document.body);
        if (osInstance) {
            osInstance.options({ overflow: { y: 'hidden' } });
        } else {
            // Lock body and html
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden'; // Important for some browsers
        }
    }, []);

    const unlockScroll = useCallback(() => {
        const osInstance = OverlayScrollbars(document.body);
        if (osInstance) {
            osInstance.options({ overflow: { y: 'scroll' } });
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
    }, []);

    return { lockScroll, unlockScroll };
};
