import { useState, useEffect } from 'react';

export const usePerformanceMotion = () => {
    const [enableMorph, setEnableMorph] = useState(true);

    useEffect(() => {
        const checkPerformance = () => {
            const ua = navigator.userAgent;

            // 1. Detect Android devices (often struggle with heavy glassmorphism morphs)
            const isAndroid = /Android/i.test(ua);

            // 2. Detect generic mobile devices (optional, but safer for complex effects)
            const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);

            // 3. Detect hardware concurrency (Low core count = likely older device)
            // Default to 8 (optimistic) if not supported
            const concurrency = navigator.hardwareConcurrency || 8;
            const isLowSpec = concurrency <= 4;

            // Strategy: 
            // - Always disable on Android (fragmented hardware, often laggy with backdrop-filter)
            // - Disable on Low Spec devices (<= 4 cores)
            if (isAndroid || isLowSpec) {
                setEnableMorph(false);
                console.log('Performance Mode: Reduced Motion Enabled (Morph Disabled)');
            } else {
                setEnableMorph(true);
            }
        };

        checkPerformance();
    }, []);

    return { enableMorph };
};
