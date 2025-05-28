import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  PanResponder,
  Animated,
  StyleSheet,
  LayoutChangeEvent,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

interface CustomSliderProps {
  value: number;
  onValueChange: (val: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  trackHeight?: number;
  thumbSize?: number;
  trackColor?: string;
  minimumTrackColor?: string;
  thumbColor?: string;
  style?: any;
}

export default function CustomSlider({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue,
  step = 1,
  trackHeight = 18,
  thumbSize = 28,
  trackColor = '#F1F1F1',
  minimumTrackColor = '#FCAD72',
  thumbColor = '#FCAD72',
  style,
}: CustomSliderProps) {
  const pan = useRef(new Animated.Value(0)).current;
  const trackWidth = useRef(0);
  const currentX = useRef(0); // This is the key part

  // Whenever `value` prop changes from outside, sync thumb position
  const syncPosition = (val: number) => {
    const percent = (val - minimumValue) / (maximumValue - minimumValue);
    const newX = percent * trackWidth.current;
    pan.setValue(newX);
    currentX.current = newX;
  };

  useEffect(() => {
    if (trackWidth.current > 0) {
      syncPosition(value);
    }
  }, [value]);

  const onTrackLayout = (e: LayoutChangeEvent) => {
    trackWidth.current = e.nativeEvent.layout.width;
    syncPosition(value);
  };

  const startX = useRef(0); // add this to track starting thumb X on gesture start

// PanResponder
const panResponder = useRef(
  PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.stopAnimation();
      startX.current = currentX.current; // record position at gesture start
    },
    onPanResponderMove: (_: GestureResponderEvent, gs: PanResponderGestureState) => {
      let newX = startX.current + gs.dx;
      newX = Math.max(0, Math.min(newX, trackWidth.current));
      pan.setValue(newX);

      const percent = newX / trackWidth.current;
      let newVal = minimumValue + percent * (maximumValue - minimumValue);
      newVal = Math.round(newVal / step) * step;
      onValueChange(newVal);
    },
    onPanResponderRelease: (_: GestureResponderEvent, gs: PanResponderGestureState) => {
      let finalX = startX.current + gs.dx;
      finalX = Math.max(0, Math.min(finalX, trackWidth.current));
      currentX.current = finalX; // commit new position
      pan.flattenOffset();
    },
  })
).current;


  return (
    <View style={[{ height: Math.max(thumbSize, trackHeight) }, style]}>
      {/* full track */}
      <View
        style={{
          position: 'absolute',
          height: trackHeight,
          backgroundColor: trackColor,
          left: thumbSize / 2,
          right: thumbSize / 2,
          top: (thumbSize - trackHeight) / 2,
          borderRadius: trackHeight / 2,
        }}
        onLayout={onTrackLayout}
      />
      {/* filled track */}
      <Animated.View
        style={{
          position: 'absolute',
          height: trackHeight,
          backgroundColor: minimumTrackColor,
          left: thumbSize / 2,
          top: (thumbSize - trackHeight) / 2,
          borderRadius: trackHeight / 2,
          width: pan, // <- direct animated value for filled track
        }}
      />
      {/* thumb */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          {
            position: 'absolute',
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            backgroundColor: thumbColor,
            justifyContent: 'center',
            alignItems: 'center',
            left: Animated.add(pan, new Animated.Value(0)),
            top: 0,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
