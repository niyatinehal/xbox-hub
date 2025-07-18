import { useEffect, useRef } from 'react';

export function useGamepad(onButtonPress: (buttonIndex: number) => void) {
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const pollGamepad = () => {
            const gamepads = navigator.getGamepads();
            if (!gamepads) return;

            for (const gp of gamepads) {
                if (!gp) continue;

                gp.buttons.forEach((btn, index) => {
                    if (btn.pressed) {
                        onButtonPress(index);
                    }
                });
            }

            animationRef.current = requestAnimationFrame(pollGamepad);
        };

        animationRef.current = requestAnimationFrame(pollGamepad);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [onButtonPress]);
}
