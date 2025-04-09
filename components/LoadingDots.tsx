import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const LoadingDots = () => {
  const [position, setPosition] = useState([
    new Animated.Value(-5), // Left dot starting position
    new Animated.Value(0),   // Middle dot starting position
    new Animated.Value(5),  // Right dot starting position
  ]);

  const [scale, setScale] = useState([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
  ]);

  const [shouldAnimateScale, setShouldAnimateScale] = useState(true);
  const [lineHeight, setLineHeight] = useState(new Animated.Value(0)); // Line height state

  useEffect(() => {
    const animateDots = () => {
      // If scaling should be active, animate scaling
      if (shouldAnimateScale) {
        const scaleAnimation = [
          Animated.sequence([
            Animated.timing(scale[0], {
              toValue: 1.5, // Expand left dot
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(scale[0], {
              toValue: 1, // Contract left dot back
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(scale[1], {
              toValue: 1.5, // Expand middle dot
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(scale[1], {
              toValue: 1, // Contract middle dot back
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(scale[2], {
              toValue: 1.5, // Expand right dot
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(scale[2], {
              toValue: 1, // Contract right dot back
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
        ];

        // Start the scaling loop
        Animated.stagger(500, scaleAnimation).start();
      }

      // After 2 seconds, begin the convergence animation
      setTimeout(() => {
        // Animate the left and right dots towards the center
        const positionAnimation = [
          Animated.timing(position[0], {
            toValue: 14.5, // Move the left dot to the middle
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(position[2], {
            toValue: -14.5, // Move the right dot to the middle
            duration: 300,
            useNativeDriver: true,
          }),
        ];

        // Stop the scaling animation and set the flag to false
        setShouldAnimateScale(false);

        // Run the position animation (convergence)
        Animated.parallel(positionAnimation).start();

        // After the convergence animation completes, start the line expansion
        setTimeout(() => {
          Animated.timing(lineHeight, {
            toValue: 50, // The line height expands
            duration: 300,
            useNativeDriver: false, // Height can't be animated with native driver
          }).start();
        }, 300); // Delay to make sure the convergence animation completes first
      }, 2000); // Delay the convergence animation by 2 seconds
    };

    animateDots();
  }, [position, scale, shouldAnimateScale, lineHeight]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.dot,
          {
            transform: [
              { translateX: position[0] }, // Left dot moves to center
              { scale: scale[0] },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            transform: [
              { translateX: position[1] }, // Middle dot stays at the center
              { scale: scale[1] },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            transform: [
              { translateX: position[2] }, // Right dot moves to center
              { scale: scale[2] },
            ],
          },
        ]}
      />
      {/* The expanding line */}
      <Animated.View
        style={[
          styles.line,
          {
            height: lineHeight, // Dynamic height of the line
            top: 10, // Position the line below the middle dot
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Keep the dots in a horizontal row
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Container should have relative positioning to position the line correctly
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: '#fff',
    borderRadius: 6,
    margin: 5,
  },
  line: {
    width: 8,
    backgroundColor: '#fff',
    position: 'absolute', // Line should be absolutely positioned
    borderRadius: '0.8rem',
    marginTop: -3
  },
});

export default LoadingDots;
