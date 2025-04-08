import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

const FontText: React.FC<TextProps> = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.defaultText, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#727E90',
    textAlign: 'center'
  },
});

export default FontText;
