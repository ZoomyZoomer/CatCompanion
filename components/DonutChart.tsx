import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming } from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircleProgressProps {
  size: number;              // diameter of chart
  strokeWidth: number;       // width of track/fill stroke
  percentage: number;        // 0 to 100
  trackColor?: string;       // background circle color
  fillColor?: string;        // progressing arc color
  duration?: number;         // animation duration in ms
}

export default function CircleProgress({
  size,
  strokeWidth,
  percentage,
  trackColor = '#e6e6e6',
  fillColor = '#3b5998',
  duration = 500,
}: CircleProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = useSharedValue(0);

  useEffect(() => {
    // animate progress from current to new percentage
    progress.value = withTiming(percentage, { duration });
  }, [percentage]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value / 100),
  }));

  return (
    <View style={[styles.container, { width: size, height: size }]}>  
      <Svg width={size} height={size}>
        {/* Track circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={fillColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
