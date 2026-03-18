import { useMotionValue, useSpring } from 'framer-motion';
import type { PointerEvent } from 'react';

export function useTiltPress(maxAngle = 7) {
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    const springX = useSpring(rotateX, { stiffness: 500, damping: 30 });
    const springY = useSpring(rotateY, { stiffness: 500, damping: 30 });

    const onPointerDown = (e: PointerEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        rotateY.set(relX * maxAngle);
        rotateX.set(-relY * maxAngle);
    };

    const reset = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    return {
        tiltStyle: { transformPerspective: 800, rotateX: springX, rotateY: springY } as const,
        onPointerDown,
        onPointerUp: reset,
        onPointerLeave: reset,
    };
}
