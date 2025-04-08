import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const GrowingCircle = () => {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 1250, // Change this for different speed
      useNativeDriver: true,
    }).start();
  }, []);

  const { width, height } = Dimensions.get('window');
  const maxSize = Math.max(width, height) * 1.1; // Increase by 10%

  const size = scale.interpolate({
    inputRange: [0, 1],
    outputRange: [50, maxSize], // Starts at 50 and grows to 10% larger than screen
  });

  const position = {
    top: height / 2 - (size.interpolate({
      inputRange: [0, maxSize],
      outputRange: [25, maxSize / 2], // Half the final size for centering
    }) as any) / 2,
    left: width / 2 - (size.interpolate({
      inputRange: [0, maxSize],
      outputRange: [25, maxSize / 2], // Half the final size for centering
    }) as any) / 2,
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size.interpolate({
              inputRange: [0, maxSize],
              outputRange: [25, maxSize / 2], // Keep the circle's roundness
            }),
            position: 'absolute',
            top: position.top,
            left: position.left,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 999
  },
  circle: {
    backgroundColor: '#FCAD72', // Change to any color you like
  },
});

export default GrowingCircle;
