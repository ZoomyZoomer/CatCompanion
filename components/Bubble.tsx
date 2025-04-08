import React, { useEffect, useRef } from "react";
import { Animated, ViewStyle } from "react-native";

type BubbleProps = {
  id: number;
  side: 'left' | 'right';
  onComplete: (id: number) => void;
};

const Bubble: React.FC<BubbleProps> = ({ id, side, onComplete }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  const size = Math.floor(Math.random() * 12) + 8;
  const horizontalOffset = Math.floor(Math.random() * 40) + 10;
  const drift = side === 'left' ? -10 : 10;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -150,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: drift,
        duration: 3000,
        useNativeDriver: true,
      }),
    ]).start(() => onComplete(id));
  }, []);

  const style: Animated.WithAnimatedObject<ViewStyle> = {
    position: 'absolute',
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: 'white',
    opacity,
    transform: [{ translateY }, { translateX }],
    bottom: 0,
    ...(side === 'left' ? { left: -horizontalOffset } : { right: -horizontalOffset }),
  };

  return <Animated.View style={style} />;
};

export default Bubble;
