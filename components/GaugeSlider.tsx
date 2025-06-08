import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Animated,
  Easing,
  Image,
  StyleSheet,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

interface GaugeSliderProps {
  size: number;
  strokeWidth: number;
  trackColor: string;
  filledColor: string;
  thumbColor: string;
  thumbSize: number;
  value?: number;                            // initial value
  onValueChange?: (value: number) => void;
  min?: number;                              // default 0
  max?: number;                              // default 100
  step?: number;                             // default 1
  arcStartAngle?: number;                    // default 150
  arcSweepAngle?: number;                    // default 240
  tier?: number;
  disabled?: boolean
}

export const GaugeSlider: React.FC<GaugeSliderProps> = ({
  size,
  strokeWidth,
  trackColor,
  filledColor,
  thumbColor,
  thumbSize,
  value = 0,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  arcStartAngle = 150,
  arcSweepAngle = 240,
  tier,
  disabled
}) => {

  const tiers = [
    require('@/assets/pngs/message.png'),
    require('@/assets/pngs/gift-box.png'),
    require('@/assets/pngs/gift.png')
  ]

  // Animations for the little circles
  const circle1Anim = useRef(new Animated.Value(0)).current;
  const circle3Anim = useRef(new Animated.Value(0)).current;
  const circle0Scale = useRef(new Animated.Value(1)).current;
  const circle2Scale = useRef(new Animated.Value(1)).current;

  // Internal state: the current "snapped" value (integer)
  const [currentValue, setCurrentValue] = useState(
    clampAndSnap(value, min, max, step),
  );

  // Compute the angle that corresponds to currentValue
  const valueRatio = (currentValue - min) / (max - min);
  const angle = arcStartAngle + valueRatio * arcSweepAngle;

  // Helpers
  function clampAndSnap(
    raw: number,
    min: number,
    max: number,
    step: number,
  ) {
    const clamped = Math.min(Math.max(raw, min), max);
    // snap to nearest step
    return Math.round(clamped / step) * step;
  }

  const radius = (size - strokeWidth) / 2;
  const center = { x: size / 2, y: size / 2 };

  const polarToCartesian = (angleDeg: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: center.x + radius * Math.cos(rad),
      y: center.y + radius * Math.sin(rad),
    };
  };

  const describeArc = (endAngle: number) => {
    const start = polarToCartesian(arcStartAngle);
    const end = polarToCartesian(endAngle);
    const diff = (endAngle - arcStartAngle + 360) % 360;
    const largeArcFlag = diff <= 180 ? '0' : '1';
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
  };

  // translation oscillation for circle1 & circle3
  const startTranslationOsc = (anim: Animated.Value, delay = 0) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
          delay,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  // scale oscillation for circle0 & circle2
  const startScaleOsc = (anim: Animated.Value, delay = 0) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1.2,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
          delay,
        }),
        Animated.timing(anim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    // start “dance” animations out of phase
    startTranslationOsc(circle1Anim, 0);
    startTranslationOsc(circle3Anim, 400);
    startScaleOsc(circle0Scale, 0);
    startScaleOsc(circle2Scale, 400);
  }, []);

  const circle1TranslateX = circle1Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-4, 4],
  });
  const circle3TranslateX = circle3Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -4],
  });

  // PanResponder sits on an invisible full-size overlay
  const panResponder = useRef(
  PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled,
    onMoveShouldSetPanResponder: () => !disabled,
    onPanResponderMove: (
      e: GestureResponderEvent,
      _g: PanResponderGestureState,
    ) => {
      if (disabled) return;
      const { locationX, locationY } = e.nativeEvent;
      const dx = locationX - center.x;
      const dy = locationY - center.y;
      let theta = (Math.atan2(dy, dx) * 180) / Math.PI;
      if (theta < 0) theta += 360;
      const delta = (theta - arcStartAngle + 360) % 360;
      if (delta <= arcSweepAngle) {
        const rawVal = min + (delta / arcSweepAngle) * (max - min);
        const snapped = clampAndSnap(rawVal, min, max, step);
        if (snapped !== currentValue) {
          setCurrentValue(snapped);
          onValueChange?.(snapped);
        }
      }
    },
  })
).current;


  // if parent ever changes the `value` prop, snap & update
  useEffect(() => {
    const v = clampAndSnap(value, min, max, step);
    if (v !== currentValue) setCurrentValue(v);
  }, [value, min, max, step]);

  return (
    <View style={{ width: size + thumbSize, height: size + thumbSize, position: 'relative' }}>
      {/* invisible touch surface */}
      <View
        {...panResponder.panHandlers}
        style={{
          position: 'absolute',
          width: size + thumbSize,
          height: size + thumbSize,
          zIndex: 1,
        }}
      />

      <Svg
        width={size + thumbSize}
        height={size + thumbSize}
        viewBox={`-${thumbSize / 2} -${thumbSize / 2} ${size + thumbSize} ${size + thumbSize}`}
      >
        {/* track */}
        <Path
          d={describeArc(arcStartAngle + arcSweepAngle)}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        {/* filled */}
        <Path
          d={describeArc(angle)}
          stroke={filledColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        {/* thumb */}
        {(() => {
          const { x, y } = polarToCartesian(angle);
          return <Circle cx={x} cy={y} r={thumbSize / 2} fill={thumbColor} />;
        })()}
      </Svg>

      {/* center “gift” with dancing circles */}
      <View
        style={{
          position: 'absolute',
          top: (size + thumbSize) / 2 - 40,
          left: (size + thumbSize) / 2 - 40,
        }}
      >
        <View style={[styles.circle, {backgroundColor: value === max ? '#FFE3CE' : '#E8ECF1'}]}>
          <Image source={tiers[tier ? tier : 0]} style={styles.image} />
          <Animated.View
            style={[styles.circle0, { transform: [{ scale: circle0Scale }], backgroundColor: value === max ? '#FFE3CE' : '#E8ECF1' }]}
          />
          <Animated.View
            style={[styles.circle1, { transform: [{ translateX: circle1TranslateX }], backgroundColor: value === max ? '#FFE3CE' : '#E8ECF1' }]}
          />
          <Animated.View
            style={[styles.circle2, { transform: [{ scale: circle2Scale }], backgroundColor: value === max ? '#FFE3CE' : '#E8ECF1' }]}
          />
          <Animated.View
            style={[styles.circle3, { transform: [{ translateX: circle3TranslateX }], backgroundColor: value === max ? '#FFE3CE' : '#E8ECF1' }]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: '#E8ECF1',
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    height: 58,
    width: 58,
    marginTop: 10,
    resizeMode: 'contain',
    zIndex: 200
  },
  circle0: {
    backgroundColor: '#E8ECF1',
    height: 20,
    width: 20,
    borderRadius: 10,
    position: 'absolute',
    right: -8,
    top: 8,
  },
  circle1: {
    backgroundColor: '#E8ECF1',
    height: 14,
    width: 14,
    borderRadius: 7,
    position: 'absolute',
    left: -12,
    top: 4,
  },
  circle2: {
    backgroundColor: '#E8ECF1',
    height: 26,
    width: 26,
    borderRadius: 13,
    position: 'absolute',
    left: -12,
    bottom: 4,
  },
  circle3: {
    backgroundColor: '#E8ECF1',
    height: 14,
    width: 14,
    borderRadius: 7,
    position: 'absolute',
    right: -10,
    bottom: 0,
  }
});
