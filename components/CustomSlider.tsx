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
  maximumValue = 1,
  step = 0.01,
  trackHeight = 4,
  thumbSize = 20,
  trackColor = '#ddd',
  minimumTrackColor = '#FCAD72',
  thumbColor = '#FCAD72',
  style,
}: CustomSliderProps) {
  const pan = useRef(new Animated.Value(0)).current;
  const trackWidth = useRef(0);
  const [internalValue, setInternalValue] = useState(value);
  const [filledTrackWidth, setFilledTrackWidth] = useState(0); // Store filled track width

  // Whenever `value` prop changes from outside, sync thumb position
  useEffect(() => {
    if (trackWidth.current > 0) {
      const percent = (value - minimumValue) / (maximumValue - minimumValue);
      Animated.timing(pan, {
        toValue: percent * trackWidth.current,
        useNativeDriver: false,
      }).start();
      setInternalValue(value);
      setFilledTrackWidth(percent * trackWidth.current); // Set the initial filled track width
    }
  }, [value]);

  // Handle layout to get track width
  const onTrackLayout = (e: LayoutChangeEvent) => {
    trackWidth.current = e.nativeEvent.layout.width;
    // sync initial
    const percent = (value - minimumValue) / (maximumValue - minimumValue);
    pan.setValue(percent * trackWidth.current);
    setFilledTrackWidth(percent * trackWidth.current); // Update filled track width
  };

  // PanResponder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset((pan as any)._value);
        pan.setValue(0);
      },
      onPanResponderMove: (_: GestureResponderEvent, gs: PanResponderGestureState) => {
        let newX = gs.dx + (pan as any)._offset;
        // clamp
        newX = Math.max(0, Math.min(newX, trackWidth.current));
        pan.setValue(newX - (pan as any)._offset);
        // compute value
        const percent = newX / trackWidth.current;
        let newVal = minimumValue + percent * (maximumValue - minimumValue);
        // snap to step
        newVal = Math.round(newVal / step) * step;
        setInternalValue(newVal);
        onValueChange(newVal);
        setFilledTrackWidth(newX); // Update the filled track width during movement
      },
      onPanResponderRelease: () => {
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
          width: filledTrackWidth, // Use the filled track width state
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
