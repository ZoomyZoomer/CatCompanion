import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet, Easing } from 'react-native';

const AdventureLine = ({}) => {
  const heightAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: 40,             // target height
      duration: 500,           // duration in ms
      easing: Easing.in(Easing.ease), // <-- correct here
      useNativeDriver: false   // animating height (layout prop)
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.adventure_line, { height: heightAnim }]} />
  );
};

export default AdventureLine;

const styles = StyleSheet.create({
  adventure_line: {
    width: 5,
    borderRadius: 8, // no 'rem' units, just dp numbers
    backgroundColor: '#FCAD72',
    marginTop: 14
  }
});
