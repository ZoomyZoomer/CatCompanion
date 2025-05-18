import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";

const Item = ({ image_source, quantity, activeItem, setActiveItem }: any) => {
  
  const scaleAnim = useSharedValue(1);

  const handlePress = () => {
    setActiveItem((prev : any) => !prev);

    // Run popup animation with Reanimated
    scaleAnim.value = withSequence(
      withTiming(1.1, { duration: 150 }),
      withTiming(1, { duration: 150 })
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleAnim.value }]
    };
  });

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Animated.View
        style={[
          activeItem ? styles.item_active : styles.item_container,
          animatedStyle
        ]}
      >
        <Image source={image_source} style={styles.image} />
        <Animated.View style={styles.quant}>
          <Text style={{ color: 'white', fontWeight: '500' }}>{`${quantity}x`}</Text>
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  item_container: {
    borderColor: '#CDD8EA',
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#FCFCFC',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  item_active: {
    borderColor: '#FCAD72',
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: 'white',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  image: {
    height: 54,
    width: 54,
    resizeMode: 'contain',
  },
  quant: {
    position: 'absolute',
    backgroundColor: '#FCAD72',
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    right: -12,
    bottom: -8
  }
});
