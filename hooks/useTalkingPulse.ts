// hooks/useTalkingPulse.ts
import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const useTalkingPulse = (isTalking: boolean, durationMs: number = 2000) => {
    const pulseScale = useRef(new Animated.Value(1)).current;
    const pulseRotate = useRef(new Animated.Value(0)).current;
    const pulseLoopRef = useRef<Animated.CompositeAnimation | null>(null);

    useEffect(() => {
        if (isTalking) {
            const loop = Animated.loop(
                Animated.parallel([
                    Animated.sequence([
                        Animated.timing(pulseScale, {
                            toValue: 1.1,
                            duration: 100,
                            easing: Easing.inOut(Easing.ease),
                            useNativeDriver: true,
                        }),
                        Animated.timing(pulseScale, {
                            toValue: 1,
                            duration: 100,
                            easing: Easing.inOut(Easing.ease),
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.sequence([
                        Animated.timing(pulseRotate, {
                            toValue: 1,
                            duration: 100,
                            easing: Easing.inOut(Easing.ease),
                            useNativeDriver: true,
                        }),
                        Animated.timing(pulseRotate, {
                            toValue: 0,
                            duration: 100,
                            easing: Easing.inOut(Easing.ease),
                            useNativeDriver: true,
                        }),
                    ]),
                ])
            );

            loop.start();
            pulseLoopRef.current = loop;

            // Stop after durationMs
            const timeoutId = setTimeout(() => {
                loop.stop();
                pulseScale.setValue(1);
                pulseRotate.setValue(0);
            }, durationMs);

            return () => {
                loop.stop();
                clearTimeout(timeoutId);
            };
        } else {
            // Reset animations immediately when not talking
            pulseLoopRef.current?.stop();
            pulseScale.setValue(1);
            pulseRotate.setValue(0.5);
        }
    }, [isTalking]);

    const rotateInterpolate = pulseRotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['-3deg', '3deg'],
    });

    return {
        transform: [
            { scale: pulseScale },
            { rotate: rotateInterpolate },
        ],
    };
};
