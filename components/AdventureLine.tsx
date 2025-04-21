import { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet, Easing } from 'react-native';

import React = require("react");

const AdventureLine = ({status} : any) => {
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
    <Animated.View style={[styles.adventure_line, { height: heightAnim, backgroundColor: status === 1 ? '#FCAD72' : '#E4E7EC' }]} />
  );
};

export default AdventureLine;

const styles = StyleSheet.create({
  adventure_line: {
    width: 5,
    borderRadius: 8,
    marginTop: 14
  }
});
